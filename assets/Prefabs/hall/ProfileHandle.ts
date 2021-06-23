
import LLWSDK from "../../sctiprs/common/sdk/LLWSDK";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    userID: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    gender: cc.Label = null;

    @property(cc.Label)
    diqu: cc.Label = null;

    @property(cc.Label)
    chenghao: cc.Label = null;

    @property(cc.Label)
    phone: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    brick: cc.Label = null;

    onLoad() {
        GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
            this.gold.string = GameData.properties[0];
        }, this);

        GlobalEvent.on(EventCfg.BIRCKCHANGE, () => {
            this.brick.string = GameData.properties[1];
        }, this);

        GlobalEvent.on(EventCfg.HEADIMGCHANGE, () => {
            this.headImg.spriteFrame = GameData.headImg;
        }, this);

        GlobalEvent.on(EventCfg.NAMECHANGE, () => {
            this.userName.string = GameData.userName;
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.BIRCKCHANGE);
        GlobalEvent.off(EventCfg.HEADIMGCHANGE);
        GlobalEvent.off(EventCfg.NAMECHANGE);
    }

    start() {
        this.gold.string = GameData.properties[0];
        this.brick.string = GameData.properties[1];
        this.headImg.spriteFrame = GameData.headImg;
        this.userID.string = GameData.userID;
        this.userName.string = GameData.userName;
        this.gender.string = GameData.gender;
        this.diqu.string = GameData.location;

    }

    onEnable() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btnicon') {
            let index = parseInt(data);
            if (index == 0) {
                this.onChangeIcon();
            }

            else if (index == 1) {
                GlobalEvent.emit('openChangeUserNameLayer');
            }
            else if (index == 2) {
                GlobalEvent.emit('openChangeGenderLayer');
            }
            else if (index == 3) {
                GlobalEvent.emit('openChangeLocationLayer');
            }
        }
    }

    //更改头像
    onChangeIcon() {
        LLWSDK.getSDK().chooseImage((img) => {
            if (!img) { return };
            let data = {
                uid: GameData.userID,
                icon: img,
            }
            console.log('img' + img);
            socket.send(pb.MessageId.Req_Hall_EditIcon, PB.onCmdEditInfoConvertToBuff(data), (info) => {
                console.log('onCmdEditInfoConvertToBuff:' + JSON.stringify(info));
                if (!info.code) {

                    GameData.headImg = new cc.SpriteFrame(img);
                    if (GameData.headImg) {
                        this.headImg.spriteFrame = GameData.headImg;
                    }
                } else {
                    console.log('图片有吴!:' + info.code + info.err);
                }

            })

        })

    }
}
