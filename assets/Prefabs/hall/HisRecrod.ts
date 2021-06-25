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

    HisData = null;

    start() {

    }

    onToggleClick(event) {

        this.content.children.forEach(el => {
            let handle = el.getComponent('HisItem');
            handle.onHisItemRate(event.isChecked);
        })

    }

    onEnable() {
        this.tipsNode.active = false;

        if (!this.HisData) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let ts = new Date().getTime() / 1000;
            let data = {
                uid: GameData.userID,
                to: ts,
                pageSize: 20,
            }

            socket.send(pb.MessageId.Req_Game_QueryGameResult, PB.onCmdQueryGameResultConvertToBuff(data), info => {
                this.HisData = info.results;
                console.log(JSON.stringify(this.HisData));
                if (this.HisData.length == 0) {
                    this.tipsNode.active = true;
                }
                else {
                    this.HisData.forEach((el, index) => {
                        let node = cc.instantiate(this.item);
                        this.content.addChild(node);
                        let nodeHandle = node.getComponent('HisItem');
                        nodeHandle.itemData = el;
                        nodeHandle.itemIndex = index + 1;
                        nodeHandle.onShow();
                    });

                }

                GlobalEvent.emit(EventCfg.LOADINGHIDE);



            });

        }

    }

    // update (dt) {}
}
