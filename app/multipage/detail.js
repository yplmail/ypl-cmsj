(function() {
    var detail = {
        init: function() {
            this.initVariable();
            this.fetchVideoData();
            this.fetchLuckyWinning();
            this.fetchRelatedvideo();
            this.fetchCommentList();
            this.isOpenPakcet();
            this.iniEvent();
        },

        initVariable(){
            this.first = true;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.pageCount = 0;
            this.search = utils.getsearch();
            this.ratio = utils.remRatio();
            this.scrollHeight = $(window).height() - 4.2*this.ratio - 1*this.ratio;
            $(".video-content").css('height',this.scrollHeight);                    
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

        fetchLuckyWinning() {
            utils.post({
                url: 'reward/luckyRank',
                data: {
                    publishId: this.search.videoId
                },
                success: function(response) {
                    if (response.datas.length > 0) {
                        $(".video-winning").css('display', 'flex');
                        response.datas && response.datas.forEach(function(item, index) {
                            $(".lucky-winning").append('<div class="winner"><div><img src="' + utils.joinImageUrl(item.avatar) + '"></div><div>￥' + item.amount + '</div></div>');
                        })
                    }
                }.bind(this)
            })
        },

        fetchRelatedvideo() {
            utils.post({
                url: 'video/relatedVideos',
                maskLayer: true,
                data: {
                    publishId: this.search.videoId
                },
                success: function(response) {
                    this.dealwidthData(response.datas||[]);
                    var timer = setTimeout(function(){
                        clearTimeout(timer);
                        this.scroll && this.scroll.refresh();
                    }.bind(this),0);
                }.bind(this)
            })
        },

        fetchCommentList: function() {
            utils.post({
                url: 'comment/talkList',
                data: {
                    publishId: this.search.videoId,
                    pageIndex: this.pageIndex,
                    pageSize : 10
                },
                success: function(response) {
                    var arr = [];
                    this.pageCount = response.pageCount;
                    this.isLoading = false;
                    if (response.totalCount > 0) {
                        response.datas && 　response.datas.forEach(function(item, index) {
                            var nickname = item.nickName || '草莓看客';
                            arr.push('<li data-flex="dir:top">' +
                                '<h3>' + nickname + '</h3>' +
                                '<p class="reply">' + item.content + '</p>' +
                                '<p class="time">' + item.createDt + '</p>' +
                                '<img class="headerImg" src="' + utils.joinImageUrl(item.avatar) + '">' +
                                '</li>');
                        });
                        $("#comment-outer").append(arr.join(""));
                        if(this.pageIndex < this.pageCount){
                            $(".scroll-loading").show();                            
                        }else{
                            $(".scroll-loading").hide();  
                        }
                    } else {
                        $("#comment-outer").append('<div data-flex="dir:top main:center cross:center">' +
                            '<p><img class="emptyImg" src="./images/comment_empty.png" /></p>' +
                            '<p style="line-height: 3em;">暂无评论，我先说两句...</p></div>');
                    }
                    var timer = setTimeout(function(){
                        clearTimeout(timer);
                        this.scroll && this.scroll.refresh();
                    }.bind(this),300);
                }.bind(this)
            })
        },

        isOpenPakcet() {
            if (this.search.playId) {
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

        dealwidthData: function(items) {
            var list = [];
            var width = Math.round(utils.remRatio() * 5.4);
            $(".slide-outer").css('width',items.length *　width)
            items.length > 0 && items.forEach(function(item, index) {
                list.push('<li class="item">' +
                    '<a href="./detail.html?videoId=' + item.publishId + '" class="relatedvideo-cover">' +
                    '<img src=' + utils.joinImageUrl(item.coverUrl) + '?x-oss-process=image/resize,m_lfit,w_' + width + '>' +
                    '</a>' +
                    '<div class="relatedvideo-detail">' +
                    '<h2 class="ellipsis">' + item.title + '</h2>' +
                    '<p>' +
                    '<span>' + (item.publishUserName || "草莓看客") + '</span>' +
                    '<span style="margin-left:.2rem">' + utils.transformThousand(item.playTimes) + '次</span>' +
                    '</p>' +
                    '</div></li>');
            })

            $(".slide-items").append(list.join(""));

            var timer = setTimeout(function() {
                clearTimeout(timer);
                this.inintSwiper(items);
                this.initScroll();
            }.bind(this), 320);
        },

        inintSwiper: function(arr) {
            // var swiper = new Swiper('.swiper-container', {
            //     loop: true,
            //     slidesPerView: 'auto',
            //     loopedSlides: arr.length,
            //     // autoplay: 3000,
            //     paginationClickable: true,
            //     autoplayDisableOnInteraction: false,
            //     spaceBetween: 5
            // });

            var slider  =  new IScroll('.slide-container',{
                scrollX: true, 
                scrollY: false,
                click  : true
            });


        },

        initScroll(){   
            this.scroll = new IScroll('.iscroll-outer',{click:true});

            this.scroll.on('scrollEnd',function(scroll){
                    //滑动元素的实际高度
                    //var sh = $('.scroll').offset().height;
                    //滑动高度 = 滑动元素的实际高度 - 容器高度
                    //var h = sh - this.scrollHeight;
                    //h 就是 this.scroll.maxScrollY
                    if(this.scroll.y < 0 && Math.abs(this.scroll.y) >= Math.abs(this.scroll.maxScrollY)){
                        if(this.isLoading) return false;
                        if(this.pageIndex < this.pageCount){
                            ++this.pageIndex;
                            this.isLoading = true;
                            this.fetchCommentList();                  
                        }
                    }
            }.bind(this))       
        },

        setting: function(data) {
            var width = Math.round(utils.remRatio() * 7.5);

            $(".player-cover").css("background-image", "url(" + utils.joinImageUrl(data.coverUrl) + "?x-oss-process=image/resize,m_lfit,w_" + width + ")");

            $("#playcount").text(data.playTimes + '次').parent().css('visibility', 'visible');

            if (data.totalAmount * 1) {
                if (data.totalCount - data.usedCount) {
                    $("#packetcount").text('剩余' + (data.totalCount - data.usedCount) + '个').parent().css('visibility', 'visible');
                } else {
                    $("#packetcount").text('已领完').parent().css('visibility', 'visible');
                }
                $("#maxpacket").text(data.maxMoney + '元').parent().css('visibility', 'visible');
            }

            if (data.productUrl) {
                $("#producturl").attr('href', data.productUrl).parent().css('visibility', 'visible')
            }

            $("#videotitle").text(data.title);

            $(".lucky-winning").attr('publishId', data.publishId);
        
            if (data.publishVideoDesc.length > 52) {
                $("#desarrow").show();
                $("#videodes").data('videodes', data.publishVideoDesc);
                $("#videodes").text(data.publishVideoDesc.substr(0, 52) + '...');
            } else {
                $("#videodes").text(data.publishVideoDesc);
            }

            $("#authorheader").attr('src', utils.joinImageUrl(data.ownerAvatar));
            $("#authorname").text(data.ownerNickname || '草莓看客');
            $("#videocount").text(data.ownerDeliveryCount);
            $(".author-more").attr('href', '../index.html#works/' + data.ownerUserid);

            if (data.publishAvatar) {
                $(".packet-header").css("background-image", "url(" + utils.joinImageUrl(data.publishAvatar) + ")");
            }
            $(".packet-title").text(data.publishNickName || '草莓看客');
            $(".packet-desprition").text(data.rewardsSlogan);
            $(".packet-wish").text(data.rewardsWish);

            $("#praisecount").text(data.pariseCount);
            $("#sharecount").text(data.shareCount);
            $("#commentcount").text(data.talkCount);

        },

        iniEvent: function() {

            $("#desarrowouter").on('click', function(event) {
                var child = $("#desarrowouter").find('img');
                if (child.hasClass('down')) {
                    child.attr('class', 'up');
                    child.attr('src', './images/des_up.png');
                    var des = $("#videodes").data('videodes');
                    $("#videodes").text(des); 
                } else {
                    child.attr('class', 'down');
                    child.attr('src', './images/des_down.png');
                    var des = $("#videodes").data('videodes').substr(0, 52) + '...';
                    $("#videodes").text(des); 
                }
    
                var timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.scroll && this.scroll.refresh();
                }.bind(this),0);

            }.bind(this))

            $("#praiseouter").on('click', function() {
                var index = layer.open({
                    content: '请下载草莓视界APP点赞',
                    style: 'background-color:#fff; color:#323232;width:70%', //自定风格
                    btn: ['确定', '取消'],
                    yes: function(index) {
                        layer.close(index);
                        location.href = './download.html';
                    }.bind(this)
                });
            })

            $("#commentouter").on('click', function() {
                var index = layer.open({
                    content: '请下载草莓视界APP发表评论',
                    style: 'background-color:#fff; color:#323232;width:70%', //自定风格
                    btn: ['确定', '取消'],
                    yes: function(index) {
                        layer.close(index);
                        location.href = './download.html';
                    }.bind(this)
                });
            })

            $("#shareouter").on('click', function() {
                $(".prism-player").hide();
                $(".player-cover").show();                
                $(".mask").show();
            })            

            $(".mask").on('click', function() {
                $(".prism-player").show();
                $(".player-cover").hide();
                $(this).hide();
            })

            $(".player-cover").on('click', function() {
                $(".player-cover").hide();
                $(".prism-player").show();
                this.player.replay();
            }.bind(this))

            $(".packet-open").on('click', function() {
                if (!this.videoPlayId) return false;
                $(".packet-wrapper").hide();
                if (utils.getcookies('token')) {
                    location = location.protocol + '//' + location.host + '/#result/' + this.search.videoId + '/' + this.videoPlayId;
                } else {
                    location = location.protocol + '//' + location.host + '/?source=detail/#login/' + this.search.videoId + '/' + this.videoPlayId;
                }
            }.bind(this))

            $(".packet-close").on('click', function() {
                $(".packet-wrapper").hide();
            }.bind(this))

            $(".lucky-winning").on('click', function() {
                location.href = "../index.html#winningLevel/" + $(this).attr('publishId')
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
                    this.hasReward = response.hasReward;
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
                    this.first = true;
                    if (this.hasReward == "true") {
                        $(".packet-wrapper").show();
                    }
                }.bind(this)
            })
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
    };
    detail.init();
})()
