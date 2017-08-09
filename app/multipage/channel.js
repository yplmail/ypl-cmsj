(function() {
    var channel = {
        init: function() {
            this.pageIndex = 1;
            this.pageSize = 10;
            this.tk = utils.getcookies('token');
            this.serach = utils.getsearch();
            this.body = document.querySelector('body');
            $('body').css('min-height',$(window).height());
            this.fetchChannelInfo();
            this.fetchChannelVideo();
            this.initEvent();
        },

        fetchChannelInfo: function() {
            var id = this.serach.channelId;
            utils.post({
                url: '/uservideo/channelInfo',
                data: {
                    channelUserId: id ? id : this.tk.split("_")[1] 
                },
                success: function(response) {
                    $("#channelAvatar").attr('src', utils.joinImageUrl(response.avatar));
                    $("#nickName").text(response.nickName || '草莓看客');
                    if(response.introduction.length > 41){
                        $("#introduction").text(response.introduction.substr(0, 41) + '...');                        
                    }else{
                        $("#introduction").text(response.introduction);     
                    }
                    $("#fans").text(response.fans);
                    $("#praise").text(response.praise);
                    $("#attention").text(response.attention);
                }.bind(this)
            })
        },

        fetchChannelVideo() {
            utils.post({
                url: '/video/ownerVideoList',
                data: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    ownerId: this.serach.channelId,
                    userType: this.serach.channelId ? 0 : 1
                },
                success: function(response) {
                    this.pageCount = response.pageCount;
                    this.isLoading = false;
                    if (response.totalCount > 0) {
                        var rows = response.datas.map(function(item) {
                            return this.row(item)
                        }.bind(this))
                        $(".scroll-outer").append(rows.join(''));
                        if (this.pageIndex < this.pageCount) {
                            $(".scroll-loading").show();
                        } else {
                            $(".scroll-loading").hide();
                        }
                    } else {
                        $('.scroll-outer').append('<div class="channel-empty">' +
                            '<p class="tips_1">您还没有作品哦</p>' +
                            '<p class="tips_2">上传视频作品，便可获得海量曝光机会。</p>' +
                            '<p class="button-outer"><a id="uploadbtn">上传作品</a></p>' +
                            '</div>');
                    }

                }.bind(this)
            })
        },

        row: function(item) {
            return '<li>' +
                '<a class="row-content" href="./detail.html?videoId=' + item.videoId + '">' +
                '<img src="' + utils.joinImageUrl(item.coverUrl) + '">' +
                '</a>' +
                '<div class="row-footer" data-flex="dir:top box:mean">' +
                '<h1 data-flex="cross:center"><span class="ellipsis">' + item.title + '</span></h1>' +
                '<p class="detail"><span>'+item.pariseCount+'人点赞</span><i>|</i><span>'+item.talkCount+'条评论</span>'+
                '<i>|</i><span>'+utils.getDateDiff(item.createDt)+'</span></p>'+
                '</div>' +
                '</li>';
        },

        initEvent() {
            window.addEventListener('scroll', this.scrollEvent.bind(this), false);

            $(".edit-channel").on('click', function() {
                var index = layer.open({
                    content: '通过APP才能操作哦！',
                    style: 'background-color:#fff; color:#323232;width:70%', //自定风格
                    btn: ['确定', '取消'],
                    yes: function(index) {
                        layer.close(index)
                        location.href = "./download.html";
                    }.bind(this)
                });
            })

            $('.scroll-outer').on('click', '#uploadbtn', function() {
                var index = layer.open({
                    content: '上传作品请下载APP！',
                    style: 'background-color:#fff; color:#323232;width:70%', //自定风格
                    btn: ['确定', '取消'],
                    yes: function(index) {
                        layer.close(index)
                        location.href = "./download.html";
                    }.bind(this)
                });
            })
        },

        scrollEvent: function(event) {
            event.preventDefault();
            var scrollpos = $(window).height() + this.body.scrollTop;
            var maxHeight = this.body.scrollHeight;
            if(scrollpos >= maxHeight){
                if(this.isLoading) return false;
                if(this.pageIndex < this.pageCount){
                    ++this.pageIndex;
                    this.isLoading = true;
                    this.fetchChannelVideo();                  
                }
            }
        },
    }

    channel.init();
})();
