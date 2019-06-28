import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import query from '../Queries/SongsQuery';

import {Link, hashHistory} from 'react-router';
class SongCreate extends React.Component{
    constructor(props){
        super(props);
        this.state={
        title:''
    }
    }
   onSubmit (event){
       event.preventDefault();
       this.props.mutate({
           variables: {
               title: this.state.title    //this titl goes to mutation as $title
           },
           refetchQueries: [{query}]
       }).then(()=> hashHistory.push('/'))   }
    render(){
        return(
            <div>
                <Link to= '/'>Back</Link>
                <h3>Create a song</h3>
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Song Title:</label>
                <input onChange={event => this.setState({title:event.target.value})} value={this.state.title} />
            </form>
            </div>
        )
    }
}
const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title){
        title 
    }
}
`;
export default graphql(mutation)(SongCreate);