import React from 'react';
import './PlayerForm.css';

class PlayerForm extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.data != null) {
      this.state = {
        name: this.props.data.name,
        surname: this.props.data.surname,
        elo: this.props.data.elo,
        grade: this.props.data.grade,
        hidden: false,
      };
    } else {
      this.state = {
        name: '',
        surname: '',
        elo: '',
        grade: '',
        hidden: false,
      };

    }
    //console.log(this.props);
    this.update.bind(this);

  }

  update(event, property) {
    const data = this.state;
    data[property] = event.target.value;
    data.isLast = false;
    this.props.callback(data, this.props.id);
  }


  render() {
    return (
      <div id="player-forms" style={this.state.hidden ? { display: 'none' } : {}}>
        <input type="text" className="player-form form-name" name="name" placeholder="name" onChange={(event) => this.update(event, 'name')} />
        <input type="text" className="player-form form-surname" placeholder="surname" onChange={(event) => this.update(event, 'surname')} />
        <input type="text" className="player-form form-grade" name="grade" placeholder="grade" onChange={(event) => this.update(event, 'grade')} />
        <input type="text" className="player-form form-elo" name="elo" placeholder="elo" onChange={(event) => this.update(event, 'elo')} />
        {!this.props.isLast ? <div className="delete" onClick={() => { this.setState({ hidden: true }) }}>&#10006;</div> : <div className="delete hide">&#10006;</div>}
      </div>
    );
  }
}

export default PlayerForm;