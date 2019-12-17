import React from 'react';
import './Players.css';
import PlayerForm from './PlayerForm';

class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      players: []
    }
    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(player, id) {

    const players = this.state.players;
    this.setState(state => {
      const index = state.players.findIndex((e) => e.id === id);
      if (index === -1) {
        state.players.push(player);

    } else {
        state.players[index] = player;
    }
    console.log(players);
      return { players }
    })
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.players);
  }

  render() {

    return (
      <div>
        <div id="players">
          {this.state.components}
        </div>
        <div id="buttons">
          {this.state.players.map((player, i) => <PlayerForm data={player} key={'player' + i} callback={this.addPlayer} id={i} isLast={false} />)}
          {<PlayerForm data={null} key={'player' + this.state.players.length} callback={this.addPlayer} id={this.state.players.length} isLast={true}/>}
          <button className="control-button" onClick={this.handleClick.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Players;