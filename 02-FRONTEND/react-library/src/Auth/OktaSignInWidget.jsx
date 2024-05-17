// Import necessary modules and styles
import OktaSignIn from "@okta/okta-signin-widget";
import { useEffect, useRef } from "react";
import './../../node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

// Define the OktaSignInWidget component
export const OktaSignInWidget = ({ onSuccess, onError, config }) => {
  // Create a ref to hold the Okta Sign-In Widget element
  const widgetRef = useRef();

  // useEffect hook to initialize and configure the Okta Sign-In Widget
  useEffect(() => {
    // Check if the widgetRef is available
    if (!widgetRef.current) {
      return false;
    }

    // Create an instance of the Okta Sign-In Widget with the provided configuration
    const widget = new OktaSignIn(config);

    // Show the Okta Sign-In Widget in the specified element and handle success/error
    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    // Cleanup: Remove the widget when the component is unmounted
    return () => widget.remove();
  }, [onSuccess, onError, config]);

  // Render the Okta Sign-In Widget container
  return (
    <div className="container mt-5 mb-5">
      <div ref={widgetRef}></div>
    </div>
  );
};
