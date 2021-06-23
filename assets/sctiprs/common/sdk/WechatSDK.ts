import HttpMgr from "../net/HttpMgr";
import GameData from '../../GameData';
import { pb } from "../../../protos/proto";

export default class WechatSDK {
    static _instance = null;

    videoAd = null;

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

                                image: "res/raw-assets/cf/cf584a31-da7b-4c32-b1b6-a19fb1d7d605.6ee22.png",
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

        //设置屏幕常亮
        wx.setKeepScreenOn({
            keepScreenOn: true
        })

        this.ADInit();
    }

    ADInit() {
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-2b80486c280a9b33'
        })
    }

    showVideoAd(callback?) {
        if (this.videoAd) {
            this.videoAd.onLoad(() => {
                console.log('激励视频 广告加载成功')
            })

            this.videoAd.show().then(() => {
                console.log('激励视频 广告显示');
            })

            this.videoAd.onError(err => {
                console.log(err)
            })

            this.videoAd.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callback(1);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    callback(0);
                }
            })
        }
    }

    //获取用户信息
    getUserInfo1(code, btn, call) {
        let self = this;
        wx.getUserInfo({
            success(res) {
                const webUserInfo = res.userInfo;
                console.log(webUserInfo);
                GameData.userName = webUserInfo.nickName;
                GameData.gender = webUserInfo.gender;
                GameData.headimgurl = webUserInfo.avatarUrl;

                btn && (btn.destroy())
                self.onLoginCodeHttpRequest(code, call);
            }
        })
    }

    //登入CODE请求
    onLoginCodeHttpRequest(code, call) {

        let loginInfo = {
            account: code,
            type: pb.LoginType.WeChat_MiniProg,
            from: pb.AppFrom.WeChatMinProgram,
            pwd: ''
        };

        console.log('loginInfo' + loginInfo);

        // let data = PB.onCmdLoginConvertToBuff(loginInfo);

        // let Uint8ArrayToString = function (fileData) {
        //     var dataString = "";
        //     for (var i = 0; i < fileData.length; i++) {
        //         dataString += String.fromCharCode(fileData[i]);
        //     }
        //     return dataString
        // }
        // data = Uint8ArrayToString(data);
        // let buff1 = PB.onCmdLoginConvertToBuff(loginInfo);

        // buff1 = buff1.buffer.slice(buff1.byteOffset, buff1.byteLength + buff1.byteOffset);

        // wx.request({
        //     url: 'http://192.168.100.198:80/l', //仅为示例，并非真实的接口地址 
        //     data: buff1,
        //     method: 'POST',
        //     responseType: 'arraybuffer',
        //     header: {
        //         'content-type': "application/x-protobuf" // 默认值
        //     },
        //     success(res) {
        //         console.log(res.data)
        //         let decoded = PB.onCmdLoginConvertToData(res);
        //         if (decoded) {
        //             call && (call(decoded));
        //         }
        //     }
        // })

        HttpMgr.getInstance().loginWeb(code, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
        })
    }

    chooseImage(call) {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const file = res.tempFilePaths[0]
                // console.log('tempFilePaths:' + file);
                // console.log(res.tempFiles.size)
                // if (res.tempFiles.size >= 500 * 1024) {
                //     console.log('图片太大了');

                // }
                // wx.getImageInfo({
                //     src: res.tempFilePaths[0],
                //     success(res) {
                //         console.log(res.width)
                //         console.log(res.height)
                //         call && (call(res))
                //     }
                // })

                wx.getLocalImgData({
                    localId: res.localIds[0], // 图片的localID
                    success: function (res) {
                        const localData = res.localData;
                        let imageBase64 = '';
                        if (localData.indexOf('data:image') == 0) {
                            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                            imageBase64 = localData;

                        } else {
                            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');

                        }
                        //  let image_base64 = imageBase64;
                        call(imageBase64);
                        //   $('#img').attr('src', imageBase64);

                    }
                });

            }
        })
    }


}
