(function() {
    var video = {
        init: function() {
            this.pageIndex = 1;
            this.pageSize = 100;
            this.packetList = [];
            this.pageCount = 0;
            this.num = 0;
            this.initsize = 0.5;
            this.first = true;
            this.element = $(".center-packet")[0];
            this.tabnav = $(".tab-nav a");
            this.search = utils.getsearch();
            this.fetchVideoData();
            this.fetchPacketData();
            this.startPacketRain();
            this.isOpenPakcet();
            this.register();
            this.initEvent();
        },

        fetchVideoData: function() {
            utils.post({
                url: 'publish/detail',
                loadLayer: true,
                data: {
                    publishId: this.search.videoId
                },
                success: function(data) {
                    this.initPlayer(data);
                    this.setting(data);
                    this.initShare(data);
                }.bind(this)
            });
        },

        fetchPacketData: function() {
            utils.post({
                url: 'reward/rankings',
                data: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    publishId: this.search.videoId
                },
                success: function(response) {
                    this.packetList = this.packetList.concat(response.datas);
                    this.pageCount = response.pageCount
                }.bind(this)
            });
        },

        register: function() {
            var token = utils.getcookies('token');
            if (this.search.code && !token) {
                utils.post({
                    url: 'user/V2WechatLogin',
                    data: {
                        code: this.search.code,
                        state: this.search.state,
                        recommendCode: this.search.shareId
                    },
                    success: function(response) {
                        utils.setcookies('token',response.token,7);
                        utils.setcookies('refreshTokenTime',Date.now(),2);
                    }.bind(this)
                });
            }
        },

        isOpenPakcet() {
            if(this.search.playId){
                utils.post({
                    url: 'publish/videoPlayRecordValid',
                    data: {
                        videoPlayRecordId: this.search.playId
                    },
                    success: function(response) {
                        if (response.valid === "true") {
                           $(".packet-wrapper").show();
                        }
                    }.bind(this)
                })       
            }
        },

        initEvent: function() {
            $(".shareLogo , .shareText").on('click', function() {
                $(".prism-player").hide();
                $(".player-cover").show();
                $(".mask").show();
            }.bind(this))

            $(".mask").on('click', function() {
                $(".mask").hide();
                $(".player-cover").hide();
                $(".prism-player").show();
            }.bind(this))

            $(".player-cover").on('click', function() {
                $(".player-cover").hide();
                $(".prism-player").show();
                this.first = true;
                this.player.replay();
            }.bind(this))

            $(".packet-open").on('click', function() {
                $(".packet-wrapper").hide();
                if (utils.getcookies('token')) {
                    location = location.protocol + '//' + location.host + '/#result/' + this.search.videoId + '/' + this.videoPlayId;
                } else {
                    location = location.protocol + '//' + location.host + '/?source=video/#login/' + this.search.videoId + '/' + this.videoPlayId;
                }
            }.bind(this))

            $(".packet-close").on('click', function() {
                $(".packet-wrapper").hide();
            })

            $(".center-packet").on('click',function(){
                layer.open({ content: '<span style="font-size:15px">红包正在发育</br>看完视频才能开红包哦~</span>', time: 2 });
            })
        },

        setting: function(data) {
            $(".player-cover").css("background-image", "url(" + utils.joinImageUrl(data.coverUrl) + ")");
            $(".video-content-bg").css("background-image", "url(" + utils.joinImageUrl(data.coverUrl) + ")");
            if (data.totalCount - data.usedCount) {
                $("#packetcount").text('剩余' + (data.totalCount - data.usedCount) + '个');
            } else {
                $("#packetcount").text(data.totalCount + '个');
            }
            $("#packetamount").text(data.maxMoney);
            $("#playTimes").text(data.playTimes);
            if(data.publishAvatar){
                $(".packet-header").css("background-image", "url(" + utils.joinImageUrl(data.publishAvatar) + ")");              
            }
            $(".packet-title").text(data.publishNickName || '草莓看客');
            $(".packet-desprition").text(data.rewardsSlogan);
            $(".packet-wish").text(data.rewardsWish);
        },

        startScale: function(duration) {
            var scaletimer = setInterval(function() {
                var duration = this.player.getDuration();
                var time = this.player.getCurrentTime();
                var addsize = parseFloat((time / duration).toFixed(2));
                var endsize = this.initsize + addsize;
                this.element.style.transform = 'scale3d(' + endsize + ', ' + endsize + ', ' + endsize + ')';
                this.element.style.webkitTransform = 'scale3d(' + endsize + ', ' + endsize + ', ' + endsize + ')';

                var timer = setTimeout(function() {
                    if (addsize == 1) {
                        clearInterval(scaletimer);
                        this.element.style.transform = 'scale3d(1.2, 1.2, 1.2)';
                        this.element.style.webkitTransform = 'scale3d(1, 1, 1)';
                    } else {
                        this.element.style.transform = 'scale3d(0.5, 0.5, 0.5)';
                        this.element.style.webkitTransform = 'scale3d(0.5, 0.5,0.5)';
                    }
                    clearTimeout(timer);
                }.bind(this), 750)
            }.bind(this), 1500);
        },

        startPacketRain: function() {
            this.packetRainTimer = setInterval(function() {
                if (this.packetList.length > 0) {
                    this.createPacket();
                }
            }.bind(this), 1000)
        },

        createPacket: function() {
            //红包大小（图片大小）
            var size = Math.max(parseFloat(Math.random().toFixed(1)), 0.4);
            var left = parseInt(Math.random() * window.innerWidth);
            var width = utils.remRatio() * 1.53
            if (left > window.innerWidth - width) {
                left = window.innerWidth - width;
            }
            var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";

            var item = this.packetList[this.num]

            var avatar = utils.joinImageUrl(item.avatar);

            var element = $("<li><img src='" + avatar + "'><span>￥" + item.amount + "</span></li>");

            element.css({
                "left": left,
                "transform": "rotate(" + rot + ") scale(" + size + ")",
                "-webkit-transform": "rotate(" + rot + ") scale(" + size + ")"
            });

            setTimeout(function() {
                element.addClass('translate');
            }, 100)

            element.one('webkitTransitionEnd', function() {
                element.remove();
            }.bind(this))

            $(".packet-container").append(element);

            if (this.num < this.packetList.length - 1) {
                if (this.pageIndex < this.pageCount) {
                    if (this.num >= this.packetList.length - 10) {
                        ++this.pageIndex;
                        this.fetchPacketData();
                    }
                }
                ++this.num;
            } else {
                this.num = 0
            }
        },

        initShare: function(data) {
            var tk = utils.getcookies('token');
            var shareId = tk ? tk.split("_")[1] : '';
            wechatshare.share({
                title: data.title,
                desc: '玩转创意视频 , 分享红包之道, 草莓视界等你来撩！',
                link: location.protocol + '//' + location.hostname + '/multipage/video.html?videoId=' + this.search.videoId + "&shareId=" + shareId,
                imgUrl: location.protocol + '//' + location.hostname + '/images/strawberry_logo.png'
            })
        },

        /**
         *  记录开始播放时间
         */
        notice: function() {
            utils.post({
                url: 'publish/startPlay',
                data: {
                    publishId: this.search.videoId,
                    fromUrl: document.referrer,
                    shareUserId: this.search.shareId,
                    clientType: 1
                },
                success: function(response) {
                    this.first = false;
                    this.videoPlayId = response.videoPlayRecordId;
                }.bind(this)
            })
        },

        playend: function() {
            utils.post({
                url: 'publish/endPlay',
                data: {
                    videoPlayRecordId: this.videoPlayId
                },
                success: function(response) {
                    $(".packet-wrapper").show();
                }.bind(this)
            })
        },

        initPlayer: function(data) {
            this.player = new prismplayer({
                id: "player",
                source: data.playUrl,
                width: "100%",
                height: (4.2 * utils.remRatio()) + 'px',
                cover: data.coverUrl,
                preload: true,
                playsinline: true,
                autoplay: false,
                showBuffer: true,
                skinLayout: [{
                    "name": "bigPlayButton",
                    "align": "cc",
                    "x": 30,
                    "y": 80
                }, {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [{
                        "name": "playButton",
                        "align": "blabs",
                        "x": 20,
                        "y": 6
                    }, {
                        "name": "timeDisplay",
                        "align": "tlabs",
                        "x": 50,
                        "y": 0
                    }, {
                        "name": "fullScreenButton",
                        "align": "brabs",
                        "x": 20,
                        "y": 6
                    }]
                }]
            });

            this.player.on('play', function(event) {
                this.startScale();
                this.first && this.notice();
            }.bind(this))

            this.player.on('pause', function(event) {
                this.timer && clearInterval(this.timer);
            }.bind(this))

            this.player.on('ended', function(event) {
                $(".prism-player").hide();
                $(".player-cover").show();
                this.playend();
            }.bind(this))
        }
    }
    video.init();
})()
