import React from 'react';
import './PlayerForm.css';

class PlayerForm extends React.Component {
 
  render() {
      return (
        <div id="player-forms">
            <input type="text" className="player-form form-name" name="name" placeholder="name"/>
            <input type="text" className="player-form form-surname" placeholder="surname"/>
            <input type="text" className="player-form form-grade" name="grade" placeholder="grade"/>
            <input type="text" className="player-form form-elo" name="elo" placeholder="elo"/>
            <div className="delete">&#10006;</div>
        </div>
      );
  }
}

export default PlayerForm;