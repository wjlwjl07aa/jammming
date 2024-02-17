/*  
    File:        SearchBar.js
    Project:     CodeCademy Jammming 
    Author:      wjlwjl07aa
    Create Date: Feb. 12, 2024
    Description: React component display in the App header. Has inputs for searching 
                 on Artist and Track name and a 'Search' button. 
                 The seaech options are not rendered (because: const menu = [])
                 The playlist objects contains: { name: ... id: ... artist: .. uri: ...}
                 All handlers are passed in from App.js <App />     
*/

import React from 'react';
import './SearchBar.css';


function SearchBar ({onClick, onChange, onSubmit, selected}) {
    const menu = [ ];
    const buttons = menu.map( x => {
        const name = x[1] === selected ? 'selected' : ''; 
        return ( <button id={x[1]} value={x[1]} key={x[1]} name={name} onClick={onClick}>{x[0]}</button> )
        }
    );
    
    const fields = [['Track Name', 'track'],['Artist','artist']];
    const fieldTags = fields.map( x => {
        return (
            <div>
            <label htmlFor={x[1]} key={'_label_'+x[1]}>{x[0]}</label>
            <input type='text' id={x[1]} key={'_text_'+x[1]} onChange={onChange} />
            </div>
        );
    });
  
    return (
        <div className='SearchBar' >
            <div>{buttons}</div>
            <br/>
            <form action='' id='searchbar' onSubmit={onSubmit} >
                {fieldTags}
                <input type='submit' value='Search' id='search'/>
            </form>
        </div> 
    );
}

export default SearchBar;