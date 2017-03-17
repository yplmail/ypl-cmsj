import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Record extends React.Component{
    constructor(props){
        super(props);
        this.state={
            packetList : []
        };
        this.iscroll = null;
    }

    componentDidMount(){
        this.getList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.scroll){
            this.iscroll = nextProps.scroll; 
        }
    }

    componentDidUpdate(){
        this.iscroll && this.iscroll.refresh();
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
        return (
          <div ref="vertical" className="packetRecord-wrapper">
            <ul>
               {
                  list.map((item,index)=>{
                      let url = item.faceUrl ?'url('+item.faceUrl+')' : '';
                      return (
                        <li data-flex="dir:left cross:center" key={index}>
                            <div><i style={{backgroundImage:url}} className="personal-header"></i></div>
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
