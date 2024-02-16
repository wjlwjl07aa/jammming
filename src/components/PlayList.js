import React from 'react';
import './PlayList.css';

function PlayList ({playList, handlePlayList}) {

    const items = playList.map( (x) => {
        return(
            <div className='PlayList-item' key={x.id} id={x.id} >
                <p className='PlayList-name'>{x.name.substring(0,30)}</p>
                <p className='PlayList-artist'>{x.artist.substring(0,20)}</p>
                <input className='PlayList-delete' onClick={handlePlayList} 
                    id={x.id} type='button' value='-'></input>
            </div>
        );
    });

    return ( 
        <div className='PlayList'>
            <div className='PlayList-heading'>
                <p>PlayList</p>
            </div>
            <div className='PlayList-items'>
                <div className='PlayList-input'>
                    <input className='PlayList-savename' type='text' id='playlistName' />
                </div>
                { items }
                <div className='PlayList-footer'>
                    <input className='PlayList-save' type='button' value='Save Playlist'  />
                </div>
            </div>
        </div>
    )
}

export default PlayList;
