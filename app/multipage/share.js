(function() {
    var share = {
        init: function() {
            $('.share-wrapper').css('height',$(window).height());
            this.search = utils.getsearch();
            this.fetchVideoData();
            this.share();
            this.addEvent();
            this.coverWidth = Math.round(utils.remRatio() * 6.8);
        },

        fetchVideoData: function() {
            utils.post({
                url: 'share/redPacket',
                data: {
                    publishPlayRecordsId: this.search.playId
                },
                success: function(data) {
                    this.setting(data);
                }.bind(this)
            });
        },

        setting: function(data) {
            if (data.avatar) {
                $("#header").attr('src', utils.joinImageUrl(data.avatar))
            }
            if (data.amount) {
                $("#tips").show();
                $("#winningAmt").text(data.amount).show();
            } else {
                $("#nowinning").show();
            }

            $("#nikename").text(data.nickName || '草莓看客');


            if(data.totalAmount == 0){
                $(".video-detail").css("visibility",'hidden');
            }else{
                if((data.totalCount - data.usedCount) > 0){
                    $("#video_packet").text('剩余' + (data.totalCount - data.usedCount) + '个');               
                }else{
                    $("#video_packet").text(data.totalCount + '个'); 
                }
                $("#video_max_packet").text(data.maxMoney);
                $("#video_play").text(data.playTimes);      
            }

            $("#video-time").text(data.duration);
            $(".video-outer").css("background-image", "url(" + utils.joinImageUrl(data.coverUrl) + "?x-oss-process=image/resize,m_lfit,w_"+this.coverWidth+")");
            $("#video-title").text(data.title);
            $(".time").text(data.duration);
        },

        share: function() {
            var tk = utils.getcookies('token');
            var shareId = tk ? tk.split("_")[1] : '';
            wechatshare.share({
                title: '分享红包',
                desc: '玩转创意视频 , 分享红包之道, 草莓视界等你来撩！',
                link: location.protocol + '//' + location.hostname + '/multipage/share.html?videoId=' + this.search.videoId + '&playId=' + this.search.playId + "&shareId=" + shareId,
                imgUrl: location.protocol + '//' + location.hostname + '/images/strawberry_logo.png'
            })
        },

        addEvent: function() {
            $(".share-video").on('click', function() {
                var link = './video.html?videoId=' + this.search.videoId;
                if(this.search.shareId){
                    link = link + "&shareId=" + this.search.shareId; 
                }
                location = link;
            }.bind(this))
        }
    }
    share.init();
})()
