import React from 'react';
import {Link} from 'react-router';
require('./App.css');

export default class Customer extends React.Component{
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
