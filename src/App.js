import React, { useState } from 'react';
import './App.css';
import SpotifyApi from './utilities/spotifyapi.js';
import SearchBar from './components/SearchBar';

function App() {

  const api = new SpotifyApi();
  const [ data, setData ] = useState([]);
  const [ track, setTrack] = useState('');
  const [ artist, setArtist] = useState('');
  const [ option, setOption ] = useState('');

  let tracklist = [];

  if ( data ) {
    tracklist = data.map( (x,i) => {
      return(
        <li key={Date.now()+i}>Track: {x.name}, Album: {x.album.name}</li>  
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const data = await api.getTracks(artist, track);
    const tracks = data.tracks;

    console.log('Saving data:', tracks.items);
  
    setData( (x) => tracks.items);
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

  const handleClick = ({target}) => {
    setOption( () => target.id );

  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>CodeCademy Jammming Portfolio Project</h3>
        <SearchBar onClick={handleClick} onChange={handleChange} 
          onSubmit={handleSubmit} selected={option} />
      </header>
      <main className="App-main">
         <p>Track: {track} Artist: {artist} Option: {option} </p>
        <div className="App-data">
            <ol id='tracks'>
              {tracklist}
            </ol>
          </div>
          <hr/>
        </main>
    </div>
  );
}

export default App;
