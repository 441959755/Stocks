import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import { LocationPoint } from "../../../sctiprs/global/LocationPoint";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";



const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    curData = null;

    @property(cc.Node)
    scrollNode: cc.Node = null;

    onLoad() {
        this.content.removeAllChildren();
    }

    //查询闯关赛关卡排行
    reqGameCgsGetStageRank(id, stage) {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        let data = {
            id: id,
            stage: stage,
        }

        let CmdCgsRanking = pb.CmdCgsRanking;
        let message = CmdCgsRanking.create(data);
        let buff = CmdCgsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetStageRank, buff, (res) => {

            console.log('闯关赛关卡排行' + JSON.stringify(res));
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GameData.locationLayer = LocationPoint.JJ_ChuangGuanOtherHis;

            this.curData = res;
            this.initShow(stage);
        })
    }

    initShow(stage) {
        this.content.children.forEach(el => {
            el.active = false;
        })

        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(this.item, this.curData.Items.length, this.item.getContentSize(), 0, (node, index) => {
            node.active = true;
            let handle = node.getComponent('CgsLvRankItem');
            //  handle.el = this.curData.Items[index];
            handle.initShow(index, this.curData.Items[index], stage);
        })
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }


}
