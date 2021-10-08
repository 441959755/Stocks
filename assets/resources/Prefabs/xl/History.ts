
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";
import { pb } from '../../../protos/proto';
import GameCfgText from '../../../sctiprs/GameText';
import GameData from "../../../sctiprs/GameData";

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    historyItem: cc.Node = null;

    historyInfo = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Node)
    scrollNode: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    onEnable() {
        //   if (!this.historyInfo) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let data = new Date();
        data.setDate(1);
        data.setHours(0);
        data.setSeconds(0);
        data.setMinutes(0);

        let inf = {
            uid: GameData.userID,
            gType: GameCfg.GameType,
            to: parseInt(new Date().getTime() / 1000 + ''),
            pageSize: 200,
        }

        let CmdQueryGameResult = pb.CmdQueryGameResult;
        let message = CmdQueryGameResult.create(inf)
        let buff = CmdQueryGameResult.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_QueryGameResult, buff, (info) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('sm历史数据' + JSON.stringify(info));
            this.historyInfo = info;
            this.onShow();
        })
        //    }
    }

    onShow() {
        this.content.removeAllChildren();

        let datas = this.historyInfo.results;
        this.tipsNode && (this.tipsNode.active = true)
        if (datas.length <= 0) {
            return;
        }

        let selectName, items;
        let str = cc.sys.localStorage.getItem('CLEARTS');
        let da = new Date();
        da.setDate(1);
        da.setHours(0);
        da.setSeconds(0);
        da.setMinutes(0);
        let str1 = parseInt(da.getTime() / 1000 + '');

        let TIMETEMP = 0;

        if (str) {
            str = JSON.parse(str);
            TIMETEMP = str > str1 ? str : str1;
        }
        else {
            TIMETEMP = str1;
        }

        let sumEar = 0;
        let sumrate = 0;

        let arr = [];

        datas.forEach(el => {
            // let cache = cc.sys.localStorage.getItem(el.ts + 'cache');

            if ((el.ts > TIMETEMP) && (el.gType == GameCfg.GameType)) {
                arr.push(el);
            }

        });

        if (arr.length > 0) {
            this.tipsNode && (this.tipsNode.active = false)
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }

        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(this.historyItem, arr.length, this.historyItem.getContentSize(), 0, (node, index) => {

            node.getComponent('HistoryItem').onShow(arr[index]);
            let nodes = node.children;
            nodes[0].getComponent(cc.Label).string = (index + 1) + '';
            arr[index].quotesCode += '';
            let codes;
            if (arr[index].quotesCode.length >= 7) {
                codes = arr[index].quotesCode.slice(1);
            }
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                items = GameCfgText.getQHItemInfo(arr[index].quotesCode);

                nodes[1].getComponent(cc.Label).string = items[2] + items[3];
                items && (nodes[2].getComponent(cc.Label).string = items[1])
            } else {
                items = GameCfgText.getGPItemInfo(arr[index].quotesCode);
                nodes[1].getComponent(cc.Label).string = codes || arr[index].quotesCode;
                items && (nodes[2].getComponent(cc.Label).string = items[1])
            }
            nodes[3].getComponent(cc.Label).string = arr[index].kFrom;			// 行情起始日期YYYYMMDD或时间HHMMSS
            nodes[4].getComponent(cc.Label).string = arr[index].kTo;

            nodes[5].getComponent(cc.Label).string = arr[index].stockProfitRate.toFixed(2) + '%';
            if (arr[index].stockProfitRate > 0) {
                nodes[5].color = cc.Color.RED;
            } else if (arr[index].stockProfitRate < 0) {
                nodes[5].color = cc.Color.GREEN;
            } else {
                nodes[5].color = cc.Color.WHITE;
            }
            nodes[6].getComponent(cc.Label).string = arr[index].userProfitRate.toFixed(2) + '%';
            if (arr[index].userProfitRate > 0) {
                nodes[6].color = cc.Color.RED;
            } else if (arr[index].userProfitRate < 0) {
                nodes[6].color = cc.Color.GREEN;
            } else {
                nodes[6].color = cc.Color.WHITE;
            }
            nodes[7].getComponent(cc.Label).string = arr[index].userProfit;
            if (arr[index].userProfit > 0) {
                nodes[7].color = cc.Color.RED;
            } else if (arr[index].userProfit < 0) {
                nodes[7].color = cc.Color.GREEN;
            } else {
                nodes[7].color = cc.Color.WHITE;
            }
            if (GameCfg.GameType != pb.GameType.ShuangMang) {
                nodes[8].getComponent(cc.Label).string = arr[index].ts;
                nodes[9].getComponent(cc.Label).string = arr[index].kStartup;
                nodes[10].getComponent(cc.Label).string = arr[index].kStop;
            }

            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                let GameSet = cc.sys.localStorage.getItem(arr[index].ts + 'set');
                if (GameSet) {
                    GameSet = JSON.parse(GameSet);
                    nodes[12].getComponent(cc.Label).string = GameSet.select + ' ' + GameSet.strategy;
                }

                let AIrate = cc.sys.localStorage.getItem(arr[index].ts + 'AIRATE');

                if (AIrate) {
                    nodes[11].getComponent(cc.Label).string = parseFloat(AIrate).toFixed(2) + '%';
                    if (parseFloat(AIrate) > 0) {
                        nodes[11].color = cc.Color.RED;
                    }
                    else if (parseFloat(AIrate) == 0) {
                        nodes[11].color = cc.Color.WHITE;
                    }
                    else {
                        nodes[11].color = cc.Color.GREEN;
                    }
                }

            }

        })

        arr.forEach(el => {
            sumEar += el.userProfit;

            sumrate += el.userProfitRate;
        })


        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            // this.title.string = '双盲训练';
            this.label.string = sumEar + '';
            if (sumEar > 0) {
                this.label.node.color = cc.Color.RED;
            } else if (sumEar < 0) {
                this.label.node.color = cc.Color.GREEN;
            } else {
                this.label.node.color = cc.Color.WHITE;
            }
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang || GameCfg.GameType == pb.GameType.QiHuo) {
            this.label.string = (sumrate).toFixed(2) + '%';
            if (sumrate > 0) {
                this.label.node.color = cc.Color.RED;
            } else if (sumrate < 0) {
                this.label.node.color = cc.Color.GREEN;
            } else {
                this.label.node.color = cc.Color.WHITE;
            }
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
            GameCfg.historyType = null;
        }

        //清空记录
        else if (name == 'xl_lsjl_qkjl') {
            this.content.removeAllChildren();
            let datas = this.historyInfo.results;

            if (datas.length <= 0) {
                return;
            }

            let ts = parseInt(new Date().getTime() / 1000 + '')

            cc.sys.localStorage.setItem('CLEARTS', ts);

            // let str = cc.sys.localStorage.getItem('TIMETEMP');
            // let TIMETEMP, arr = [];
            // if (str) {
            //     TIMETEMP = JSON.parse(str);
            //     arr = JSON.parse(str);
            //     console.log(arr.length);

            //     for (let i = datas.length - 1; i >= 0; i--) {

            //         if (TIMETEMP.length > 0) {

            //             if (TIMETEMP.indexOf(datas[i].ts) != -1) {

            //                 cc.sys.localStorage.removeItem(datas[i].ts + 'cache');

            //                 arr.splice(arr.indexOf(datas[i].ts), 1);
            //             }
            //         }
            //     }
            //     cc.sys.localStorage.removeItem('TIMETEMP');
            //     console.log(arr.length);
            //     GameCfg.TIMETEMP = arr;
            //     cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(arr));
            //     this.label.string = '0';
            // }
        }
    }
}
