import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";

export const ChangeQuantityOfBook: React.FC<{ book: BookModel,deleteBook:any }> = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const {authState} =useOktaAuth();

  useEffect(() => {
    const fetchBookInState = async () => {
      props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
      props.book.copiesAvailable
        ? setRemaining(props.book.copiesAvailable)
        : setRemaining(0);
    };
    fetchBookInState();
  }, []);

  async function  increaseBookQuantity() {
    const url=`${process.env.REACT_APP_API}/admin/secure/increase/book/quantity?bookId=${props.book.id}`;
    const requestOptions={
        method:'PUT',
        headers:{
          Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type':'application/json'
        },
        
    };

    const bookResponse=await fetch(url,requestOptions);

    if(!bookResponse.ok){
      return new Error("Something went wrong")
    }

    setQuantity(quantity + 1)
    setRemaining(remaining + 1);


    
  }

  async function  decreaseBookQuantity() {
    const url=`${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity?bookId=${props.book.id}`;
    const requestOptions={
        method:'PUT',
        headers:{
          Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type':'application/json'
        },
        
    };

    const bookResponse=await fetch(url,requestOptions);

    if(!bookResponse.ok){
      return new Error("Something went wrong")
    }
if(quantity>=1 && remaining>=1)
    {
      setQuantity(quantity - 1)
      setRemaining(remaining - 1);

    }

    
  }


  async function  deleteBook() {
    const url=`${process.env.REACT_APP_API}/admin/secure/delete/book?bookId=${props.book.id}`;
    const requestOptions={
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type':'application/json'
        }
  
        
    };

    const bookResponse=await fetch(url,requestOptions);

    if(!bookResponse.ok){
      return new Error("Something went wrong")
    }

    props.deleteBook();


    
  }

  return (
    <div className="card mt-3 shadow p-2 mb-3 rounded bg-body">
      <div className="row g-1">
        <div className="col-md-2 ">
          <div className="d-none d-lg-block ">
            {props.book.img ? (
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>

          <div className="d-flex d-lg-none justify-content-center align-items-center ">
            {props.book.img ? (
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>

            <p className="card-text">{props.book.description}</p>
          </div>
        </div>

        <div className="mt-3 col-md-4">
            <div className="d-flex justify-content-center align-items-center">
                <p>Total Quantity: <b>{quantity}</b></p>

            </div>
            <div className="d-flex justify-content-center align-items-center">
                <p>Total Remaining: <b>{remaining}</b></p>

            </div>
        </div>
        <div className="mt-3 col-md-1">
            <div className="d-flex justify-content-start">
                <button type="button" className="btn btn-md btn-danger" onClick={(event)=>{
                  event.preventDefault();
                  deleteBook();
                }}>Delete</button>

            </div>

        </div>

        <button className="btn btn-md m1 main-color tc" type="button" onClick={(event)=>{
                  event.preventDefault();
                  increaseBookQuantity();
                }
                }>Add Quantity</button>
        <button className="btn btn-md m1 btn-warning" type="button" onClick={(event)=>{
                  event.preventDefault();
                  decreaseBookQuantity();
                }}>Decrease Quantity</button>
      </div>
    </div>
  );
};
