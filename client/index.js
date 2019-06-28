import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import App from './components/App';
import SongDetail from './components/SongDetail';
 
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
class Root extends React.Component{
render(){
  return(
    <ApolloProvider client={client}>
    <Router history={hashHistory}>
          <Route path="/" component={App} ><IndexRoute component={SongList}/>
          <Route path="/song/new" component={SongCreate} />
          <Route path='songs/:id' component={SongDetail}/>
          </Route>
          
          </Router>
  </ApolloProvider>
  )
}
}
ReactDOM.render(
  
    <Root/>
    ,
  document.getElementById('root')
);
