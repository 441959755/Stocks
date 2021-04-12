import HttpMgr from "../net/HttpMgr";
import HttpUtils from "../net/HttpUtils";

export default class WechatSDK {
    static _instance = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new WechatSDK();
        }
        return this._instance;
    }

    //用户登入
    login(call) {
        let self = this;
        if (!wx) { return }
        wx.login({
            success(res) {
                let code = res.code;
                wx.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            self.getUserInfo1(code, null, call);
                        } else {
                            console.log("没有授权下一步是wx.createUserInfoButton")
                            let systemInfo = wx.getSystemInfoSync()
                            let button = wx.createUserInfoButton({

                                type: "image",

                                image: "res/raw-assets/cf/cf584a31-da7b-4c32-b1b6-a19fb1d7d605.png",
                                style: {
                                    left: systemInfo.screenWidth * 0.5 - 88,
                                    top: systemInfo.screenHeight * 0.7,
                                    width: 146,
                                    height: 56,
                                    lineHeight: 40,
                                    color: '#000000',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    margin: 0,
                                    padding: 0
                                },
                                text: "开始游戏"
                            })
                            button.onTap((res) => {
                                self.getUserInfo1(code, button, call)
                            })
                        }
                    }
                })
            }
        })
    }

    //获取用户信息
    getUserInfo1(code, btn, call) {
        let self = this;
        wx.getUserInfo({
            success(res) {
                const webUserInfo = res.userInfo;
                console.log(webUserInfo);
                cc.ext.gameData.userName = webUserInfo.nickName;
                cc.ext.gameData.sex = webUserInfo.gender;
                cc.ext.gameData.headimgurl = webUserInfo.avatarUrl;

                btn && (btn.destroy())
                self.onLoginCodeHttpRequest(code, call);
            }
        })
    }

    //登入CODE请求
    onLoginCodeHttpRequest(code, call) {

        let loginInfo = {
            account: code,
            type: 2,
            from: 8888,
            pwd: ''
        };

        console.log('loginInfo' + loginInfo);

        let data = PB.onCmdLoginConvertToBuff(loginInfo);

        let Uint8ArrayToString = function (fileData) {
            var dataString = "";
            for (var i = 0; i < fileData.length; i++) {
                dataString += String.fromCharCode(fileData[i]);
            }
            return dataString
        }

        data = Uint8ArrayToString(data);
        console.log(data);

        HttpMgr.getInstance().loginWeb(code, data, call, () => {
            console.log('onLoginCodeHttpRequest err');
        })
    }


}
