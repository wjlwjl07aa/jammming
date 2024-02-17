# <code>wjlwjl07aa's CodeCademy Jammming Project</code> February 17, 2024

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description 

CodeCademy <code>Jammming</code> React portfolio project 

Allows a Spotify user to search for tracks using a specified track and artist and save them to a (private) play list. Allows users to add and delete specified tracks from the play lists.   

## Notes 

This app uses a browser based Spoitfy (Oath) authentication flow to obtain a Spotify auth token. 
This flow is implemented in <code>./src/index.js</code> and <code>/src/spotifyAuthFlow.js</code>. This approach, as opposed to obtaining an auth token non-interactively in a function,
is necessary because the playlist API requires a userId for an authenticated user. The auth token is stored in an expiring cookie. If the auth cookie is not present/expired, the code in <code>./src/index.js</code> will redirect to the Spotify auth page, which subsequently redirects back to <code>localhost:3000</code>. (i.e. <code>./src/index.js</code>) with a one-time access code in the <code>?code=</code> search paramter. This code (presently) fails if a sesions is left
idle for over 60 minutes without a refresh. (see TODO below).

Much of the time I spent on this project was devoted to (1) Style Sheets and (2) Implementing an acceptably functional Spotify authentication flow. I would have preferred an 'back-end' authentication flow ... (see TODO).   

All of the background images were sources from [WikiMedia Commons](https://commons.wikimedia.org/wiki/Category:Images). 

## React Components <code>src/components</code> 

The App implements/uses the following React components 

- <code>\<App \\/></code>  Top-level React Component. All state management, asynchronous calls to <code>SpotifyApi</code> wrapper class, and UI callback functions are implemented in this component.   
- <code>\<SearchBar \/\></code>  User input form for searching on track name and artist,
- <code>\<TrackList \/\></code> Redners a collection of <code>\<Track \/\></code> components.
- <code>\<Track \/\></code> Renders a Spotify track object 
- <code>\<PlayList \/\></code> Renders user's saved playlist items and implements Save function

## Helper modules 

- <code>src//utilities//spotifyapi.js</code>  <code>SpotifyApi</code> API wrapper class. 
- <code>src//utilities//spotifyAuthFlow.js</code>  Helper functions for Spotify auth flow.
- <code>src//index.js</code>  Renders <code>\<App \/\></code> component and handles redirects etc. for Spotify auth flow. Passes the Spotify auth token into the <code>\<App \/\></code> component.  


## Spotify API endpoints used by <code>SpotifyApi</code> class.

- <code>https://api.spotify.com/v1/search</code>:   (<code>getTracks(artist, track, ...)</code>)  Find tracks matching the specified artist and track name. 
- <code>https://api.spotify.com/v1/me</code>:   (<code>getUserInfo()</code>) Get the id of the authenticated user 
- <code>https://api.spotify.com/v1/{user_id}/playlists</code>:  (<code>savePlayList(name, uris)</code>) Add a private playlist to the user's Spotify account
<code>https://api.spotify.com/v1/playlists/{playlist_id}/tracks</code> (<code>savePlayList(name, uris)</code>) Add a list of playlist URIs to a previously saved playlist.

## TODO 

1.  Presently, the app does not perform an automatic refresh of the token before it 
    expires: Implement a refresh of the Spotify auth token at 50 minutes.

2.  Build a production version and deploy in a cloud based container.

3.  Test the app in Mozilla, Firefox and Opera. The app has only been tested in 
    Chrome because Firefox and Opera do not (easily) support localhost (at least
    not on a ChromeOS Chromebook. my currently dev machine). 

4.  Implement a 'Play' option using the Spotify player. 

5.  Write a unit test suite with Jest or some other tool.

6.  Attempt to implement a (secure) 'back-end' authentication flow.   