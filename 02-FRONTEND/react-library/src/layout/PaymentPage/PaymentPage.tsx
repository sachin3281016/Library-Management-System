import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PaymentInfoRequest from "../../models/PaymentInfoRequest";

export const PaymentPage = () => {
  const { authState } = useOktaAuth();

  const [fees, setFees] = useState<number>(0.0);
  const [httpError, setHttpError] = useState(false);
  const [isLoadingFees, setIsLoadingFees] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    const fetchFees = async () => {
      setIsLoadingFees(true);
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const feesResponse = await fetch(url, requestOptions);
        if (!feesResponse.ok) {
          setIsLoadingFees(false);
          return new Error("Something went wrong!");
        }

        const feesResponseJson = await feesResponse.json();
        setFees(feesResponseJson.amount);
        setIsLoadingFees(false);
      }
    };
    fetchFees().catch((error: any) => {
      setIsLoadingFees(false);
      setHttpError(error.message);
    });
  }, [authState]);

  const elements = useElements();
  const stripe = useStripe();

  const checkout = async () => {
    setSubmitDisabled(true);
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisabled(true);

    const paymentInfoRequest = new PaymentInfoRequest(
      Math.round(fees*100),
      "INR",
      authState?.accessToken?.claims.sub
    );

    const url = `${process.env.REACT_APP_API}/payments/secure/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentInfoRequest),
    };

    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      setSubmitDisabled(false);
      setHttpError(true);
      return new Error("Something went wrong!");
    }

    const stripeResponseJson = await stripeResponse.json();

    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: authState?.accessToken?.claims.sub,
            },
          },
        },
        { handleActions: false }
      )
      .then(async function (result: any) {
        console.log(result);
        if (result.error) {
            
          setSubmitDisabled(false);
          alert("There was an error!");
        } else {
          const url = `${process.env.REACT_APP_API}/payments/secure/payment-complete`;
          const requestOptions = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentInfoRequest),
          };

          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setSubmitDisabled(false);
            setHttpError(true);
            return new Error("Something went wrong!");
          }

          setFees(0);
          setSubmitDisabled(false);
        }
      });

    setHttpError(false);
  };

  if (isLoadingFees) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    <div className="container m-5">{httpError}</div>;
  }

  return (
    <div className="container">
      {fees > 0 && (
        <div className="card mt-3 ">
          <h5 className="card-header">
            Fees Pending: <span className="text-danger">₹{fees}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title mb-3">Credit Card</h5>
            <CardElement id="card-element" />
            <button
              disabled={submitDisabled}
              className="btn btn-md main-color tc mt-3"
              onClick={checkout}
            >
              Pay Fees
            </button>
          </div>
        </div>
      )}

      {fees == 0 && (
        <div className="mt-3">
          <h5>You have no fees!</h5>
          <Link to="/search" className="btn main-color tc">
            Explore top books
          </Link>
        </div>
      )}

      {submitDisabled && <SpinnerLoading />}
    </div>
  );
};
