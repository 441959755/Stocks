import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
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
                console.log('玩家资料应答' + JSON.stringify(info));

                GameData.playersInfo[info.uid + ''] = info;

                this.init(info);
            }

        }, this);
    }

    onDisable() {
        GlobalEvent.off('REPPLAYERINFO');
    }

    init(info) {
        console.log('node' + this.node);
        this.node.active = true;
        this.playerInfo = info;
        //  this.headImg = head;
        this.userLevel.string = info.properties[pb.GamePropertyId.Level];
        this.userName.string = info.nick;
        // this.head.spriteFrame = head;
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
        this.loadPlayerInfo(code);
    }


    loadPlayerInfo(code) {
        if (GameData.playersInfo[code + '']) {
            this.init(GameData.playersInfo[code + '']);
            return;
        }

        let info = {
            uid: code,
        }

        let playerInfo = pb.PlayerInfo;
        let buff = playerInfo.encode(info).finish();
        socket.send(pb.MessageId.Req_Hall_QueryPlayer, buff);
    }

    //加载图片
    loadHeadImg(obj) {
        this.head.spriteFrame = this.defaultImg;
        if (GameData.imgs[obj.icon + '']) {
            this.head.spriteFrame = GameData.imgs[obj.icon + '']
        }
        else {
            ComUtils.onLoadHead(obj.icon, (texture) => {
                if (texture) {
                    GameData.imgs[obj.icon + ''] = new cc.SpriteFrame(texture);
                    this.head.spriteFrame = GameData.imgs[obj.icon + '']
                }
                else {
                    GameData.imgs[obj.icon + ''] = this.defaultImg;
                    this.head.spriteFrame = this.defaultImg;
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
