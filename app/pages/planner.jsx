import React from 'react';
import {Link} from 'react-router';
require('./App.css');

export default class Planner extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
       {this.props.children}
      </div>
    )
  }
}
