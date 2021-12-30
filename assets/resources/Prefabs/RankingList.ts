import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import List from "../../sctiprs/Utils/List";
import PopupManager from "../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    scollNodes: cc.Node[] = [];

    @property([cc.Node])
    items: cc.Node[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property(cc.Label)
    tipsLabel = null;

    @property(List)
    listV1: List = null;

    @property(List)
    listV2: List = null;

    @property(List)
    listV3: List = null;

    @property(List)
    listV4: List = null;

    rankList1 = null;

    rankList2 = null;

    rankList3 = null;

    rankList4 = null;

    curSwitch = 0;

    awardList = null;

    from = null;
    to = null;

    onLoad() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_Hall_GetFameRanking, null, (info) => {
            console.log('查询威望排行应答' + JSON.stringify(info));
            this.rankList1 = info.Items;
            this.listV1.numItems = this.rankList1.length;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        });
    }

    //获取等级排行
    getLevelRanking() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_Hall_GetLevelRanking, null, (info) => {
            console.log('查询等级排行应答' + JSON.stringify(info));
            this.rankList2 = info.Items;
            this.listV2.numItems = this.rankList2.length;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    //查询威望周排行
    getFameRankingWeekly() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_Hall_GetFameRankingWeekly, null, (info) => {
            console.log('查询威望周排行' + JSON.stringify(info));
            this.rankList3 = info.Items;
            this.listV3.numItems = this.rankList3.length;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    //查询闯关赛排行榜
    getCgsRanking() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let data = {
            id: GameData.gameData.cgState.seasonId,
        }
        let CmdCgsRanking = pb.CmdCgsRanking;
        let message = CmdCgsRanking.create(data);
        let buff = CmdCgsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetSeasonRank, buff, (info) => {
            console.log('闯关赛排行榜' + JSON.stringify(info));
            this.rankList4 = info.Items;
            this.listV4.numItems = this.rankList4.length;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    // 获取炒股大赛排行榜
    getCgdsRanking() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        let data = {
            id: GameData.gameData.cgdsStockList[0].id,
        }

        let CmdCgdsRanking = pb.CmdCgdsRanking;
        let message = CmdCgdsRanking.create(data);
        let buff = CmdCgdsRanking.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_CgsGetSeasonRank, buff, (info) => {
            console.log('闯关赛排行榜' + JSON.stringify(info));
            this.rankList4 = info.Items;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    onListRender1(item: cc.Node, idx: number) {
        let handle = item.getComponent('RankItem' + 1);
        handle.onShow(this.rankList1[idx], idx);
    }

    onListRender2(item: cc.Node, idx: number) {
        let handle = item.getComponent('RankItem' + 2);
        handle.onShow(this.rankList2[idx], idx);
    }

    onListRender3(item: cc.Node, idx: number) {
        let handle = item.getComponent('RankItem' + 3);
        handle.onShow(this.rankList3[idx], idx);
    }

    onListRender4(item: cc.Node, idx: number) {
        let handle = item.getComponent('RankItem' + 4);
        handle.onShow(this.rankList4[idx], idx);
    }

    start() {
        this.toggles.forEach((el, index) => {
            if (index == 0) {
                el.isChecked = true;
                this.scollNodes[index].active = true;
            }
            else {
                el.isChecked = false;
                this.scollNodes[index].active = false;
            }
        })

        this.tipsLabel.node.parent.active = false;
        console.log(JSON.stringify(GameCfgText.appConf));

        //当前配置
        GameCfgText.appConf.module.forEach(el => {
            if (el.id == 18) {
                this.curSwitch = el.switch;
            }
        });

        if (!this.curSwitch) {
            this.toggles[3].node.active = false;
        }

        else if (this.curSwitch) {
            this.toggles[3].node.active = true;
        }

        // 0表示关闭，1表示打开炒股大赛排行，2表示打开闯关排行
        if (this.curSwitch == 2) {

            // if (!GameData.gameData.cgState) {
            //     this.toggles[3].node.active = false;
            // }

            // 查询当前一轮闯关赛配置数据
            socket.send(pb.MessageId.Req_Game_CgsGetConf, null, (res) => {
                console.log('闯关赛配置1' + JSON.stringify(res));
                this.awardList = JSON.parse(res.award || '[]');
                this.from = res.from;
                this.to = res.to;
            })
        }
        else {
            if (this.curSwitch == 0) {
                this.toggles[3].node.active = false;
                return;
            }

            socket.send(pb.MessageId.Req_Game_CgdsList, null, (res) => {
                console.log('炒股大赛' + JSON.stringify(res));
                this.awardList = JSON.parse(res.items[0].award || '[]');
                this.from = res.items[0].from;
                this.to = res.items[0].to;
            })
        }


    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'leftBtn') {
            GameCfg.GameType = null;
            this.node.active = false;
        }

        else if (name == 'phb_topbt_help') {
            let dt = parseInt(curdata);
            if (dt == 1) {
                GameCfg.GameType = 'wwzb';
            }
            else if (dt == 2) {
                GameCfg.GameType = 'djph';
            }
            else if (dt == 3) {
                GameCfg.GameType = 'wwzb1';
            }
            else if (dt == 4) {
                GameCfg.GameType = 'sjb';
            }
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }
    }


    onToggleClick(event, curdata) {

        this.scollNodes.forEach(el => {
            el.active = false;
        })

        let name = event.node.name;
        if (name == 'toggle1') {
            this.scollNodes[0].active = true;
            this.tipsLabel.node.parent.active = false;
        }

        else if (name == 'toggle2') {

            if (!this.rankList2) {
                this.getLevelRanking();
            }

            this.scollNodes[1].active = true;
            this.tipsLabel.node.parent.active = false;
        }

        else if (name == 'toggle3') {

            if (!this.rankList3) {
                this.getFameRankingWeekly();
            }

            this.scollNodes[2].active = true;
            this.tipsLabel.node.parent.active = true;
            this.tipsLabel.string = '威望周榜每周一中午12点重置';
        }

        else if (name == 'toggle4') {

            if (!this.rankList4) {
                //1表示打开炒股大赛排行
                if (this.curSwitch == 1) {
                    this.getCgdsRanking();
                }
                // /2表示打开闯关排行
                else if (this.curSwitch == 2) {
                    this.getCgsRanking();
                }
            }

            this.scollNodes[3].active = true;

            this.tipsLabel.node.parent.active = true;
            if (this.curSwitch == 2) {

                let ts = new Date().getTime() / 1000;

                if (this.to - ts <= (24 * 60 * 60 * 3) && this.awardList.length <= 0) {
                    this.tipsLabel.string = '下一轮比赛即将开启，敬请期待';
                }

                else if (this.to - ts <= (24 * 60 * 60 * 3) && this.awardList.length > 0) {
                    this.tipsLabel.string = '本轮闯关赛即将结束，比赛结束后系统立刻发放奖励，敬请期待下一轮';
                }

                else if (this.to - ts > (24 * 60 * 60 * 3) && this.awardList.length > 0) {
                    this.tipsLabel.string = '闯关赛比赛胜利，净胜场+1，比赛失败，净胜场-1';
                }

            }
            else {
                this.tipsLabel.string = '排行榜非实时数据，每个交易日12：30和15：30更新';
            }
        }


    }

    onDisable() {
        PopupManager.arrPop.remove(2);
    }

}
