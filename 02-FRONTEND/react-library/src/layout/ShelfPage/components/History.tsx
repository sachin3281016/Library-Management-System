import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { Pagination } from "../../Utils/Pagination";

export const History=()=>{

    const [histories, setHistories] = useState<HistoryModel[]>([]); // Array to store book data
    const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Loading state
    const [httpError, setHttpError] = useState(null); // HTTP error state
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [hitoriesPerPage] = useState(5); // Number of books to display per page
    const [totalAmountOfHistories, setTotalAmountOfHistories] = useState(0); // Total number of books
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const {authState}=useOktaAuth();
    
  
    // useEffect hook to fetch books when the component mounts
    // useEffect hook to fetch books when the component mounts or when currentPage changes
    useEffect(() => {
      const fetchHisories = async () => {
        setIsLoadingHistory(true);
        if (authState && authState.isAuthenticated) {
            const url = `${process.env.REACT_APP_API}/histories/search/findBooksByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage-1}&size=${hitoriesPerPage}`;
            const requestOptions = {
              method: "Get",
              headers: {
                Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                "Content-type": "application/json",
              },
            };

            const historyResponse=await fetch(url, requestOptions);

        if (!historyResponse.ok) {
          throw new Error("Something went wrong!");
        }
  
        // Parsing the JSON response
        const historyResponseJson = await historyResponse.json();
  
        // Extracting relevant information from the response
        setCurrentPage(historyResponseJson.page.number + 1);
        setTotalAmountOfHistories(historyResponseJson.page.totalElements);
        setTotalPages(historyResponseJson.page.totalPages);
  
        // Mapping the response data to an array of BookModel instances
        const loadedHistories: HistoryModel[] = historyResponseJson._embedded.histories.map(
          (history: HistoryModel) => ({
            // Details of each book instance
            id: history.id,
            title: history.title,
            author: history.author,
            description: history.description,
            checkoutDate:history.checkoutDate,
            returnedDate:history.returnedDate,
            img: history.img,
            bookId:history.bookId
          })
        );
  
        // Setting the state variables with the loaded books and updating loading state
        console.log(loadedHistories);
        setHistories(loadedHistories);
        
        
      };
      setIsLoadingHistory(false);

    }
  
      // Call the fetchBooks function and handle errors
      fetchHisories().catch((error: any) => {
        setIsLoadingHistory(false);
        setHttpError(error.message);
      });
    }, [currentPage, authState]);


   if (isLoadingHistory) {
        return <SpinnerLoading />;
      }
    
      // Render error message if an HTTP error occurs
      if (httpError) {
        return (
          <div className="container m-5">
            <p>{httpError}</p>
          </div>
        );
      }
    

      const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };
    
    return <div className="mt-2">
        {
            histories.length>0 
           ? <>
           <h5>Recent History:</h5>
            {
                histories.map(history=>
                    <div className="card mt-3 shadow p-3 mb-3 rounded bg-body">
                <div className="row g-0">
                    <div className="col-md-2">
                        <div className="d-none d-lg-block">
                            {
                                history.img?
                                <img src={history.img} alt="nook" width="123" height="196" />:
                                <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} alt="nook" width="123" height="196" />
                            }

                        </div>

                        <div className="d-flex d-lg-none justify-content-center align-items-center">
                            {
                                history.img?
                                <img src={history.img} alt="nook" width="123" height="196" />:
                                <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} alt="nook" width="123" height="196" />
                            }

                        </div>

                    </div>

                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{history.author}</h5>
                            <h4>{history.title}</h4>
                            <p className="card-text">{history.description}</p>
                            <hr />
                            <p className="card-text">Checked out on: {history.checkoutDate}</p>
                            <p className="card-text">Returned on: {history.returnedDate}</p>
                        </div>

                    </div>

                </div>

            </div>)
            }
       </>
       :
       <>
       <h3 className="mt-3">Currently no history:</h3>
       <Link to="/search" className="btn btn-primary">Search for new book</Link>
       </>
        }

        {
            totalPages> 1 && <Pagination currentPage={currentPage} paginate={paginate} totalPages={totalPages} />
        }
        
    </div>
}


