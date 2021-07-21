// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import { pb } from "../../protos/proto";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    HisData = [];

    HisCount = 0;

    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;

    onLoad() {
        this.scrollview.node.on('scroll-to-bottom', () => {
            console.log('scroll-to-bottom');
            //已经取完
            if (this.HisData.length < this.HisCount) {
                console.log('已经取完')
            }

            else {
                let ts;
                if (this.HisData.length > 0) {
                    ts = this.HisData[this.HisData.length - 1].ts;
                }
                let data = {
                    uid: GameData.userID,
                    to: ts,
                    pageSize: 20,
                }
                this.onQueryGameResult(data);
            }

        }, this);
    }

    onToggleClick(event) {

        this.content.children.forEach(el => {
            let handle = el.getComponent('HisItem');
            handle.onHisItemRate(event.isChecked);
        })
    }

    onEnable() {
        if (this.HisData.length > 0) {

        } else {
            this.tipsNode.active = false;
            let ts = new Date().getTime() / 1000;
            let data = {
                uid: GameData.userID,
                to: ts,
                pageSize: 30,
            }
            this.onQueryGameResult(data);
        }
    }

    onQueryGameResult(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_Game_QueryGameResult, PB.onCmdQueryGameResultConvertToBuff(data), info => {
            console.log(JSON.stringify(info.results));
            if (info.results.length == 0) {
                this.tipsNode.active = true;
            }
            else {

                info.results.forEach((el, index) => {
                    this.HisData.push(el);
                    if (el.gType == pb.GameType.JJ_PK || el.gType == pb.GameType.JJ_DuoKong || el.gType == pb.GameType.JJ_ChuangGuan) {
                        let node = cc.instantiate(this.item);
                        this.content.addChild(node);
                        let nodeHandle = node.getComponent('HisItem');
                        nodeHandle.itemData = el;
                        nodeHandle.itemIndex = this.HisData.length;
                        nodeHandle.onShow();
                    }
                });

            }
            this.HisCount += data.pageSize;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        });

    }
}
