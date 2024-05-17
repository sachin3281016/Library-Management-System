// Import necessary dependencies and styles
import "./App.css";
import { HomePage } from "./layout/HomePage/HomePage";
import { SearchBooksPage } from "./layout/SearchBooksPage/SearchBooksPage";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Footer } from "./layout/NavbarAndFooter/Footer";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { LoginWidget } from "./Auth/LoginWidget";
import { oktaConfig } from "./lib/OktaConfig";
import { ShelfPage } from "./layout/ShelfPage/ShelfPage";
import ReviewListPage from "./layout/BookCheckoutPage/components/ReviewListPage/ReviewListPage";
import { MessagesPage } from "./layout/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./layout/ManageLibraryPage/ManageLibraryPage";
import { PaymentPage } from "./layout/PaymentPage/PaymentPage";

// Create an instance of OktaAuth using the provided configuration
const oktaAuth = new OktaAuth(oktaConfig);

// App component
function App() {
  // Access the React Router history object
  const history = useHistory();

  // Custom authentication handler to redirect to the login page
  const customAuthHandler = () => {
    history.push('/login');
  };

  // Restore the original URI after successful authentication
  const restoreOriginalUri = async (_oktaAuth:any, originalUri:any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  // Render the main application structure
  return (
    <div className='d-flex flex-column min-vh-100'>
      {/* Security component from Okta to handle authentication */}
      <Security restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler} oktaAuth={oktaAuth}>
        {/* Navbar component at the top */}
        <Navbar />

        <div className='flex-grow-1'>
          {/* Switch component for handling different routes */}
          <Switch>
            {/* Redirect to /home when accessing the root path */}
            <Route path={'/'} exact>
              <Redirect to={'/home'} />
            </Route>

            {/* Route for the home page */}
            <Route path={'/home'}>
              <HomePage />
            </Route>

            {/* Route for the search page */}
            <Route path={'/search'}>
              <SearchBooksPage />
            </Route>

            {/* Route for the book checkout page with a dynamic parameter */}
            <Route path={'/checkout/:bookId'}>
              <BookCheckoutPage />
            </Route>

            <Route path={'/reviewlist/:bookId'} >
              <ReviewListPage />
            </Route>

            {/* Route for the login page with the LoginWidget component */}
            <Route path={'/login'} render={() =>
              <LoginWidget config={oktaConfig} />
            } />

            {/* Route for the login callback page */}
            <Route path={'/login/callback'} component={LoginCallback} />

            <SecureRoute path={'/shelf'} >
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path={"/messages"}>
              <MessagesPage />
            </SecureRoute>

            <SecureRoute path={"/admin"} >
              <ManageLibraryPage />
            </SecureRoute>
            <SecureRoute path={"/fees"} >
              <PaymentPage />
            </SecureRoute>
            
          </Switch>
        </div>

        {/* Footer component at the bottom */}
        <Footer />
      </Security>
    </div>
  );
}

// Export the App component as the default export
export default App;
