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

    onShow(id) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let info = {
            id: id,
        }

        let CmdCgdsRanking = pb.CmdCgdsRanking;
        let message = CmdCgdsRanking.create(info);
        let buff = CmdCgdsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgdsRanking, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('炒股大赛排行榜' + JSON.stringify(res));
            this.createItem(res);
        })
    }

    createItem(res) {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }
}
