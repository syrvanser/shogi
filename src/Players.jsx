import React from 'react';
import './Players.css';
import PlayerForm from './PlayerForm';

class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1
    }
  }

  addPlayer = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {

    const players = [];
    for (let i = 0; i < this.state.count; i++) {
      players.push(<PlayerForm key={'player' + i}/>);
    }

    return (
      <div>
        <div id="forms">
          {players}
        </div>
        <div id="buttons">
          <button className="control-button" onClick={this.addPlayer}>Add</button>
        </div>
      </div>
    );
  }
}

export default Players;