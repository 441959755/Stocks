import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import LoadImg from "../../sctiprs/Utils/LoadImg";
import PopupManager from "../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    userLevel: cc.Label = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Node)
    sex: cc.Node = null;

    @property(cc.Label)
    title: cc.Label = null;

    playerInfo = null;

    uid = null;

    @property(cc.SpriteFrame)
    defaultImg: cc.SpriteFrame = null;

    onLoad() {
        GlobalEvent.on('REPPLAYERINFO', (info) => {
            if (info.uid == this.uid) {
                this.init(info);
            }
        }, this);
    }


    init(info) {

        this.node.active = true;

        this.playerInfo = info;

        this.userLevel.string = info.properties[pb.GamePropertyId.Level];

        this.userName.string = info.nick;

        this.title.string = ComUtils.getChenghaoByFame(info.properties[pb.GamePropertyId.Fame]);

        if (info.gender) {
            this.sex.children[0].active = false;
        } else {
            this.sex.children[0].active = true;
        }
        this.loadHeadImg(info);
    }


    onShow(code) {
        this.uid = code;
        this.userLevel.string = '';
        this.userName.string = '';
        this.head.spriteFrame = this.defaultImg;

        if (GameData.playersInfo[code + '']) {
            this.init(GameData.playersInfo[code + '']);
        }

    }

    //加载图片
    loadHeadImg(obj) {
        this.head.spriteFrame = this.defaultImg;
        if (GameData.imgs[obj.uid + '']) {
            this.head.spriteFrame = GameData.imgs[obj.uid + '']
        }
        else {
            LoadImg.onLoadHeadByUid(obj.uid, (texture) => {
                if (texture) {
                    GameData.imgs[obj.uid + ''] = new cc.SpriteFrame(texture);
                    this.head.spriteFrame = GameData.imgs[obj.uid + '']
                }
                else {
                    GameData.imgs[obj.uid + ''] = this.defaultImg;
                }
            })
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'item1' || name == 'item2') {
            this.playerInfo.icon = GameData.imgs[this.playerInfo.uid + ''];
            //打开信息面板
            PopupManager.openOtherPlayerInfoLayer(this.playerInfo);

        }

        else if (name == 'phb_bt_tiaozhanta') {

            this.playerInfo.icon = GameData.imgs[this.playerInfo.uid + ''];
            //打开历史记录
            GlobalEvent.emit(EventCfg.OPENOTHERPLAYERHISLAYER, this.playerInfo);
        }

    }
}
