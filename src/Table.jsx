import React from 'react';
import './Table.css';


class Table extends React.Component {
    constructor() {
      super();
    }

    render(){
        return (
            <div>{this.props.players.map(player =><div>{player.name}</div>)}</div> //add keys
        )
    }
}

  export default Table;