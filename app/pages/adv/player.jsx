import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import Share   from 'share/share';
import Packet  from './Packet';
import 'player/player.css';

class Player extends React.Component{
    constructor(props){
        super(props)
        this.state={
            video :{},
            share :{
                display :'none',
                title   : '',
                desc    : '',
                link    : '',
                imgUrl  : '',
                type    : '',
                dataUrl : '',
                success : ''
            },
            packet:{
                packetType : 0,
                packetAnimation :'',
                video  : {},
                playRecordId:''
            }
        }
        this.first = true;
        this.pauseHandle = this.pauseHandle.bind(this);
        this.shareHandle = this.shareHandle.bind(this);
        this.scoreHandle = this.scoreHandle.bind(this);
    }

    componentDidMount(){
        this.getVideo();
    }

    getVideo(){
        let server = new ServerRequest();
        server.post({
            url:'advDetail',
            data:{
                publishId: this.props.videoId,
                openId   : ''
            },
            success:function(response){
                this.setData(response);
                this.initPlayer();
            }.bind(this)
        })
    }

    setData(data){
        let tk = common.getcookies('token');
        let shareId = tk ? tk.split("_")[1] : '';
        this.setState({
            video : data,
            share : {
                title   : data.title,
                desc    : data.desc,
                link    : 'http://'+location.hostname+'/#/share/'+data.publishId+'/'+shareId,
                imgUrl  : data.coverUrl,
                type    : 'video',
                dataUrl : data.playUrl,
                success : this.shareSuccess.bind(this)
            },
            packet:{
                packetType      : 0,
                packetAnimation : this.props.shareId ? 'animation' : '',
                video           : data,
            }
        });
    }

    /**
     * 打开分享
    */
    shareHandle(){
        this.setState({
            share  :{
                 display:'block'
            },
            packet:{
                 packetAnimation : ''
            }
        });
    }

    /**
     * 分享成功
    */
    shareSuccess(){
        let server = new ServerRequest();
        this.setState({share: { display : 'none'}});
        server.post({
            url:'shareSuccess',
            data:{
                publishId:this.props.videoId
            },
            success:function(response){
               //微信自带分享成功提示
            }
        });
    }

    /**
     * 评分操作
    */
    scoreHandle(){
        this.setState({
            share  :{
                 display:'none'
            },
            packet:{
                 packetAnimation : ''
            }
        })
        this.props.handle();
    }

    /**
     * 重播
    */
    pauseHandle(){
        document.querySelector('.prism-player').style.display = 'block';
        document.querySelector('.video-cover').style.display  = 'none';
        this.player.replay();
    }

    /**
     *  初始化播放器
    */
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
                document.querySelector('.prism-player').style.display = 'none';
                document.querySelector('.video-cover').style.display  = 'block';
                if(this.videoPlayId){
                    this.end();
                }
        }.bind(this))

        document.querySelector('.duration').innerText = this.state.video.duration;
    }

    /**
     *  记录开始播放时间
    */
    notice(){
        let server = new ServerRequest();
        server.post({
            url:'advStartPlay',
            data:{
                publishId   : this.props.videoId,
                fromUrl     : document.referrer,
                shareUserId : this.props.shareId || '',
                clientType  : 1
            },
            success:function(response){
                this.first = false;
                this.videoPlayId = response.videoPlayRecordId;
            }.bind(this)
        })
    }

    /**
     *  播放结束
    */
    end(){
        let server = new ServerRequest();
        server.post({
            url:'advEndPlay',
            data:{
                videoPlayRecordId : this.videoPlayId
            },
            success:function(response){
                this.setState({
                    share  :{
                         display:'none'
                    },
                    packet:{
                         packetAnimation : 'animation',
                         playRecordId    : this.videoPlayId
                    }
                });
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.videoPlayId = undefined;
                }.bind(this),320);
            }.bind(this)
        })
    }

    render(){
        let video = this.state.video;
        let coverUrl = video.coverUrl ?'url('+video.coverUrl+')' : '';
        return (
            <div className="video-wrapper">
                <div className="video-player">
                <div className="video-cover" style={{backgroundImage:coverUrl}}>
                <span className="video-pause" onClick={this.pauseHandle}></span>
                </div>
                <div id="springGrassPlayer" className="prism-player" ></div>
                </div>
                <div className="video-detail" data-flex="dir:left cross:center">
                <div>{video.totalAmount}</div>
                <div>红包已领{video.usedCount}个</div>
                <div onClick={this.shareHandle}>{video.shareCount}</div>
                </div>
                <Packet {...this.state.packet} handle={this.scoreHandle}/>
                <Share  {...this.state.share} />
            </div>
        )
    }
}

export default Player;
