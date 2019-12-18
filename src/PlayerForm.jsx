import React from 'react';
import './PlayerForm.css';

class PlayerForm extends React.Component {

  constructor(props) {

    super(props);
    //console.log("Key: palyer" + this.props.id);

    //console.log(this.props);
    this.notify = this.notify.bind(this);
  }

  notify(type, property, event) {
    if (type === 'add') {
      this.props.callback(type, { 
        name: '',
        elo: '',
        grade: ''
      }, -1);
    } else if (type === 'update') {
      const data = { ...this.props.data };
      data[property] = event.target.value;
      this.props.callback(type, data, this.props.id);
    } else if (type === 'remove'){
      this.props.callback(type, {
        name: '',
        elo: '',
        grade: ''
      }, this.props.id);
    }
  }



  render() {

    return (
      <div id="player-forms">
        <input type="text" value={this.props.data.name} className="player-form form-name" name="name" placeholder="name" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'name', event)} />
        <input type="text" value={this.props.data.grade} className="player-form form-grade" name="grade" placeholder="grade" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'grade', event)} />
        <input type="text" value={this.props.data.elo} className="player-form form-elo" name="elo" placeholder="elo" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'elo', event)} />
        {!this.props.last ? <div className="delete" onClick={(event) => { this.notify('remove') }}>&#10006;</div> : <div className="delete hide">&#10006;</div>}
      </div>
    );
  }
}

export default PlayerForm;