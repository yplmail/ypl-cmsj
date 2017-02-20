import React from 'react';
import {Link} from 'react-router';
import './list.css';
import ServerRequest from 'server/serverRequest';

class List extends React.Component{
   constructor(props){
      super(props);
      this.state = {
        arr:[]
      }
   }
  
  componentDidMount(){
      var self = this;
      var xhr = new ServerRequest();
      xhr.get({
        url:'/mock/list.json',
        success:function(reponse){
            self.setState({
              arr:reponse.data
            })
        }
      })
  }

   render(){
      return (
        <div className="adv-list-wrapper">
           <ul>
             {
                this.state.arr.map((item, index) => {
                    return <ListItem item={item} key={index}/>
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
              <h2>{this.props.item.title}</h2>
              </div>
              <div data-flex="main:center cross:center">
              <span className="video-play"></span>
              </div>
              <div data-flex="dir:left">
              <p className="adv-invest">{this.props.item.invest}</p>
              <p className="adv-packetcount">红包已领{this.props.item.packetcount}个</p>
              <p className="adv-score">{this.props.item.score}分</p>
              <p className="adv-time"><span>{this.props.item.time}</span></p>
              </div>
            </Link>
          </li>
      )
   }
}

export default List;

