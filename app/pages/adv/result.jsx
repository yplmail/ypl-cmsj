import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './result.css';

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.openPacket();
        this.getPacketRecord();
    }

    /**
     * 打开红包
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    openPacket(event){
        let query = this.props.location.query;
        let server = new ServerRequest();
        server.post({
            url : 'receive',
            data:{
                publishId : query.videoId,
                videoPlayRecordId : query.playId
            },
            success:function(result){
                this.state({...result})
            }.bind(this)
        });
    }

    getPacketRecord(){

    }

    render(){
    	return(
          <div className="result-wrapper">
	          <div className="result-content">
		          <div className="header">
			          <i className="header-img"></i>
		          </div>
		          <div className="content">
			          <div>兰博基尼</div>
			          <div>感谢观看，小小心意，请笑纳</div>
			          <div>27.82</div>
			          <div>已存入我的钱包</div>
			          <div>超过63%用户</div>
			          <div><span>分享</span></div>
		          </div>
	          </div>

	          <div className="result-record">
		          <h1>已抢273个红包</h1>
		          <ul>
			          <li data-flex="dir:left box:justify">
				          <div><i></i></div>
				          <div>
					          <p>艾玛不是马</p>
					          <p>03-21 13:24</p>
				          </div>
				          <div>27.32元</div>
			          </li>
		          </ul>
	          </div>
          </div>
    	);
    }

}

export default Result;

