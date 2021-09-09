import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import LoadUtils from "../../sctiprs/Utils/LoadUtils";


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

    friendFind: cc.Node = null;

    onLoad() {
        GlobalEvent.on('UPDATEFRIENDLIST', this.onShow.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off('UPDATEFRIENDLIST');
    }

    onEnable() {
        this.onShow();
    }

    onShow() {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        this.concernList = GameData.gameData.favorList || [];

        this.toggles[0].isChecked = true;
        this.toggles[1].isChecked = false;
        this.scollNode[0].active = true;
        this.scollNode[1].active = false;

        if (this.concernList.length <= 0) {
            this.tipstext.active = true;
        }
        else {
            this.tipstext.active = false;
        }

        this.createItem(this.concernList, this.scollNode[0], this.item1);

        GlobalEvent.emit(EventCfg.LOADINGHIDE);

    }


    createItem(arr, scoll, item) {
        if (arr.length <= 0) { return }
        let UIScrollControl = scoll.getComponent('UIScrollControl');

        UIScrollControl.clear();

        UIScrollControl.initControl(item, arr.length, item.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent('FriendItem');
            handle.onShow(arr[index]);
        })
    }

    onToggleClick(event, curdata) {
        let name = event.node.name;
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

        else if (name == 'hy_topbtn_czhy') {
            //查找
            this.openNode(this.friendFind, 'Prefabs/friendFind', 10, (node) => { this.friendFind = node });
        }

        else if (name == 'hy_topbtn_yqhy') {
            GlobalEvent.emit('OPENFRIENDINVITE');
        }
    }

    openNode(node, url, zIndex, call?) {
        if (!node) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes(url, pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                node = cc.instantiate(pre);
                this.node.addChild(node, zIndex);
                node.active = true;
                call(node);
            })
        }
        else {
            node.active = true;
            call(node);
        }
    }


}
