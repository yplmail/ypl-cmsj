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

    componentWillMount(){
        var ua = navigator.userAgent;
        if(/MicroMessenger/i.test(ua) && /Android/i.test(ua)){
            this.android = true;
        }else{
            this.android = false;
        }
    }

    componentDidMount(){
        this.getVideos();
    }

    pauseHandle(){
        document.querySelector('.prism-player').style.display = 'block';
        document.querySelector('.video-cover').style.display  = 'none';
        this.player.replay();
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
            if(this.android){
                document.querySelector('.prism-player').style.display = 'none';
                document.querySelector('.video-cover').style.display  = 'block';
                if(this.videoPlayId){
                    this.end();
                }               
            }
        }.bind(this))

        document.querySelector('.duration').innerText = this.state.video.duration;
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
                this.videoPlayId = response.videoPlayRecordId;
                !this.android && this.clock();
            }.bind(this)
        })
    }

    clock(){
        let count = parseInt(this.player.getDuration() / 100 * 1000);
        let timer = window.setInterval(function(){
            var ratio = parseFloat(this.player.getCurrentTime() / this.player.getDuration());
            if(ratio > 0.95){
                this.end();
                clearInterval(timer);
            }
        }.bind(this),count)
    }

    end(){
        let server = new ServerRequest();
        server.post({
            url:'advEndPlay',
            data:{
                videoPlayRecordId : this.videoPlayId,
                token : common.getcookies('token')
            },
            success:function(response){
                this.props.handle(this.state.video,this.videoPlayId);
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.videoPlayId = undefined;                    
                }.bind(this),300)
            }.bind(this)
        })
    }

    render(){
        let video = this.state.video;
        let coverUrl = '';
        if(video.coverUrl){
            coverUrl = "backgroundImage:url("+video.coverUrl+")";
        }
        return (
            <div className="video-wrapper">
                <div className="video-player">
                    <div className="video-cover" style={{coverUrl}}>
                        <span className="video-pause" onClick={this.pauseHandle}></span>
                    </div>
                    <div id="springGrassPlayer" className="prism-player" ></div>
                </div>
                <div className="video-detail" data-flex="dir:left cross:center">
                    <div>{video.totalAmount}</div>
                    <div>红包已领{video.usedCount}个</div>
                    <div onClick={this.props.share}>{video.shareCount}</div>
                </div>
            </div>
        )
    }
}

export default Player;
