/*
    File:        spotifyapi.js
    Project:     CodeCademy Jammming 
    Author:      wjlwjl07aa@gmail.com
    Create Date: Feb. 12, 2024
    Description: Module for Spotify web API functions 

    Based on https://developer.spotify.com/documentation/web-api/howtos/web-app-profile and
            https://stackoverflow.com/questions/67128486/connect-to-spotify-api-with-command-line

    https://api.spotify.com/v1/search

    curl --request GET --url ''https://api.spotify.com/v1/search?q='https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Ctrack&market=US&limit=20&offset=0' --header `Authorization: Bearer ${token}`
    unencoded q=remaster track:Doxy artist: Miles Davis&type=album,track&market=US&limit=20&offset=0

*/

let _debug = false;
// let _auth64 = 'NzgwZGVjMDJkMzAyNDMzNGE2MWE5YjA4ZWMxMmNjMWE6MDAxM2JiMGM1YjRkNDM2NGIyYzJjNGExMGMzMzY5YTQ=';

/* 
    getAccessToken( auth );

    Fetches Spotify API access token.
    auth is a concatenation of <client id>:<clien secret>
*/

async function getAccessToken(auth) {
    const params = new URLSearchParams();
    // const auth64 = Buffer.from(auth).toString('base64');
    const auth64 = btoa(auth);

    params.append("grant_type", "client_credentials");

    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {  "Authorization": `Basic ${auth64}` },
            body: params
        });
        if (_debug) console.log('result', result);

        const { access_token } = await result.json();
        // console.log('access_token', access_token);
        return access_token;
    } 
    catch (error) {
        console.log('getAccessTokne() error:', error);
    }
}

class SpotifyApi {
    
    constructor() {
        this._clientId = '780dec02d3024334a61a9b08ec12cc1a';
        this._secret = '0013bb0c5b4d4364b2c2c4a10c3369a4'
        this._auth = `${this._clientId}:${this._secret}`;
        this._apiUrl =  'https://api.spotify.com/v1/search'
        this._limit = 20; 
        this._token = '';
        this._tokenTTL = 0; 
    }

    /* Initializes, replaces an expiring token or returns this._token */  
    async _getToken() { 

        if ( Date.now() > this._tokenTTL ) {   
            this._token = await getAccessToken(this._auth);
            this._tokenTTL = Date.now() + 3000;    // use 50 minutes to be safe; Spotify will expire at 3600
        }
        return this._token; 
    }

    get limit() { return this._limit; }
    set limit(newLimit) { 
        if ( typeof newLimit !== 'number') return;
        this._limit = Math.min( Math.max(parseInt(newLimit),1), 100);
    } 

    async getTracks(artist, track, term, page=0) {
        // build the query string; handle falsy parameters 
        const _term = term ? `${term}` : '';
        const _artist = artist ? `artist:${artist}` : '';
        const _track = track ? `track:${track}` : '';
        const query = `?q=${_term}${_artist} ${_track}&type=album,track&offset=${page}&limit=${this.limit}`;
        const endpoint = `${this._apiUrl}${encodeURI(query)}`

        const token = await this._getToken();     // Gets or return a saved access token

        console.log('endpoint', endpoint);

        const options = {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        };
        
        try 
        {   
            const response = await fetch(endpoint, options);
    
            if ( response.ok ) {
                const jsonResponse = await response.json();  
                // console.log('jsonResponse', jsonResponse);
                return jsonResponse;
            } else {
                console.log(`Spotify repsonse :`, response.statusText);
            }
        }
        catch (error)
        {
            console.log(`Error in getTracks`, error)    
        }
        return {};
    }
}

// exports = { SpotifyApi };
export default SpotifyApi;

/*

(async () => {
    if ( process.argv.length > 2 && process.argv[2]==='--debug' )
        _debug = true;

    // const token = await getAccessToken('780dec02d3024334a61a9b08ec12cc1a:0013bb0c5b4d4364b2c2c4a10c3369a4');
    // console.log('token', token);
    
    
    const api = new SpotifyApi();
    const data = await api.getTracks('Steely Dan','Pretzel Logic');

    const { tracks } = data;
    console.log('tracks', tracks);
    tracks.map( (x,i) => console.log(i, x));

})();

*/