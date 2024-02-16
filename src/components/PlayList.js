import React from 'react';
import './PlayList.css';

  
function PlayList ({playList, playListName, playListStatus, handleChange, savePlayList, deletePlayList}) {
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
                <input className='PlayList-delete' onClick={deletePlayList} 
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
                    <input id='playListName' className='PlayList-savename' type='text' 
                            onChange={handleChange} value={playListName} />
                </div>
                { items }
                <div className='PlayList-footer'>
                    <input id='savePlayList' className='PlayList-save' type='button' 
                            onClick={handleSave} value='Save Playlist' />
                </div>
            </div>
        </div>
    )
}

export default PlayList;
