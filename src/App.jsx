import React from 'react';
import './App.css';
import Players from './Players';
import Table from './Table';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      page: 0,
      players: []
    }
  }
  
  handleSubmit(formPlayers){
    this.setState(state =>{
      state.players = formPlayers;
      state.page = 1;
      this.forceUpdate(); //need to fix this
    });
  }


 
  render(){
    return (
      <div className="App">
        {this.state.page === 0 ? <Players onSubmit={this.handleSubmit.bind(this)}/> : <Table players={this.state.players}/>}
      </div>
    );
  }
}

export default App;

