import React from 'react';
import './Players.css';
import PlayerForm from './PlayerForm';
const ipcRenderer =  window.require('electron').ipcRenderer;


class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [{name: '',
      elo: '',
      grade: ''}]
    }
    this.update = this.update.bind(this);
    this.setPlayers = this.setPlayers.bind(this);
  }

  update(type, player, index) {
       
    this.setState(state => {
      const players = this.state.players;
      if (type === 'add') {
        state.players.push(player);
      } else if(type === 'update') {
          state.players[index] = player;
      } else if (type === 'remove'){
        state.players.splice(index, 1);
      }
      console.log(players);
        return { players }
    })
  }

  setPlayers(event, fesaPlayers){
    console.log(fesaPlayers);
  }

  componentDidMount() {
    ipcRenderer.send('window-ready')
    ipcRenderer.on('fesa-players', this.setPlayers)
  }
 
  componentWillUnmount() {
    ipcRenderer.removeListener('fesa-players', this.setPlayers)
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
          {this.state.players.map((player, i) => <PlayerForm data={player} key={'player' + i} callback={this.update} id={i} last={i===this.state.players.length-1}/>)}
          <button className="control-button" onClick={this.handleClick.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Players;