import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalHandle from "../global/GlobalHandle";
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
        GlobalEvent.on(EventCfg.GETCGSDATA, (info) => {
            GameCfg.RoomGameData = info;
            let code = info.code + '';
            if (code.length >= 7) {
                code = code.slice(1);
            }

            let items = GameCfgText.getGPPKItemInfo(code);
            GameCfg.data[0].code = code;
            GameCfg.data[0].name = items[1];
            GameCfg.data[0].data = [];
            GameCfg.data[0].circulate = items[4];

            GameData.huizhidatas = info.tsQuoteStart + 1;
            GameCfg.huizhidatas = info.tsQuoteStart + 1;

            info.quotes && (info.quotes.items.forEach((el, index) => {
                //   if (index != 0) {
                //  let date = new Date(el.timestamp);
                let ye = (el.timestamp + '').slice(0, 4);
                let mon = (el.timestamp + '').slice(4, 6);
                let da = (el.timestamp + '').slice(6);
                let fromDate = ye + '-' + mon + '-' + da;
                //  if (fromDate != d) {
                let data = {
                    day: fromDate || 0,
                    open: el.open || 0,
                    close: el.price || 0,
                    high: el.high || 0,
                    low: el.low || 0,
                    price: el.amount || 0,
                    value: el.volume || 0,
                    Rate: (el.volume / GameCfg.data[0].circulate) * 100
                };

                if (GameCfg.data[0].circulate == 0) {
                    data.Rate = 1;
                }
                GameCfg.data[0].data.push(data);

            })
            )

            GlobalEvent.emit(EventCfg.OPENMATCHPK);
            GameData.Players[1] = info.players[0].gd;

            let timeout = Math.random() * 2 + 3;

            setTimeout(() => {
                GlobalEvent.emit('SHOWOTHERPLAYER');
                setTimeout(() => {
                    cc.director.loadScene('game');
                }, 1000)

            }, timeout * 1000);

        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GETCGSDATA);
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

            let stage = parseInt(data) - 1;
            this.reqGameCgsGetStageRank(this.confdata.id, stage);

        }
        //挑战
        else if (name == 'tzBtn') {

            let stage = parseInt(data) - 1;
            let stages = JSON.parse(this.confdata.conf);
            let gold = stages.Stages[stage].Cost[0].v;
            if (GameData.properties[pb.GamePropertyId.Gold] < Math.abs(gold)) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
                return;
            }

            if (GameData.todayGameCount[pb.GameType.JJ_ChuangGuan] >= stages.Times) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已超上限');
                return;
            }

            GameCfg.GameType = pb.GameType.JJ_ChuangGuan;
            GameCfg.GameSet = GameData.JJPKSet;

            // GlobalEvent.emit(EventCfg.OPENMATCHPK);
            GlobalHandle.onCmdGameStartReq(() => {

            })
        }

        //领取奖励
        else if (name == 'node4') {
            let box = event.target.getChildByName('box');
            if (!box.children[0].active) { return }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let info = {
                id: this.confdata.id,
                stage: parseInt(data) - 1,
            }

            let CmdCgsGetStageAward = pb.CmdCgsGetStageAward;
            let message = CmdCgsGetStageAward.create(info);
            let buff = CmdCgsGetStageAward.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_CgsGetStageAward, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                console.log('领取闯关赛奖励' + JSON.stringify(res));
                if (!res.err) {

                    box.children.forEach(el => {
                        el.active = false;
                    });
                    box.children[2].active = true;
                    let awardLabel = event.target.getChildByName('label2').getComponent(cc.Label);
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '奖励：' + awardLabel.string)
                }

            })
        }
    }

    //同步闯关赛游戏数据
    syncCGSGameData() {
        socket.send(pb.MessageId.Sync_S2C_GameCg_GD, null, (res) => {
            console.log('闯关赛配置2' + JSON.stringify(res));
            this.confdata = res;
            this.onUpShowTimeCount();
            this.onUpContent();
        })
    }


    // 查询当前一轮闯关赛配置数据
    reqGameCgsGetConf() {
        socket.send(pb.MessageId.Req_Game_CgsGetConf, null, (res) => {
            console.log('闯关赛配置1' + JSON.stringify(res));
            this.confdata = res;
            GameData.CGSConfData = res;
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

            let box = node4.getChildByName('box');
            box.children.forEach(el => {
                el.active = false;
            })

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

            let awards = GameData.cgState.awards[index];

            if (awards.gotten) {
                box.children[2].active = true;
            }
            else if (awards.awarded) {
                box.children[0].active = true;
            } else {
                box.children[1].active = true;
            }


            if (GameData.cgState && index > GameData.cgState.stage) {
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
            else if (GameData.cgState && index == GameData.cgState.stage) {
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
            else if (GameData.cgState && index < GameData.cgState.stage) {
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

        let CmdCgsRanking = pb.CmdCgsRanking;
        let message = CmdCgsRanking.create(data);
        let buff = CmdCgsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetStageRank, buff, (res) => {

            console.log('闯关赛关卡排行' + JSON.stringify(res));
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            // GlobalEvent.emit(EventCfg.OPENCGSLVRANK, res);
            //  this.StageRankData = res;
            PopupManager.loadStageRank('cgsLvRank', res);

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
