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
        this.playHandle = this.playHandle.bind(this);
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
                //common.changeTitle(response.title);
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
                desc    : data.publishVideoDesc || '一起发现创意美',
                link    : 'http://'+location.hostname+'/#/share/'+data.publishId+'/'+shareId,
                imgUrl  : data.coverUrl,
                type    : 'video',
                dataUrl : data.playUrl,
                success : this.shareSuccess.bind(this)
            },
            packet:{
                packetType      : 0,
                packetAnimation : '',
                video           : data,
                playRecordId    : this.props.playId || ''
            }
        });

        if(this.props.playId){
            this.isOpenPakcet();
        }
    }

    isOpenPakcet(){
        let server = new ServerRequest();
        server.post({
            url:'isValidplayId',
            data:{
                videoPlayRecordId : this.props.playId
            },
            success:function(response){
                if(response.valid === "true"){
                    this.setState({
                        share  :{
                             display:'none'
                        },
                        packet:{
                             packetAnimation : 'animation'
                        }
                    });
                }
            }.bind(this)
        })
    }

    /**
     * 打开分享
    */
    shareHandle(){
        this.pauseHandle();
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
        this.setState({
            share  :{
                 display:'none'
            },
            packet:{
                 packetAnimation : ''
            }
        });

        let server = new ServerRequest();

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
            share  : {
                 display:'none'
            },
            packet:{
                 packetAnimation : ''
            }
        })
    }

    /**
     * 播放
    */
    playHandle(replay){
        let time      = this.player.getCurrentTime();
        let duration  = this.player.getDuration();
        if(time != 0 && time < duration){
            document.querySelector('.prism-player').style.display = 'block';
            document.querySelector('.video-cover').style.display  = 'none';
            this.player.play();
        }
        if(replay && time == duration){
            document.querySelector('.prism-player').style.display = 'block';
            document.querySelector('.video-cover').style.display  = 'none';
            this.notice()
            this.player.replay();
        }
    }

    /**
     * 暂停
    */
    pauseHandle(){
        this.player.pause();
        document.querySelector('.prism-player').style.display = 'none';
        document.querySelector('.video-cover').style.display  = 'block';
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
            autoplay:false,
            showBuffer:true,
            skinLayout:[{
                "name":"bigPlayButton",
                "align":"cc",
                "x":30,
                "y":80
            },{
                "name":"controlBar",
                "align":"blabs",
                "x":0,
                "y":0,
                "children":[
                    {
                        "name":"playButton",
                        "align":"blabs",
                        "x":20,
                        "y":6
                    },{
                        "name":"timeDisplay",
                        "align":"tlabs",
                        "x":50,
                        "y":0
                    },{
                        "name":"fullScreenButton",
                        "align":"brabs",
                        "x":20,
                        "y":6
                    }
                ]
            }]
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

        let timer = setTimeout(function(){
            clearTimeout(timer);
            if(document.querySelector('.duration')){
                document.querySelector('.duration').innerText = this.state.video.duration;
            }
        }.bind(this),320);
    }

    componentWillUnmount(){
        this.player.pause();
        this.player = null;
        let server = new ServerRequest();
        server.post({
            url:'advEndPlay',
            data:{
                videoPlayRecordId : this.videoPlayId
            }
        })
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
        let amount = parseFloat(video.totalAmount || 0);
        let styles = amount ? '' : 'hidden';
        return (
            <div className="video-wrapper">
                <div className="video-player">
                <div className="video-cover" style={{backgroundImage:coverUrl}}>
                <span className="video-pause" onClick={this.playHandle.bind(this,true)}></span>
                </div>
                <div id="springGrassPlayer" className="prism-player" ></div>
                </div>
                <div className="video-detail" data-flex="dir:left cross:center">
                <div style={{visibility:styles}}>{video.totalAmount}</div>
                <div style={{visibility:styles}}>已领{video.usedCount}个</div>
                <div onClick={this.shareHandle}>{video.shareCount}</div>
                </div>
                <Packet {...this.state.packet}/>
                <Share  {...this.state.share} handle={this.playHandle}/>
            </div>
        )
    }
}

export default Player;
