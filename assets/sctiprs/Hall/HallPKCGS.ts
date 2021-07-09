import { pb } from "../../protos/proto";
import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.Node)
    ClearanceRankNode: cc.Node = null;

    ClearanceRank = null;

    onLoad() {

    }

    start() {
        this.reqGameCgsGetConf();

        this.reqGameCgsGetClearanceRank();
    }

    onEnable() {


    }

    onBtnClick(event, data) {

        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

        //点击查看更多
        else if (name == 'cgs_ckgd') {
            PopupManager.LoadMRTBox('MRT', this.ClearanceRank.Items);
        }
    }

    // 查询当前一轮闯关赛配置数据
    reqGameCgsGetConf() {
        socket.send(pb.MessageId.Req_Game_CgsGetConf, null, (res) => {
            console.log('闯关赛配置' + JSON.stringify(res));
        })
    }

    // 查询闯关赛通关排行
    reqGameCgsGetClearanceRank() {
        socket.send(pb.MessageId.Req_Game_CgsGetClearanceRank, null, (res) => {
            console.log('闯关赛通关排行' + JSON.stringify(res));
            this.ClearanceRank = res;
            this.onShowClearanceRank();
        })
    }

    onShowClearanceRank() {
        let items = this.ClearanceRankNode.children;
        let data = this.ClearanceRank.Items;
        items.forEach((el, index) => {
            if (index < 3) {
                let rank = el.getChildByName('label1').getComponent(cc.Label);
                let name = el.getChildByName('label2').getComponent(cc.Label);
                let lv = el.getChildByName('label3').getComponent(cc.Label);
                rank.string = '' + (index + 1);
                name.string = data[index].nickname || data[index].uid;
                lv.string = data[index].cgsClearance;
            }

        })

    }


    //查询闯关赛关卡排行
    reqGameCgsGetStageRank(id, stage) {
        let data = {
            id: id,
            stage: stage,
        }

        let CmdCgsRanking = pb.CmdCgdsRanking;
        let message = CmdCgsRanking.create(data);
        let buff = CmdCgsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetStageRank, buff, (res) => {
            console.log('闯关赛关卡排行' + JSON.stringify(res));
        })
    }

    //查询闯关赛排行榜
    reqGameCgsGetSeasonRank(id, stage) {
        let data = {
            id: id,
            stage: stage,
        }
        let CmdCgsRanking = pb.CmdCgdsRanking;
        let message = CmdCgsRanking.create(data);
        let buff = CmdCgsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetSeasonRank, buff, (res) => {
            console.log('闯关赛排行榜' + JSON.stringify(res));
        })
    }

    reqGameCgsGetStageAward() {
        socket.send(pb.MessageId.Req_Game_CgsGetStageAward, buff, (res) => {
            console.log('领取闯关赛奖励' + JSON.stringify(res));
        })
    }


}
