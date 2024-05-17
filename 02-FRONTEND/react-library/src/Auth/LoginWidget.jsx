// Import necessary modules and components
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layout/Utils/SpinnerLoading";
import { Redirect } from "react-router-dom";
import { OktaSignInWidget } from "./OktaSignInWidget";

// Define the LoginWidget component
export const LoginWidget = ({ config }) => {
  // Destructure values from the useOktaAuth hook
  const { oktaAuth, authState } = useOktaAuth();

  // Define a callback for successful login
  const onSuccess = (token) => {
    oktaAuth.handleLoginRedirect(token);
  };

  // Define a callback for login errors
  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  // If authentication state is not available, display a loading spinner
  if (!authState) {
    return <SpinnerLoading />;
  }

  // If the user is already authenticated, redirect to the home page
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    // If not authenticated, render the OktaSignInWidget component
    <OktaSignInWidget onSuccess={onSuccess} onError={onError} config={config} />
  );
};
