const API = {
    'login': 'user/login',
    'register': 'user/register',
    'sendSmsCode': 'user/sendSmsCode',
    'resetLoginPwd': 'user/resetLoginPwd',
    'modifyLoginPwd':'user/modifyLoginPwd',
    'wechatShare' : 'user/wechatShare',
    'wechatLogin':'user/wechatLogin',
    'logout':'user/logout',
    'refreshToken' : 'user/refreshToken',
    'advList': 'publish/list',
    'advDetail': 'publish/detail',
    'advStartPlay': 'publish/startPlay',
    'advEndPlay': 'publish/endPlay',
    'shareSuccess':'publish/shareSuccess',
    'newestUsedRewards' :'reward/newestUsedRewards',
    'receive' :'reward/receive',
    'score' :'comment/score',
    'correlationVideo' :'video/relatedVideos',
    'hotVideos' : 'video/hotVideos',
    'home':'mine/home',
    'rewardList':'reward/list',
    'bindMobile':'user/bindMobile',
    'bindWechat':'user/bindWechat',
    'withdraw':'account/withdraw/wechat'
}

export default API
