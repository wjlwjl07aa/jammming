import React, { useState } from 'react';
import './App.css';
import SpotifyApi from './utilities/spotifyapi.js';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';

function App() {
  // Create Spotify API wrapper class 
  const api = new SpotifyApi();

  // Spotify result, currently selected track
  const [ tracks, setTracks ] = useState([]);
  const [ selection, setSelection ] = useState(null);

  // Search Parameters 
  const [ track, setTrack] = useState('');
  const [ artist, setArtist] = useState('');
  const [ option, setOption ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const data = await api.getTracks(artist, track);
    
    console.log('Saving data:', data.tracks.items[0]);
  
    setTracks( (x) => data.tracks.items);
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
    console.log(`handleTrack ${target.id}`);
    setSelection( () => target.track );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>CodeCademy Jammming Portfolio Project</h3>
        <SearchBar onClick={handleOption} onChange={handleChange} 
          onSubmit={handleSubmit} selected={option} />
          <p className='App-searchstat'>[Search by]: Track: {track} Artist: {artist} Option: {option} </p>
      </header>
      <main className="App-main">
        <TrackList tracks={tracks} handleTrack={handleTrack} />
      </main>
    </div>
  );
}

export default App;
