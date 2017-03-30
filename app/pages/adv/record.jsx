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
        if(this.iscroll){
            let timer = setTimeout(function(){
                clearTimeout(timer);
                this.iscroll.refresh();           
            }.bind(this),320)            
        }
    } 

    getList(){
        let server = new ServerRequest();
        server.post({
            url :'luckyRank',
            data:{
              publishId: this.props.videoId
            },
            success:function(response){      
                this.setState({
                    packetList: response.datas
                });
            }.bind(this)
        })      
    }

    render(){
        let list = this.state.packetList;
        let h = list.length > 0 ? '70px' : '0';
        return (
          <div ref="vertical" className="packetRecord-wrapper" data-flex="dir:left" style={{height:h}}>
              <div className="luck-star"></div>
              <div className="luck-level" data-flex="dir:left box:mean">
              {                
                    list.map(function(item,index){
                        let coverUrl = item.avatar ? 'url('+item.avatar+')' : '';
                        return(
                            <div key={index}>
                                <i className="luck-header" style={{backgroundImage:coverUrl}}></i>
                                <span className="gold">￥{item.amount}</span>
                            </div>
                        )
                    })
              }
              </div>
          </div>
        )
    }
}

export default Record;
