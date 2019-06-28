import React from 'react';
import query from '../Queries/SongsQuery';
import { graphql } from 'react-apollo';
import {Link }from 'react-router';
import gql from 'graphql-tag';

class SongList extends React.Component{
    renderSongs (){
         return this.props.data.songs.map(song =>{return (<li className='collection-item' key={song.id}><Link to = {`/songs/${song.id}`}>{song.title}</Link><i className='material-icons right cursor'  onClick={() => {this.onSongDelete(song.id)}} >delete</i></li>)}
        )
    }
    onSongDelete(Id) {
        this.props.mutate({
            variables: {
                id: Id    
            },
            refetchQueries: [{query}]
        })
    }
  render(){
      console.log(this.props)
      if(this.props.data.loading){
          return(<div>Loading...</div>)
      }
      
    
      return (<div>
          <ul className='collection'>{this.renderSongs()}</ul>;
          <Link to='/song/new' className='btn-floating btn-large red right'><i className='material-icons'>add</i></Link>
          </div>
      )
  }
}
const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id: $id){
        id
    }
}
`;

export default graphql(mutation)(
graphql(query)(SongList));
