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
        server.post({
            url :'newestUsedRewards',
            data:{
              publishId: this.props.parameter.videoId
            },
            success:function(response){
              this.changeState(response.datas)
            }.bind(this)
        })
    }

    changeState(arr){
        if(arr.length > 3){
            let list = new Array();
            for(var i = 0 ; i < 2 ; i++){
                arr.map(function(item,index){
                  list.push(item);
                })
            }
            arr = arr.concat(list);
            this.setState({
                packetList:arr,
                slide     : 'slide'
            });
        }else{
            this.setState({packetList:arr});
        }
    }

    render(){
        let list = this.state.packetList;
        return (
          <div className="record-wrapper" style={{display:(list.length > 0) ? 'block' : 'none'}}>
            <ul id="slideWrapper">
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left main:center cross:center" key={index + item.packageAmount}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠<span>{item.packageAmount}</span>元</div>
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
                            <div>获赠&nbsp;<span>&nbsp;{item.packageAmount}&nbsp;</span>&nbsp;元</div>
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