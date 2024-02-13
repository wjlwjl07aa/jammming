import React from 'react';
import Track from './Track';
import './TrackList.css';

function TrackList({tracks, trackHandler}) {
    if ( !tracks || !tracks.length ) 
        return(<p className='TrackList'>No matches found</p>); 

    const items = tracks.map( (x,i) => {
        const key = 'track_' + i; 
        return( <Track track={x} key={key} trackHandle={trackHandler}/> );
    });

    return( 
        <div className = 'TrackList' id='TrackList'>
            <div className='tl-heading'>
                <p className='tl-col1'>Artist</p>
                <p className='tl-col2'>Album</p>
                <p className='tl-col3'>Track</p>
             </div> 
             <div className='tl-items'>
                { items }
            </div>
        </div>
    );
}

export default TrackList;