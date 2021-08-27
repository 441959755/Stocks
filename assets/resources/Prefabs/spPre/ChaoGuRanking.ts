import { pb } from "../../../protos/proto";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    _curData = null;

    @property(cc.Node)
    scorllNode: cc.Node = null;

    onShow(data) {
        this._curData = data;
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let info = {
            id: data.id,
        }

        let CmdCgdsRanking = pb.CmdCgdsRanking;
        let message = CmdCgdsRanking.create(info);
        let buff = CmdCgdsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgdsRanking, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('炒股大赛排行榜' + JSON.stringify(res));
            this.createItem(res.Items);
        })
    }

    createItem(items) {
        if (!items || items.length <= 0) {
            this.tipsNode.active = true;
            return;
        }
        this.tipsNode.active = false;
        // async.eachLimit(items, 1, (el, cb) => {
        //     let node = cc.instantiate(this.item);
        //     this.content.addChild(node);
        //     let handle = node.getComponent('ChaoGuRankingItem');
        //     index++;
        //     handle.onShow(el, index, this._curData);

        //     setTimeout(cb, 0);
        // })

        let UIScrollControl = this.scorllNode.getComponent('UIScrollControl');
        UIScrollControl.clear();

        UIScrollControl.initControl(this.item, items.length, this.item.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent('ChaoGuRankingItem');
            handle.onShow(items[index], index + 1, this._curData);
        })

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

    onDisable() {
        this.content.removeAllChildren();
    }
}
