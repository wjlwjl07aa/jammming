import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {redirectToAuthCodeFlow, getAccessToken} from './utilities/spotifyAuthFlow';

const clientId = '780dec02d3024334a61a9b08ec12cc1a';
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const authCookieName = 'V2lsbGlhbSBMZW9uYXJk'

/* 
  This wonderful function is courtesy of 
  https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript

*/
function getCookieValue(name) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}

function setAuthCookie(token) {
  const expires = new Date( Date.now() + 3000000);
  const authCookie = `${authCookieName}=${token};expires=${expires.toUTCString()};`;
 
  document.cookie = authCookie; 
}

const accessToken = getCookieValue(authCookieName);
console.log('accessToken: ',accessToken);
console.log('cookies', document.cookie);

/* 
  There are four states/cases to handle here:

    1. Initial page with not Spotify code= in the search params and no authToken cookie
      > Redirect to Spotify aurh page 
    2. After redirect from the Spotify authorization page with ?code=<one time code> 
      > Use the code to get a Spotify access token; store in cookie
    3. After the Spotify authorization code is retreived using the ?code='..' and set into a cookie
      > Render main passing the access Token (needed to create the Spotify Api wrapper)
    4. After the accessToken cookie expires 
      > Redirect the spotify aurthorization page ... i.e !accessTokne && !code 
*/

if (accessToken) 
{
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App accessToken={accessToken}/>
    </React.StrictMode>);
} else if (!code) 
{
    redirectToAuthCodeFlow(clientId);
} else 
{
  const token = await getAccessToken(clientId, code);
  if ( token ) 
    document.cookie = setAuthCookie(token);
  // redirect back with no code='...' in search params 
  const endpoint = `http://${document.location.host}${document.location.pathname}`;
  document.location = endpoint;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
