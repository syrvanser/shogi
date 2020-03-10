import React from 'react';
import './PlayerForm.css';
import Autosuggest from 'react-autosuggest';




class PlayerForm extends React.Component {

  constructor(props) {

    super(props);
    //console.log("Key: player" + this.props.id);
    this.state = {
      nameSuggestions: [],
      gradeSuggestions: []
    }

    let kyu = [...Array(10).keys()].map((x) => x + " Kyu");
    let dan = [...Array(10).keys()].map((x) => x + " Dan");
    this.grades = [...kyu, ...dan, "N/A"];
    //console.log(this.props);
    this.notify = this.notify.bind(this);
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getNameSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue , 'i');  //need to fix surname search
    return this.props.fesaPlayers.filter(player => regex.test(player.name));
  }

  getNameSuggestionName(suggestion) {
    return suggestion.name;
  }

  renderNameSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span> //add underline for the search
    );
  }

  onNameSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      nameSuggestions: this.getNameSuggestions(value)
    });
  };

  onNameSuggestionsClearRequested = () => {
    this.setState({
      nameSuggestions: []
    });
  };

  onNameSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion);
    this.props.callback("update", {
      name: suggestion.name,
      elo: suggestion.elo,
      grade: suggestion.grade,
    }, this.props.id);
  };

  getGradeSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.grades.filter(grade => regex.test(grade));
  }

  getGradeSuggestionName(suggestion) {
    return suggestion;
  }

  renderGradeSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }

  onGradeSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      gradeSuggestions: this.getGradeSuggestions(value)
    });
  };

  onGradeSuggestionsClearRequested = () => {
    this.setState({
      gradeSuggestions: []
    });
  };

  onGradeSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion);
    this.notify("update", "grade", suggestion);
  };

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
    } else if (type === 'remove') {
      this.props.callback(type, {
        name: '',
        elo: '',
        grade: ''
      }, this.props.id);
    }
  }

  render() {

    const nameProps = {
      placeholder: "name",
      value: this.props.data.name,
      onChange: (event) => {this.notify('update', 'name', event.target.value)},
      onClick: () => { if (this.props.last) { this.notify('add') } },
      name: "name",
      className: "player-form form-name",
    };

    const gradeProps = {
      value: this.props.data.grade,
      className: "player-form form-grade",
      name: "grade",
      placeholder: "grade",
      onClick: () => { if (this.props.last) { this.notify('add') } },
      onChange: (event) => this.notify('update', 'grade', event.target.value)
    }

    return (
      <div id="player-forms">
        <Autosuggest
          suggestions={this.state.nameSuggestions}
          onSuggestionsFetchRequested={this.onNameSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onNameSuggestionsClearRequested}
          onSuggestionSelected={this.onNameSuggestionSelected}
          getSuggestionValue={this.getNameSuggestionName}
          renderSuggestion={this.renderNameSuggestion}
          inputProps={nameProps}
        />

        <Autosuggest
          suggestions={this.state.gradeSuggestions}
          onSuggestionsFetchRequested={this.onGradeSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onGradeSuggestionsClearRequested}
          onSuggestionSelected={this.onGradeSuggestionSelected}
          getSuggestionValue={this.getGradeSuggestionName}
          renderSuggestion={this.renderGradeSuggestion}
          inputProps={gradeProps}
        />

        <div className="elo-input"><input type="text" value={this.props.data.elo} className="player-form form-elo" name="elo" placeholder="elo" onClick={() => { if (this.props.last) { this.notify('add') } }} onChange={(event) => this.notify('update', 'elo', event.target.value)} /></div>
        {!this.props.last ? <div className="delete" onClick={(event) => { this.notify('remove') }}>&#10006;</div> : <div className="delete hide">&#10006;</div>}
      </div>
    );
  }
}

export default PlayerForm;