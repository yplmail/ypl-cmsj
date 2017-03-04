import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Record extends React.Component{
    constructor(props){
        super(props);
        this.state={
            packetList : [],
            slide      : ''
        }
    }

    componentDidMount(){
        let server = new ServerRequest();
        server.get({
            mock : true,
            url :'newestUsedRewards',
            data:{
              publishId: this.props.videoId
            },
            success:function(response){
              this.changeState(response.datas)
            }.bind(this)
        })
    }

    changeState(arr){
        if(arr.length > 3){
            let len = Math.ceil((20-arr.length)/arr.length);
            let newArr = []
            for(var i = 0 ; i < len ; i++){
               arr.map(function(item,index){
                  newArr.push(item)
               })
            }
            arr = arr.concat(newArr);
            this.setState({
                packetList:arr,
                slide: 'slide'
            });
        }else{
            this.setState({packetList:arr});
        }
    }

    render(){
        let list = this.state.packetList;
        return (
          <div className="packetRecord-wrapper" style={{display:(list.length > 0) ? 'block' : 'none'}}>
            <ul id="slideWrapper" className={this.state.slide}>
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left main:center cross:center" key={index + item.packageAmount}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠&nbsp;<span>{item.packageAmount}</span>&nbsp;元</div>
                        </li>
                      )
                  })
               }
            </ul>
            <ul>
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left main:center cross:center" key={index + item.packageAmount}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠&nbsp;<span>{item.packageAmount}</span>&nbsp;元</div>
                        </li>
                      )
                  })
               }
            </ul>
          </div>
        )
    }
}

export default Record;
