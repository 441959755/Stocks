import GameData from "../../sctiprs/GameData";
import GameCfgText from '../../sctiprs/GameText';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    tckNode: cc.Node = null;

    @property([cc.Node])
    layers: cc.Node[] = [];

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    userIDLa: cc.Label = null;

    @property(cc.Label)
    nameLa: cc.Label = null;

    @property(cc.Label)
    lvLa: cc.Label = null;

    @property(cc.Label)
    expLa: cc.Label = null;


    onEnable() {
        if (GameData.headImg) {
            this.headImg.spriteFrame = GameData.headImg;
        }

        GameData.userID && (this.userIDLa.string = 'ID:    ' + GameData.userID)

        GameData.userName && (this.nameLa.string = '昵称:    ' + GameData.userName)

        GameData.properties[2] && (this.lvLa.string = 'lv: ' + GameData.properties[2])
        let max_exp
        if (GameCfgText.levelInfoCfg) {
            max_exp = GameCfgText.levelInfoCfg[GameData.properties[2]];
        }

        GameData.properties[1] && (this.expLa.string = GameData.properties[1] + '/' + max_exp)

    }

    onToggleClick(event, data) {
        let ind = parseInt(data);
        this.layers.forEach((el, index) => {
            if (index == ind) {
                el.active = true;
            } else {
                el.active = false;
            }
        })

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btnSubmit') {
            let v = this.editBox.string;
            if (this.testTextLength(v)) {
                //发送信息
                let data = {
                    uid: GameData.userID,
                    nick: v,
                }
                socket.send(3003, PB.onCmdEditNickConvertToBuff(data), (info) => {
                    console.log('onCmdEditNickConvertToBuff:' + JSON.stringify(info));
                    if (!info.code) {
                        this.tckNode.active = false;
                        GameData.userName = v;

                        GameData.userName && (this.nameLa.string = '昵称:    ' + GameData.userName)
                    } else {
                        console.log('名字错误!:' + info.code + info.err);
                    }

                })

            }
        } else if (name == 'tckCloseBtn') {
            this.tckNode.active = false;
        } else if (name == 'nameBG') {
            this.tckNode.active = true;
        } else if (name == 'playerSprite') {
            llwSDK.chooseImage((img) => {
                this.load_picture_async(img);
            });
        } else if (name == 'closeBtn') {
            this.node.active = false;
        }

    }

    load_picture_async(imgurl, temp?) {
        // return new Promise((resolve, reject) => {
        //     var self = this;
        //     cc.loader.load(imgurl, function (err, texture) {
        let data = {
            uid: GameData.userID,
            icon: imgurl,
        }
        console.log('imgurl:' + imgurl);
        socket.send(3001, PB.onCmdUploadIconConvertToBuff(data), (info) => {
            console.log('onCmdUploadIconConvertToBuff:' + JSON.stringify(info));
            if (!info.code) {
                //   this.tckNode.active = false;
                // GameData.userName = v;
                // GameData.userName && (this.nameLa.string = '昵称:    ' + GameData.userName)
                GameData.headImg = new cc.SpriteFrame(imgurl);
                if (GameData.headImg) {
                    this.headImg.spriteFrame = GameData.headImg;
                }
            } else {
                console.log('图片有吴!:' + info.code + info.err);
            }

        })

        //     });
        // })
    }

    testTextLength(v) {
        let flag = 1;

        //[\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
        var rx = /[a-z\d]/i, rxcn = /[\u4e00-\u9fa5]/, num = 0, chr;

        for (var i = 0, j = v.length; i < j; i++) {

            chr = v.charAt(i);

            if (rx.test(chr)) num += 1;

            else if (rxcn.test(chr)) num += 2;

            else {
                flag = 3;
                break;
            }
        }
        if (flag != 3) {
            if (num > 12) {
                console.log(" * 长度最多为6个汉字或12个字母数字！")
                return false;
            }
            else if (num < 1) {
                console.log(" * 不能为空！")
                return false;
            }
            return true;
        }
        else {
            console.log(" * 不能包含特殊符号！")
            return false;
        }
    }
}
