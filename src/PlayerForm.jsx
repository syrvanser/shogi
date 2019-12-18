import React from 'react';
import './PlayerForm.css';
import Autosuggest from 'react-autosuggest';




class PlayerForm extends React.Component {

  constructor(props) {

    super(props);
    //console.log("Key: palyer" + this.props.id);
    this.state = {
      nameSuggestions: []
    }
    //console.log(this.props);
    this.notify = this.notify.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    console.log(this.props.fesaPlayers)
    return this.props.fesaPlayers.filter(player => regex.test(player.name));
  }
  
  getSuggestionName(suggestion) {
    return suggestion.name;
  }
    
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  notify(type, property, value) {
    if (type === 'add') {
      this.props.callback(type, { 
        name: '',
        elo: '',
        grade: ''
      }, -1);
    } else if (type === 'update') {
      const data = { ...this.props.data };
      data[property] = value;
      this.props.callback(type, data, this.props.id);
    } else if (type === 'remove'){
      this.props.callback(type, {
        name: '',
        elo: '',
        grade: ''
      }, this.props.id);
    }
  }

  onNameChange = (event, { newValue }) => {
    this.notify('update', 'name', newValue)
  };
  
  onNameSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      nameSuggestions: this.getSuggestions(value)
    });
  };

  onNameSuggestionsClearRequested = () => {
    this.setState({
      nameSuggestions: []
    });
  };

  onNameSuggestionSelected = (event, { suggestion }) => {
      console.log(suggestion);
    
  };


  onClick(){
    if (this.props.last) { this.notify('add') }
  }
 
  render() {

    const nameProps = {
      placeholder: "name",
      value: this.props.data.name,
      onChange: this.onNameChange,
      onClick: this.onClick,
      name: "name",
      className: "player-form form-name",
      
    };


    return (
      <div id="player-forms">
        <Autosuggest 
        suggestions={this.props.fesaPlayers}
        onSuggestionsFetchRequested={this.onNameSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onNameSuggestionsClearRequested}
        onSuggestionSelected={this.onNameSuggestionSelected}
        getSuggestionValue={this.getSuggestionName}
        renderSuggestion={this.renderSuggestion}
        inputProps={nameProps}
      />
      <input type="text" value={this.props.data.grade} className="player-form form-grade" name="grade" placeholder="grade" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'grade', event.target.value)} />
        <input type="text" value={this.props.data.elo} className="player-form form-elo" name="elo" placeholder="elo" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'elo', event.target.value)} />
        {!this.props.last ? <div className="delete" onClick={(event) => { this.notify('remove') }}>&#10006;</div> : <div className="delete hide">&#10006;</div>}
      </div>
    );
  }
}

export default PlayerForm;