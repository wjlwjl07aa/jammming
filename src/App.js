import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import PlayList from './components/PlayList';
import SpotifyApi from './utilities/spotifyapi';

function App({accessToken}) {
  // Get the spotify api wrapper (singleton)
  const api = new SpotifyApi(accessToken); 
  // console.log('api.userId', api.userId );

  // Spotify result, currently selected track, playlist (items)
  const [ tracks, setTracks ] = useState([]);
  const [ playList, setPlayList ] = useState([]);      

  // Search Parameters 
  const [ track, setTrack] = useState('');
  const [ artist, setArtist] = useState('');
  const [ option, setOption ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const data = await api.getTracks(artist, track);
    console.log('data', data)
    setTracks( (x) => data ? data.tracks.items : []);
    
  }

  const handleChange = (event) => {
    event.preventDefault();

    const regex = /^[a-zA-Z0-9 '\-\b,! ]*$/;
    const ftab = {track: [setTrack,track], artist: [setArtist,artist]};
    const setter = ftab[event.target.id][0] || ((x) => x);
    const prev = ftab[event.target.id][1] || '';
    let val = event.target.value;

    if (!regex.test(val)) val = prev;
    event.target.value = val;
    setter( () => val);
  };

  const handleOption = ({target}) => {
    setOption( () => target.id );
  }

  const handleTrack = ({target}) => {
    const track = tracks.find( (x) => x.id ===target.id );
    if ( track ) 
      addToPlayList(track.id);

  }

  const handlePlayList = ({target}) => {
    console.log('handlePlayList target.id', target.track.id);
  }

  const addToPlayList = (id) => {
    const track = tracks.find( (t) => t.id === id);

    if ( track ) {
      const exists = playList.find( (x) => x.id === id ); 

      if ( !exists ) {
        const newItem = { id: track.id, name: track.name, artist: track.artists[0].name }; 
        setPlayList( (x) => [...playList, newItem] );
      }
    }
  }

  const checkPlayList = (id) => {
    return playList.find( (x) => x.id === id);
  }

  return (
    <div className="App">
      <main className="App-main">
        <header className="App-header">
          <h1>CodeCademy Jammming Portfolio Project</h1>
          <SearchBar onClick={handleOption} onChange={handleChange} 
            onSubmit={handleSubmit} selected={option} />
            <p className='App-searchstat'>[User: ] [Search by]:Track: {track} Artist: {artist} Option: {option} </p>
        </header>
        <div className='App-content'>
          <TrackList tracks={tracks} handleTrack={handleTrack} />
          <PlayList handlePlayList={handlePlayList} playList={playList} />
        </div>
      </main>
    </div>
  );
}

export default App;
