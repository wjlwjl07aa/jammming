import React from 'react';
import './SearchBar.css';


function SearchBar ({onClick, onChange, onSubmit, selected}) {
    const menu = [  ['Option 1','option_1'],['Option 2','option_2']];
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
                <br/>
                <input type='submit' value='Search' id='search'/>
            </form>
        </div> 
    );
}

export default SearchBar;