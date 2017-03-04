import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Record extends React.Component{
    constructor(props){
        super(props);
        this.state={
            packetList : []
        }
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        let server = new ServerRequest();
        server.get({
            mock : true,
            url :'newestUsedRewards',
            data:{
              publishId: this.props.videoId,
              count    : 100
            },
            success:function(response){
                this.setState({
                    packetList: this.state.packetList.concat(response.datas)
                });
                this.moveTimer = setTimeout(function(){
                  //clearInterval(this.intervalTimer)
                  this.move();
                }.bind(this),320)
            }.bind(this)
        })      
    }

    move(){
        clearInterval(this.moveTimer);
        let target = this.refs.vertical;
        let size   = this.state.packetList.length;
        let height = target.offsetHeight + target.offsetTop/(window.devicePixelRatio || 1);
        let moveH  = height / size;
        let count  = 1;
        // this.intervalTimer  = setInterval(function(){
        //       target.style.transform = 'translate3d(0, '+(-count*moveH)+'px, 0)';
        //       target.style.webkitTransform = '-webkit-translate3d(0, '+(-count*moveH)+'px, 0)';
        //       if(count >= size-1){                
        //           this.changeParentHeight(height,count,moveH);
        //       }
        //       count++;
        // }.bind(this),4000)
    }

    changeParentHeight(){
        this.getList();
    }

    render(){
        let list = this.state.packetList;
        return (
          <div className="packetRecord-wrapper" style={{display:(list.length > 0) ? 'block' : 'none'}}>
            <ul ref="vertical">
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left cross:center" key={index + item.packageAmount}>
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
