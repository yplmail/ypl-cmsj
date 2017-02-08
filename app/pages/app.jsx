import React from 'react';
import {Link,IndexLink} from 'react-router';
require('./App.css');

export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
          <div className="footer">
              <ul>
                  <li><IndexLink to="/"    activeClassName="current"></IndexLink></li>
                  <li><Link to="/planner"  activeClassName="current"></Link></li>
                  <li><Link to="/customer" activeClassName="current"></Link></li>
                  <li><Link to="/mine"     activeClassName="current"></Link></li>
              </ul>
          </div>
          {this.props.children}
      </div>
    )
  }
}
