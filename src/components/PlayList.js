import React from 'react';
import './PlayList.css';

function PlayList ({playList, handlePlayList, savePlayList, playListStatus}) {
    const pattern = '[a-zA-Z0-9_.!\'\\s]+';

    const handleSave = (event) => {
        const savename = document.getElementById('playListName').value.trim();
        return savePlayList(savename);
    }

    const items = playList.map( (x) => {
        return(
            <div className='PlayList-item' key={x.id} id={x.id} >
                <p className='PlayList-name'>{x.name.substring(0,30)}</p>
                <p className='PlayList-artist'>{x.artist.substring(0,20)}</p>
                <input className='PlayList-delete' onClick={handlePlayList} 
                    id={x.id} type='submit' value='-'></input>
            </div>
        );
    });

    return ( 
        <div className='PlayList'>
            <div className='PlayList-heading'>
                <p>PlayList</p>
            </div>
            <div className='PlayList-items'>
                <p className='PlayList-status' id='playListStatus'>{playListStatus}</p>
                <div className='PlayList-input'>
                    <input className='PlayList-savename' patter={pattern} type='text' id='playListName' />
                </div>
                { items }
                <div className='PlayList-footer'>
                    <input  className='PlayList-save' type='button' value='Save Playlist'  
                            onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}

export default PlayList;
