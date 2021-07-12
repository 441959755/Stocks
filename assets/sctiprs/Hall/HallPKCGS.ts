import { pb } from "../../protos/proto";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
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

    @property(cc.Node)
    content: cc.Node = null;

    ClearanceRank = null;

    confdata = null;     //闯关赛配置

    inCall = null;

    //  StageRankData = null;

    onLoad() {

    }

    start() {
        this.reqGameCgsGetConf();

        this.reqGameCgsGetClearanceRank();
    }

    onEnable() {
        if (this.confdata) {
            this.onUpShowTimeCount();
            this.onUpContent();
        }
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

        else if (name == 'ckBtn') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            //   if (!this.StageRankData) {
            let stage = parseInt(data) - 1;
            this.reqGameCgsGetStageRank(this.confdata.id, stage);
            // }
            // else {
            //     // PopupManager.loadStageRank('CgsLv', null);
            // }

        }
    }


    // 查询当前一轮闯关赛配置数据
    reqGameCgsGetConf() {
        socket.send(pb.MessageId.Req_Game_CgsGetConf, null, (res) => {
            console.log('闯关赛配置' + JSON.stringify(res));
            this.confdata = res;
            this.onUpShowTimeCount();
            this.onUpContent();
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

    //名人堂
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

    onUpContent() {
        let items = this.content.children;
        let stages = JSON.parse(this.confdata.conf);
        items.forEach((el, index) => {
            index = 9 - index;

            let node1 = el.getChildByName('node1');
            let node3 = el.getChildByName('node3');
            let node4 = el.getChildByName('node4');
            let node5 = el.getChildByName('node5');

            let peopleLabel = node3.getChildByName('label1').getComponent(cc.Label);
            let lifesLabel = node3.getChildByName('label3').getComponent(cc.Label);
            let cgs_jdt = node3.getChildByName('cgs_jdt');
            let progress = node3.getChildByName('progress').getComponent(cc.ProgressBar);
            let label2 = node3.getChildByName('label2').getComponent(cc.Label);
            label2.node.active = false;

            let awardLabel = node4.getChildByName('label2').getComponent(cc.Label);
            awardLabel.string = stages.Stages[index].Awards[0].v + '金币';

            let ckBtn = node3.getChildByName('ckBtn');
            ckBtn.children.forEach(el => {
                el.active = false;
            })
            ckBtn.children[1].active = true;
            let taBtn = node5.getChildByName('tzBtn');
            taBtn.children.forEach(el => {
                el.active = false;
            })
            let costLabel = node5.getChildByName('label1').getComponent(cc.Label);

            costLabel.string = '报名（' + Math.abs(stages.Stages[index].Cost[0].v) + '金币）'

            if (index > GameData.cgState.stage) {
                node1.children[1].active = false;
                node1.children[2].active = false;
                node1.children[0].active = true;
                cgs_jdt.active = false;
                lifesLabel.string = '';
                if (GameData.cgState.lifes) {
                    lifesLabel.string = '生命：' + GameData.cgState.lifes;
                }
                progress.progress = 0;
                peopleLabel.string = '在线（' + this.confdata.people[index] + '人）'

                taBtn.children[0].active = true;
                // ckBtn.children[0].active = true;
            }
            else if (index == GameData.cgState.stage) {
                node1.children[0].active = false;
                node1.children[1].active = true;
                node1.children[2].active = false;
                cgs_jdt.active = false;
                lifesLabel.string = '';
                if (GameData.cgState.lifes) {
                    lifesLabel.string = '生命：' + GameData.cgState.lifes;
                }
                if (GameData.cgState.progress) {
                    progress.progress = GameData.cgState.progress / stages.Stages[index].Progress;
                }
                else {
                    progress.progress = 0;

                }
                peopleLabel.string = '在线（' + this.confdata.people[index] + '人）'

                taBtn.children[1].active = true;
                //   ckBtn.children[1].active = true;

                costLabel.node.color = cc.Color.WHITE;
            }
            else if (index < GameData.cgState.stage) {
                node1.children[0].active = false;
                node1.children[1].active = false;
                node1.children[2].active = true;

                cgs_jdt.active = true;
                lifesLabel.string = '';
                peopleLabel.string = '在线（...人）'
                taBtn.children[2].active = true;
                //  ckBtn.children[2].active = true;
                costLabel.node.color = cc.Color.GREEN;
            }

            let CgLogAward = GameData.cgState.awards;

            CgLogAward.forEach((el, i) => {
                if (el.stage == index) {
                    if (el.awarded) {
                        //领取
                        if (el.gotten) {
                            awardLabel.node.color = cc.Color.YELLOW;
                        }
                        //未领取
                        else {
                            awardLabel.node.color = cc.Color.YELLOW;
                        }
                    }

                }

            });
        })

    }

    //跟新时间 次数
    onUpShowTimeCount() {
        if (this.confdata.status == 0) {
            console.log('闯关赛还未开始');
        }
        else if (this.confdata.status == 1) {
            console.log('进行中ing');
            let curTime = parseInt(new Date().getTime() / 1000 + '');
            curTime = this.confdata.to - curTime;

            if (curTime <= 0) {
                console.log('已结束');

            } else {
                this.timeLabel.string = this.timeStamp(curTime);
                this.inCall = setInterval(() => {
                    if (curTime <= 60) {
                        clearInterval(this.inCall);
                        this.inCall = null;
                        console.log('已结束');
                    }
                    curTime -= 60;
                    this.timeLabel.string = this.timeStamp(curTime);

                }, 60 * 1000)


            }
        }
        else if (this.confdata.status == 2) {
            console.log('已结束');
        }

        let stages = JSON.parse(this.confdata.conf);
        this.countLabel.string = '(今日次数：' + GameData.todayGameCount[pb.GameType.JJ_ChuangGuan] + '/' + stages.Times + ')';
    }


    onDisable() {
        this.inCall && (clearInterval(this.inCall));
        this.inCall = null;
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
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.OPENCGSLVRANK, res);
            //  this.StageRankData = res;
            //   PopupManager.loadStageRank('CgsLv', res);

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



    timeStamp(second_time) {
        let time = second_time;
        if (parseInt(second_time) > 60) {

            let second = parseInt(second_time) % 60;
            let min = parseInt(second_time / 60 + '');
            time = min + "分" + second + "秒";

            if (min > 60) {
                min = parseInt(second_time / 60 + '') % 60;
                var hour = parseInt(parseInt(second_time / 60 + '') / 60 + '');
                time = hour + "小时" + min + "分";

                if (hour > 24) {
                    hour = parseInt(parseInt(second_time / 60 + '') / 60 + '') % 24;
                    var day = parseInt(parseInt(parseInt(second_time / 60 + '') / 60 + '') / 24 + '');
                    time = day + "天" + hour + "小时" + min + "分";
                }
            }
        }
        else {
            time = 0 + "天" + 0 + "小时" + 1 + "分";
        }

        return time;

    }

}
