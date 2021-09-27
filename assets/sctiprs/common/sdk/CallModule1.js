
//登录系统回调接口
window.loginCallback = function (data) {
    console.log("登录回调:" + data)
    // ret":0,"openid":"89D78D1C3B890199821B91C223182057","access_token":"FBEFAE1F56A199EBB13E638E74D25D57","pay_token":"B52443D58A0DE62B6E2A059A164299AC","expires_in":7776000,"pf":"desktop_m_qq-10000144-android-2002-","pfkey":"31d18413f7306978f30a23756f0cc7ca","msg":"","login_cost":87,"query_authority_cost":0,"authority_cost":0,"expires_time":1640494638472,"AppId":"1105791492","Secret":"FbT8AXU17ggHMy8E"}
    if (CallModule.single == 'QQ') {

    }
}

//扫描回调
window.scamCallback = function (data) {
    console.log("扫描回调:" + data)
}

window.createQRcodeCallback = function (data) {
    console.log("二维码回调:" + data)
}

window.uploadImgCallbcak = function (texture) {

}

window.statusBarOrientationChanged = function () {
    var frameSize = cc.view.getFrameSize()

    if (direct == 1)//竖屏
    {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
        if (frameSize.width > frameSize.height) {
            cc.view.setFrameSize(frameSize.height, frameSize.width);
        }
    }
    else {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        if (frameSize.height > frameSize.width) {
            cc.view.setFrameSize(frameSize.height, frameSize.width);
        }
    }
}


export default class CallModule {
    static single = null;
}