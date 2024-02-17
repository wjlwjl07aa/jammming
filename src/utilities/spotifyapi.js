/*
    File:        spotifyapi.js
    Project:     CodeCademy Jammming 
    Author:      wjlwjl07aa@gmail.com
    Create Date: Feb. 12, 2024
    Description: Class to wrap Spotify web API functions 

    Sources and Steals:

    https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
    https://stackoverflow.com/questions/67128486/connect-to-spotify-api-with-command-line
    https://api.spotify.com/v1/search
    curl --request GET --url ''https://api.spotify.com/v1/search?q='https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Ctrack&market=US&limit=20&offset=0' --header `Authorization: Bearer ${token}`
    unencoded q=remaster track:Doxy artist: Miles Davis&type=album,track&market=US&limit=20&offset=0

*/

class SpotifyApi {

    // Assume access_token has been obtained by a browser auth flow 
    constructor(access_token) {
        SpotifyApi.instance = this; 

        this._clientId = '780dec02d3024334a61a9b08ec12cc1a';
        this._secret = '0013bb0c5b4d4364b2c2c4a10c3369a4'
        this._auth = `${this._clientId}:${this._secret}`;
        this._apiUrl =  'https://api.spotify.com/v1/'
        this._limit = 20; 
        this._token = access_token;
        this._tokenTTL = Date.now() + 3500000; 
        
        // TODO: figure how to make this work without await ...
        // this.getUserInfo().then((res) => this._userId = res);
   }

    /* Initializes, replaces an expiring token or returns this._token */  

    get limit() { return this._limit; }
    get userId() { return this._userId; }

    set limit(newLimit) { 
        if ( typeof newLimit !== 'number') return;
        this._limit = Math.min( Math.max(parseInt(newLimit),1), 100);
    } 

    // Call Spotify /search enpoint and return a list of tracks 
    async getTracks(artist, track, term, page=0) {
        // build the query string; handle falsy parameters 
        const path = 'search';
        const _term = term ? `${term}` : '';
        const _artist = artist ? `artist:${artist}` : '';
        const _track = track ? `track:${track}` : '';
        const query = `?q=${_term}${_artist} ${_track}&type=album,track&offset=${page}&limit=${this.limit}`;
        const endpoint = `${this._apiUrl}${path}${encodeURI(query)}`

        // console.log('endpoint', endpoint);

        const options = {
            method: 'GET',
            headers: {Authorization: `Bearer ${this._token}`}
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
    }

    // Call Spotify /me endpoint to return a user id 
    async getUserInfo() {
        const path = 'me';
        const endpoint = `${this._apiUrl}${path}`;

        const options = {
            method: 'GET',
            headers: {Authorization: `Bearer ${this._token}`}
        };

        // console.log('getUserInfo endpoint', endpoint);
        // console.log('headers', options);

        try {
            const response = await fetch(endpoint, options);
            if ( response.ok ) {
                const json = await response.json();
                const {id} = json; 
                return id;                 
            } else
                console.log('Spoitfy API returned error: ', response.status, response.statusText);
        } catch( error ) {
            console.log('getUserInfo error:', error );
        }

    }

    //
    // Calls the Spotify /user/{user}/playlists and /playlist/{id}/tracks  
    // to create and add items to a playlist (respectively).
    //  
    async addPlayList(name, playListUris) {
        if ( !playListUris || playListUris.length === 0) return(false); 
        
        const userId = await this.getUserInfo();
        console.log('addPlayList userId', userId);
        if ( !userId ) return(false); 

        const addPath = `users/${userId}/playlists`;
        try {
            // 1. Add The Playlist 
            let endpoint = `${this._apiUrl}${addPath}`;
            let data = {name: name, description: name, public: false}; 
            let options = { method: 'POST',
                            headers: {  Authorization: `Bearer ${this._token}`,
                            'Content-Type': 'application/json' },
                            body: JSON.stringify(data) };
            
            console.log('options', options);
            console.log('endpoint', endpoint);

            const addRes = await fetch(endpoint, options);

            // 2, Add the items to the playlist
            if ( addRes.ok ) {
                const {id} = await addRes.json(); 
                console.log('add Playlist response', id);
                
                // Now add the items 
                const addItemsPath = `playlists/${id}/tracks`
                endpoint = `${this._apiUrl}${addItemsPath}`;
                data = {uris: playListUris};
                options = {  method: 'POST',
                            headers: {  Authorization: `Bearer ${this._token}`,
                            'Content-Type': 'application/json' },
                            body: JSON.stringify(data) };

                console.log('Add items endpoint', endpoint);
                console.log('Add items', options);

                const itemsRes = await fetch(endpoint, options);
                if ( itemsRes.ok ) {
                    const {snapshot_id} = await itemsRes.json(); 
                    console.log('Add Items snapshot_id', snapshot_id);

                    return snapshot_id;
                } else {
                    console.log('addPlayList Spotify error', addRes.status, addRes.statusText);
                }
            } else {
                console.log('addPlayList Spotify error', addRes.status, addRes.statusText);
            }
        } catch( error ) {
            console.log('addPlayList error:', error);
        }

        return false;
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
    const user = await api.getUserInfo();
    console.log('user', user);


    // const data = await api.getTracks('Steely Dan','Pretzel Logic');
    // const { tracks } = data;
    // console.log('tracks', tracks);
    // tracks.map( (x,i) => console.log(i, x));

})();

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


*/