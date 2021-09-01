import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property([cc.Node])
    scollNode: cc.Node[] = [];

    @property(cc.Node)
    tipstext: cc.Node = null;

    @property(cc.Node)
    item1: cc.Node = null;

    @property(cc.Node)
    item2: cc.Node = null;

    concernList = []  //关注列表

    fansList = []  //粉丝列表

    playerInfo: any = {};

    onLoad() { }

    onEnable() {
        this.queryPlayerInfo(this.concernList);
        this.queryPlayerInfo(this.fansList);

        this.toggles[0].isChecked = true;
        this.toggles[1].isChecked = false;
        this.scollNode[0].active = true;
        this.scollNode[1].active = false;

        this.concernList = GameData.gameData.favorList || [];

        if (this.concernList.length <= 0) {
            this.tipstext.active = true;
        }

        this.createItem(this.concernList, this.scollNode[0], this.item1);

        this.createItem(this.fansList, this.scollNode[1], this.item2);
    }

    queryPlayerInfo(arr) {
        if (arr.length <= 0) { return }
        arr.forEach(el => {
            let info = {
                uid: el,
            }

            let playerInfo = pb.PlayerInfo;

            let buff = playerInfo.encode(info).finish();
            socket.send(pb.MessageId.Req_Hall_QueryPlayer, buff, res => {
                this.playerInfo[res.uid + ''] = res;
            })
        })
    }

    createItem(arr, scoll, item) {
        if (arr.length <= 0) { return }
        let UIScrollControl = scoll.getComponent('UIScrollControl');
        UIScrollControl.clear();
        // let scollrect = scoll.getComponent(cc.ScrollView);

        UIScrollControl.initControl(item, arr.length, item.getContentSize(), 0, (node, index) => {
            // let handle = node.getComponent('ChaoGuRankingItem');
            // handle.onShow(items[index], index + 1, this._curData);
        })
    }

    onToggleClick(event, curdata) {
        let name = event._node.name;
        if (name == 'toggle1') {
            this.scollNode[0].active = true;
            this.scollNode[1].active = false;
            if (this.concernList.length <= 0) {
                this.tipstext.active = true;
            } else {
                this.tipstext.active = false;
            }
        }

        else if (name == 'toggle2') {
            this.scollNode[0].active = false;
            this.scollNode[1].active = true;
            this.tipstext.active = false;
            if (this.fansList.length <= 0) {
                this.tipstext.active = true;
            }
        }
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'leftBtn') {
            this.node.active = false;
        }
    }



}
