
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    el = null;

    @property(cc.SpriteFrame)
    defaultImg: cc.SpriteFrame = null;

    initShow(index, el) {
        this.el = el;

        let RankNode = this.node.getChildByName('node');
        let nodes = RankNode.children;

        nodes.forEach(el => {
            el.active = false;
        })

        if (index <= 2) {
            nodes[index].active = true;
        }
        else {
            nodes[3].active = true;
            nodes[3].getComponent(cc.Label).string = (index + 1);
        }

        let userNode = this.node.getChildByName('userinfobg');

        let head = userNode.getChildByName('main_txk').getComponent(cc.Sprite);

        let username = userNode.getChildByName('username').getComponent(cc.Label);

        let userlv = userNode.getChildByName('userLv').getComponent(cc.Label);

        let man = userNode.getChildByName('main_sex__man');

        let countLabel = this.node.getChildByName('label').getComponent(cc.Label);

        head.spriteFrame = this.defaultImg;

        if (GameData.imgs[el.icon + '']) {

            head.spriteFrame = GameData.imgs[el.icon + ''];
        }
        else {
            ComUtils.onLoadHead(el.icon, (res) => {
                if (res) {
                    let texture = new cc.SpriteFrame(res);

                    GameData.imgs[el.icon + ''] = texture;

                    head.spriteFrame = texture;
                }
                else {
                    GameData.imgs[el.icon + ''] = this.defaultImg;
                }
            })
        }

        if (el.nickname) {
            username.string = el.nickname;
        } else {
            username.string = el.uid;
        }

        if (el.level) {
            userlv.string = 'LV: ' + el.level;
        } else {
            userlv.string = '';
        }

        man.children[0].active = !el.gender;

        countLabel.string = el.cgsProgress;
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'ckzjBtn') {
            this.el.icon = GameData.imgs[this.el.icon + ''];
            GlobalEvent.emit(EventCfg.OPENOTHERPLAYERHISLAYER, this.el);
            // PopupManager.loadOtherPlayerHisInfo('otherPlayerHisInfo', this.el);
        }
        else if (name == 'userinfobg') {
            //打开信息面板
            this.getPlayerInfo((info) => {
                info.icon = GameData.imgs[this.el.icon + ''];
                PopupManager.openOtherPlayerInfoLayer(info);
            })
        }
    }

    getPlayerInfo(call) {
        let info = {
            uid: this.el.uid,
        }

        let playerInfo = pb.PlayerInfo;
        let buff = playerInfo.encode(info).finish();
        socket.send(pb.MessageId.Req_Hall_QueryPlayer, buff, res => {
            if (res.uid) {
                call && (call(res));
            }
        })
    }
}
