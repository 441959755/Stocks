import HttpMgr from "../net/HttpMgr";
import GameData from '../../GameData';
import { pb } from "../../../protos/proto";
import LoadImg from "../../Utils/LoadImg";
import GameCfgText from "../../GameText";
import LLWConfig from "../config/LLWConfig";
import HttpUtils from "../net/HttpUtils";

export default class WechatSDK {

    static _instance = null;

    videoAd = null;

    loginPlat = pb.LoginType.WeChat_MiniProg;

    callback = null;


    static getInstance() {
        if (!this._instance) {
            this._instance = new WechatSDK();
        }
        return this._instance;
    }

    //用户登入
    login(call) {
        let self = this;
        wx.login({
            success(res) {
                let code = res.code;
                self.getQUery();
                wx.getSetting({

                    success(res) {
                        if (res.authSetting['scope.userInfo']) {

                            self.getUserInfo1(code, null, call);
                        } else {
                            console.log("没有授权下一步是wx.createUserInfoButton")

                            let systemInfo = wx.getSystemInfoSync()

                            let button = wx.createUserInfoButton({

                                type: "image",
                                image: "res/raw-assets/7f/7f8bd040-1a9b-45af-9dc8-0f40da27b5e6.92cfc.png",
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


    //获取用户信息
    getUserInfo1(code, btn, call) {

        let self = this;
        wx.getUserInfo({
            success(res) {

                const webUserInfo = res.userInfo;
                console.log('用户信息' + JSON.stringify(webUserInfo));
                GameData.userName = webUserInfo.nickName;
                GameData.gender = webUserInfo.gender;
                GameData.headimgurl = webUserInfo.avatarUrl;

                // HttpUtils.toDataURL(GameData.headimgurl, (tex) => {
                //     console.log('图片' + (tex));
                //     GameData.headimgurl = tex;
                //     // GameData.headImg = new cc.SpriteFrame(tex);
                //     // btn && (btn.destroy())
                //     // self.onLoginCodeHttpRequest(code, call);
                // })

                LoadImg.downloadRemoteImageAndSave(GameData.headimgurl, (tex, sp) => {
                    //   console.log('downloadRemoteImageAndSave' + sp + ' ' + tex);
                    GameData.headimgurl = tex;
                    GameData.headImg = sp;
                    btn && (btn.destroy())
                    self.onLoginCodeHttpRequest(code, call);
                }, true)

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

        //this.onShareAppMessage();
    }

    ADInit() {
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-2b80486c280a9b33'
        })

        this.videoAd.onLoad(() => {
            console.log('激励视频 广告加载成功')
        })

        this.videoAd.onError(err => {
            console.log(err)
        })

        this.videoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                this.callback(1);
            }
            else {
                // 播放中途退出，不下发游戏奖励
                this.callback(0);
            }
        })
    }

    showVideoAd(callback?) {
        console.log(GameCfgText.appConf.wechat_minprogram + '   ' + JSON.stringify(GameCfgText.appConf.wechat_minprogram));
        if (!GameCfgText.appConf.wechat_minprogram.ad_switch) {
            this.callback = callback;
            this.callback(1);
        }
        else {
            this.callback = callback;
            if (this.videoAd) {
                this.videoAd.show().then(() => {
                    console.log('激励视频 广告显示');
                })
            }
        }
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

    //客服消息
    openCustomerServiceConversation() {
        wx.openCustomerServiceConversation({
            // sessionFrom: '',
            // showMessageCard: true,
            // sendMessageTitle: '',
            // sendMessagePath: '',
            // sendMessageImg: '',
        })
    }

    onCopyText(data, call) {
        wx.setClipboardData({
            data: data,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        console.log(res.data) // data
                        call(1);
                    }
                })
            }
        })
    }

    //监听用户点击右上角菜单的「转发」按钮时触发的事件
    onShareAppMessage() {

        // 绑定分享参数
        wx.onShareTimeline(() => {
            return {
                title: '【炒股达人】寓教于乐的炒股软件',
                imageUrl: LLWConfig.LoginURL + '/wechatgame/share.png',
                query: 'a=1&b=2'
            }
        })

        // 显示当前页面的转发按钮
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline'],
            success: (res) => {
                console.log('开启被动转发成功！');
            },
            fail: (res) => {
                console.log(res);
                console.log('开启被动转发失败！');
            }
        });

        wx.onShareAppMessage(function () {
            return {
                title: '【炒股达人】寓教于乐的炒股软件',
                imageUrl: LLWConfig.LoginURL + '/wechatgame/share.png',
            }
        })
    }


    shareAppMessage(roomId?) {
        let url, title;
        if (roomId) {
            url = LLWConfig.LoginURL + '/wechatgame/invite.png';
            title = '真实历史数据，等你来战';

        }
        else {
            url = LLWConfig.LoginURL + '/wechatgame/share.png';
            title = '【炒股达人】寓教于乐的炒股软件';
        }
        wx.shareAppMessage({
            title: title,
            imageUrl: url,
            query: 'key1=' + roomId + '&key2=val2',

            success: (res) => {
                // 显示当前页面的转发按钮
                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline'],
                    success: (res) => {
                        console.log('开启被动转发成功！');
                    },
                    fail: (res) => {
                        console.log(res);
                        console.log('开启被动转发失败！');
                    }
                });
            }
        })
    }

    getQUery() {

        let obj = wx.getLaunchOptionsSync();
        console.log('获取query' + JSON.stringify(obj));
        for (let s in obj.query) {
            if (s == 'key1') {
                GameData.query = obj.query[s];
            }
        }
    }

    onShow(cb) {
        wx.onShow((res) => {
            console.log('获取query' + JSON.stringify(res));
            for (let s in res.query) {
                if (s == 'key1') {
                    GameData.query = res.query[s];
                    cb && cb();
                }
            }
        })

    }

    // authPrivateMessage(id) {

    //     wx.updateShareMenu({
    //         withShareTicket: true,
    //         isPrivateMessage: true,
    //         activityId: id,
    //     })

    //     wx.authPrivateMessage({
    //         shareTicket: 'xxxxxx',
    //         success(res) {
    //             console.log('authPrivateMessage success', res)
    //             // res
    //             // {
    //             //   errMsg: 'authPrivateMessage:ok'
    //             //   valid: true
    //             //   iv: 'xxxx',
    //             //   encryptedData: 'xxxxxx'
    //             // }
    //         },
    //         fail(res) {
    //             console.log('authPrivateMessage fail', res)
    //         }
    //     })
    // }


    // screenshotShare() {
    //     var canvas = cc.game.canvas;
    //     var width = cc.winSize.width;
    //     var height = cc.winSize.height;
    //     canvas.toTempFilePath({
    //         x: 0,
    //         y: 0,
    //         width: width,
    //         height: height,
    //         destWidth: width,
    //         destHeight: height,
    //         success(res) {
    //             //.可以保存该截屏图片
    //             console.log(res)
    //             wx.shareAppMessage({
    //                 imageUrl: res.tempFilePath
    //             })
    //         }
    //     })
    // }

}
