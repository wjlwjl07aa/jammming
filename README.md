# <code>wjlwjl07aa's CodeCademy Jammming Project</code> February 17, 2024

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description 

CodeCademy <code>Jammming</code> React portfolio projecet 

Allow a Spotify users to search for tracks and save them to a (private) play list. 

This app uses browser based Spoitfy (Oath) authentication flow to obtain a Spotify auth token, 
this approach is implemented in <code>/src/index.js</code> and <code>/src/spotifyAuthFlow.js</code>. This approach, as opposed to obtaining an auth token non-interactively in a function,
is necessary because the playlist API requires a userId. The auth token is stored in an 
expiring cookie. 

## TODO 

1.  Presently, the app does not perform an automatic refresh of the token before it 
    expires: Implement a refresh of the Spotify auth token at 50 minutes.

2.  Build a production version and deploy in a cloud based container.

3.  Test the app in Mozilla, Firefox and Opera. The app has only been tested in 
    Chrome because Firefox and Opera do not (easily) support localhost (at least
    not on a ChromeOS Chromebook. my currently dev machine). 

4.  Implement a 'Play' option using the Spotify player. 

5.  Write a unit test suite with Jest or some other tool.

