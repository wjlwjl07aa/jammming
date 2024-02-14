import React from 'react';
import './PlayList.css';

function PlayList ({playList, handlePlayList}) {


    return ( 
        <div className='PlayList'>
            <div className='PlayList-heading'>
                <p>PlayList</p>
            </div>
            <div className='PlayList-items'>
                <div className='PlayList-input'>
                    <input type='text'></input>
                </div>
                <div className='PlayList-footer'>
                <input type='button' id='save' value='Save Playlist' />
                </div>
            </div>
        </div>
    )
}

export default PlayList;
