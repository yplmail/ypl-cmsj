import React from 'react';
import {Link} from 'react-router';
import './list.css';

class List extends React.Component{
   constructor(props){
      super(props);
      this.state = {
        arr : [1,2,3,4,5,6]
      }
   }

   render(){
      return (
        <div className="adv-list-wrapper">
           <ul>
             {
                this.state.arr.map((item, index) => {
                    return <ListItem key={index}/>
                })
             }
           </ul>
        </div>
      )
   }
}

class ListItem extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
      return(
          <li>
            <Link to="detail">
              <div>
              <h2>每个人都想做安心的公民</h2>
              </div>
              <div data-flex="main:center cross:center">
              <span className="video-play"></span>
              </div>
              <div data-flex="dir:left">
              <p className="adv-invest">250000.00</p>
              <p className="adv-packetcount">红包已领1234567个</p>
              <p className="adv-score">3.6分</p>
              <p className="adv-time"><span>3:26</span></p>
              </div>
            </Link>
          </li>
      )
   }
}

export default List;

