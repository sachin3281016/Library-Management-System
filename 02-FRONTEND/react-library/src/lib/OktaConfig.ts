// Okta Configuration
export const oktaConfig = {
    // Okta Application Client ID
    clientId: '0oae1dvt9puJf8XSG5d7',
  
    // Okta Authorization Server Issuer
    issuer: 'https://dev-63396241.okta.com/oauth2/default',
  
    // Redirect URI after successful authentication
    // redirectUri: 'http://libraryms3.s3-website-ap-southeast-2.amazonaws.com/login/callback',
      redirectUri:'https://localhost:3000/login/callback',
    // Requested scopes for authentication
    scopes: ['openid', 'profile', 'email'],
  
    // Proof Key for Code Exchange (PKCE) for enhanced security
    pkce: true,
  
    // Disable HTTPS check during development (useful for localhost without HTTPS)
    disableHttpsCheck: true,
    useClassicEngine: true
  };
  