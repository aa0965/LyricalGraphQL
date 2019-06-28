import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import query from '../Queries/SongQuery';

class LyricCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {content:''}
    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                songId:this.props.songId,
                content: this.state.content    //this titl goes to mutation as $title
            },
           
        });
        this.setState({ content: '' })
    }
    render(){
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Enter Lyrics</label>
                <input
                  
                  onChange = {event => this.setState({content:event.target.value})}
                  value={this.state.content}
                 />
            </form>
        )
    }
}
const mutation = gql`
mutation AddLyricToSong($content :String, $songId:ID){
    addLyricToSong(content: $content, songId:$songId){
        id
        lyrics{
            id
            content
            likes
        }
    }
}
`;
export default graphql(mutation)(LyricCreate);