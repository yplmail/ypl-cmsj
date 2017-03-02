import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Player extends React.Component{
    constructor(props){
        super(props)
        this.state={
            video  :{},
            videoId:''
        }
        this.first = true;    
        this.pauseHandle = this.pauseHandle.bind(this); 
    }

    pauseHandle(){
       
    }

    componentDidMount(){
        this.getVideos(true);
    }

    componentWillReceiveProps(prop){

    }

    shouldComponentUpdate(nextProps, state){
        return true;
    }

    getVideos(){
        let server = new ServerRequest();
        server.post({
            url:'advDetail',
            data:{
                publishId: this.props.videoId,
                token    : common.getcookies('token'),
                openId   : ''
            },
            success:function(response){
                this.setState({video:response});
                this.props.handle(response);
                this.initPlayer();
            }.bind(this)
        })           
    }


    initPlayer(){
        this.player = new prismplayer({
            id: "springGrassPlayer",
            source: this.state.video.playUrl,
            width : "100%",
            height: "220px",
            cover : this.state.video.coverUrl,
            preload : true,
            playsinline:true,
            autoplay:false
        });

        this.player.on('play',function(){
            this.first && this.notice();
        }.bind(this))

        this.player.on('ended',function(){
            document.querySelector('.video-player').style.display = 'none';
            document.querySelector('.video-cover').style.display  = 'block';
        }.bind(this))

        var pause = document.getElementsByClassName('video-pause')[0];
        pause.addEventListener("click", function () {
            document.querySelector('.video-player').style.display = 'block';
            document.querySelector('.video-cover').style.display  = 'none';
            this.player.replay();              
        }.bind(this), false);        
    }

    notice(){
        let server = new ServerRequest();
        server.post({
            url:'advStartPlay',
            data:{
                publishId: this.props.videoId,
                fromUrl  : document.referrer,
                shareUserId : this.props.shareId || '',
                clientType : 1,
                token    : common.getcookies('token')
            },
            success:function(response){
                this.first = false;
                this.clock(response.videoPlayRecordId); 
            }.bind(this)
        })        
    }

    clock(id){
        let count = parseInt(this.player.getDuration() / 100 * 1000);
        let timer = window.setInterval(function(){
            var ratio = parseFloat(this.player.getCurrentTime() / this.player.getDuration());
            if(ratio > 0.95){
                this.end(id);
                clearInterval(timer);
            }
        }.bind(this),count)        
    }

    end(id){
        let server = new ServerRequest();
        server.post({
            url:'advEndPlay',
            data:{
                videoPlayRecordId : id,
                token : common.getcookies('token')
            },
            success:function(response){
                this.props.handle(this.state.video,id);
            }.bind(this)
        })
    }

    render(){
        //this.initPlayer();
        let video = this.state.video;
        return (
            <div className="video-wrapper">
                <div className="video-player">
                    <div className="video-cover" style={{backgroundImage:'url('+video.coverUrl+')'}}>
                        <span className="video-pause" onClick={this.pauseHandle}></span>
                    </div>
                    <div id="springGrassPlayer" className="prism-player" ></div>
                </div>
                <div className="video-detail" data-flex="dir:left cross:center">
                    <div>{video.totalAmount}</div>
                    <div>红包已领{video.usedCount}个</div>
                    <div onClick={this.clickHandle}>{video.shareCount}</div>
                </div>
            </div>
        )
    }
}

export default Player;
