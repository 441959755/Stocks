
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
//import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    el = null;



    initShow(index) {

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


        if (GameData.imgs[this.el.icon + '']) {
            head.spriteFrame = GameData.imgs[this.el.icon + ''];
        }
        else {
            ComUtils.onLoadHead(this.el.icon, (res) => {
                if (res) {
                    let texture = new cc.SpriteFrame(res);
                    head.spriteFrame = texture;
                }

            })
        }

        if (this.el.nickname) {
            username.string = this.el.nickname;
        } else {
            username.string = this.el.uid;
        }

        if (this.el.level) {
            userlv.string = 'LV: ' + this.el.level;
        } else {
            userlv.string = '';
        }

        man.children[0].active = !this.el.gender;

        countLabel.string = this.el.cgsProgress;
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'ckzjBtn') {
            GlobalEvent.emit(EventCfg.OPENOTHERPLAYERHISLAYER, this.el);
            // PopupManager.loadOtherPlayerHisInfo('otherPlayerHisInfo', this.el);
        }
    }
}
