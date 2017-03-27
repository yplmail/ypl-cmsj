import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Video extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           videoList : []
        };
        this.first  = false;
        this.width = Math.round(common.remRatio() * 2.56) * 2;
    }

    componentDidMount(){
        this.getVideos();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.scroll){
            this.iscroll= nextProps.scroll; 
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

    getVideos(){
        let server = new ServerRequest();
        server.post({
            url :'correlationVideo',
            maskLayer:true,
            data:{
                publishId: this.props.videoId,
                openId   : ''
            },
            success:function(response){
                this.first = true;
                this.setState({videoList:response.datas})
            }.bind(this)
        })
    }

    linkHandle(id){
        if(/^#\/detail/.test(location.hash)){
            location.hash ='video/'+id;
        }else{
            location.hash ='detail/'+id;
        }
    }

    loopVideoList(){
      let videos = this.state.videoList;
      return videos.map((item,index)=>{
           return(
              <li data-flex="box:last" key={index} onClick={this.linkHandle.bind(this,item.publishId)}>
                  <div data-flex="dir:top box:last">
                      <h3>{item.title.length > 24 ? (item.title.substr(0,24) + '...') : item.title}</h3>
                      <div className="video-property" data-flex="cross:center box:mean">
                          <p>{item.publishUserName}</p>
                          <p>{item.playTimes}次播放</p>
                      </div>
                  </div>
                  <div>
                      <img src={item.coverUrl+'?x-oss-process=image/resize,m_lfit,w_'+this.width}/>
                  </div>
              </li>
           )
      })
    }

    render(){
        if(this.state.videoList.length > 0 ){
            var content = this.loopVideoList();
        }else{
            if(this.first){
              var content = <div className="no-video">暂无相关视频</div>;
            }else{
              var content = null;
            }
        }

        return (
            <div className="correlation-wrapper">
                <h2>相关视频</h2>
                <ul>
                    {content}
                </ul>
            </div>
        )
    }
}

export default Video;
