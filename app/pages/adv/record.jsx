import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Record extends React.Component{
    constructor(props){
        super(props);
        this.state={
            packetList : []
        };
    }

    componentDidMount(){
        this.getList();
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
              <div className="luck-level">
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
