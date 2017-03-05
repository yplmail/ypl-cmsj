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
        server.post({
            url :'newestUsedRewards',
            data:{
              publishId: this.props.videoId,
              count    : 100
            },
            success:function(response){
                let arr = response.datas;         
                this.setState({
                    packetList: arr
                });
                this.startMove();
            }.bind(this)
        })      
    }

    startMove(){     
        this.element = this.refs.vertical;
        if(this.state.packetList.length < 3){
            this.element.style.height = (this.state.packetList.length * 30) + 'px';          
        }
        this.element.innerHTML += this.element.innerHTML;
        this.element.scrollTop = 0;
        setTimeout(this.move.bind(this),500);
    }

    move(){  
        this.timer && clearTimeout(this.timer); 
        this.element.scrollTop ++;
        this.interval = setInterval(this.scroll.bind(this),40)      
    }

    scroll(){
        if(this.element.scrollTop % 30 == 0){
            this.interval && clearInterval(this.interval);
            this.timer = setTimeout(this.move.bind(this),2000)
        }else{
            this.element.scrollTop++;
            if(this.element.scrollTop == this.element.scrollHeight/2){
               this.element.scrollTop = 0;
            }
        } 
    }

    render(){
        let list = this.state.packetList;
        console.log(list.length)
        return (
          <div ref="vertical" className="packetRecord-wrapper" style={{display:(list.length > 0) ? 'block' : 'none'}}>
            <ul>
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left cross:center" key={index}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname.length > 6 ? (item.nickname.substr(0,6) + '...') : item.nickname}</div>
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
