import React from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate.js';
import LyricList from './LyricList.js';
import SongQuery from '../Queries/SongQuery.js';
class SongDetail extends React.Component{
    render(){
        const {song} = this.props.data;
        if(!song) {return<div>Loading...</div>}
        return(
            <div className='container'> <Link to='/'>Back</Link>
            <h3 className='ui header'>{song.title}</h3>
            <LyricList lyrics={song.lyrics}/>
            <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
}

export default graphql(SongQuery,{
    options: (props)=> {return { variables:{id:props.params.id}}}
})(SongDetail);