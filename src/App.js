/*  
    File:        App.js
    Project:     CodeCademy Jammming 
    Author:      wjlwjl07aa@gmail.com
    Create Date: Feb. 12, 2024
    Description: React App component. Handles all actions from child compoents.
                 Handle all async calls from SpotifyApi 
    Uses:        <SearchBar /> <TrackList /> <PlayList /> SpotifyApi class  

    Sources and Steals:
    CodeCadmey React Tutorial Module examples 
*/

import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import PlayList from './components/PlayList';
import SpotifyApi from './utilities/spotifyapi';

// 
// React App Component 
// The access token is passed in from index.js (which handles the Spotify auth flow).
// The SpotifyApi constructor 'requires' and access. TODO: consider anoher design ...
//
function App({accessToken}) {

  // Create the spotify api wrapper 
  const api = new SpotifyApi(accessToken); 

  // Spotify result, currently selected track, playlist (items)
  const [ tracks, setTracks ] = useState([]);
  const [ playList, setPlayList ] = useState([]);
  const [ playListStatus, setPlayListStatus ] = useState('');
  const [ playListName, setPlayListName ] = useState('');

  // Search Parameters 
  const [ track, setTrack] = useState('');
  const [ artist, setArtist] = useState('');
  const [ option, setOption ] = useState('');

  // Handlers and Helpers 

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const data = await api.getTracks(artist, track);
    setTracks( (x) => data ? data.tracks.items : []);
  }

  const handleChange = (event) => {
    event.preventDefault();

    const regex = /^[a-zA-Z0-9 '\-\b,! ]*$/;
    const ftab = {track: [setTrack,track], artist: [setArtist,artist], 
                  playListName: [setPlayListName, playListName]};
    const setter = ftab[event.target.id][0] || ((x) => x);
    const prev = ftab[event.target.id][1] || '';
    let val = event.target.value;

    if (!regex.test(val)) val = prev;
    event.target.value = val;
    setter( () => val);
  };

  // Handles Search Sort parameters 
  const handleOption = ({target}) => {
    setOption( () => target.id );
  }

  // Adds track info to playList state var 
  const handleTrack = ({target}) => {
    const track = tracks.find( (x) => x.id ===target.id );
    if ( track ) 
      addToPlayList(track.id);

  }

  // Adds an object to the playList state obj if it doesn't exist 
  const addToPlayList = (id) => {
    const track = tracks.find( (t) => t.id === id);

    if ( track ) {
      const exists = playList.find( (x) => x.id === id ); 

      if ( !exists ) {
        const newItem = { id: track.id, name: track.name, uri: track.uri, 
                          artist: track.artists[0].name }; 
        setPlayList( (x) => [...playList, newItem] );
      }
    }
  }

  // deletes a playList item if it exists 
  const deletePlayList = ({target}) => {
    const item = playList.find( (x) => x.id === target.id )
  
    if ( item )
      deletePlayListItem(item.id);
  }

  // Calls into SpotfyApi class to 1) Create a playlist; 2) Add items to playlist
  const savePlayList = async (name) => {
    let status = '';

    if ( playList && playList.length > 0 ) {
      if ( name && name.trim().length > 0) {
        const saveName = name.trim();
        const uris = playList.map( (p) => p.uri );

        const success = await api.addPlayList(name, uris);
        status = success ? `TODO save playlist: ${saveName}` : 'Could not save playlist.'; 

      } else
        status = 'Please enter a name for this playlist';  
    } else 
      status = 'Playlist is empty';
      
    setPlayListStatus( () => status )
  }

  // Deletes a playlist items and updates state 
  const deletePlayListItem = (id) => {
    const items = playList.filter( (x) => x.id !== id );
    setPlayList( () => items ); 
  }

  // Render React App component  
  return (
    <div className="App">
      <main className="App-main">
        <header className="App-header">
          <h1>CodeCademy Jammming Portfolio Project</h1>
          <SearchBar onClick={handleOption} onChange={handleChange} 
            onSubmit={handleSubmit} selected={option} />
            <p className='App-searchstat'>[User: ] [Search by]:Track: {track} Artist: {artist} Playlist: {playListName} </p>
        </header>
        <div className='App-content'>
          <TrackList tracks={tracks} handleTrack={handleTrack} />
          <PlayList playList={playList} playListName={playListName} 
                    playListStatus={playListStatus} handleChange={handleChange} 
                    savePlayList={savePlayList} deletePlayList={deletePlayList} />
        </div>
      </main>
    </div>
  );
}

export default App;
