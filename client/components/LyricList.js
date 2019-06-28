import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends React.Component{
    renderLyrics(){
        return this.props.lyrics.map(({id,content,likes}) => {
            return(
            <li key ={id} className='collection-item'>
                {content}
                <div className='vote-box'><i className='material-icons right' onClick={() => this.onLike(id,likes)}>thumb_up</i>
            {likes}
                </div>
            </li>
            ) 
        })
    }
    onLike(id, likes){
        this.props.mutate({
            variables: {
                id:id
                   //this titl goes to mutation as $title
            },
            optimisticResponse:{
              __typename: 'Mutation',
              likeLyric:{
                  id:id,
                  __typename:'LikeLyric',
                  likes:likes+1
              }
            }
    })
}
    render(){
        return(
            <div>
                <ul className='collection'>
                  {this.renderLyrics()}
                </ul>
            </div>
        )
    }
}
const mutation = gql`
mutation LikeLyric($id:ID){
    likeLyric(id:$id){
        id
        likes
    }
}
`;

export default graphql(mutation)(LyricList);