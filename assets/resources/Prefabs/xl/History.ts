
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";
import { pb } from '../../../protos/proto';
import GameCfgText from '../../../sctiprs/GameText';
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import GameData from "../../../sctiprs/GameData";

let preNodes = []

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

    start() {
        if (!this.historyInfo) {
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
        }
    }

    onEnable() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        GlobalEvent.on(EventCfg.HISTORYOPTDATA, () => {

            let nodes = preNodes;

            let ts = nodes[8].getComponent(cc.Label).string;
            let data = {
                code: nodes[2].getComponent(cc.Label).string,
            }

            let dex = -1, items;
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                items = GameCfgText.getQHItemInfo(data.code);
            } else {
                items = GameCfgText.getGPItemInfo(data.code);
            }

            data.code = items[0];
            GameCfg.data[0].data = [];
            GameCfg.data[0].name = items[1];
            GameCfg.data[0].code = items[0];
            GameCfg.data[0].circulate = items[4];
            GameCfg.GAMEFUPAN = true;

            GameCfg.allRate = 0;
            GameCfg.huizhidatas = parseInt(nodes[10].getComponent(cc.Label).string) + 1;
            GameData.huizhidatas = parseInt(nodes[9].getComponent(cc.Label).string) + 1;

            let cache = cc.sys.localStorage.getItem(ts + 'cache');
            if (!cache) {
                console.log('没有保存此记录');
                return;
            }
            GameCfg.GameSet = JSON.parse(cc.sys.localStorage.getItem(ts + 'set'));

            console.log(JSON.parse(cache));
            GameCfg.enterGameCache = JSON.parse(cache);
            GameCfg.historyType = GameCfg.GameType;
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                GlobalHandle.onCmdGameStartQuoteQueryQH(GameCfg.enterGameCache, () => {
                    cc.director.loadScene('game');
                });
            } else {
                GlobalHandle.onCmdGameStartQuoteQuery(GameCfg.enterGameCache, () => {
                    cc.director.loadScene('game');
                })
            }

        }, this);
    }

    onDisable() {
        GlobalEvent.off(EventCfg.HISTORYOPTDATA);
    }


    onShow() {
        this.content.removeAllChildren();
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        //   if (this.historyType == 'SM') {
        let datas = this.historyInfo.results;
        // console.log(JSON.stringify(datas));
        if (datas.length <= 0) {
            return;
        }

        let selectName, items;
        let str = cc.sys.localStorage.getItem('TIMETEMP');
        let TIMETEMP = [];
        if (str) {
            TIMETEMP = JSON.parse(str);
        }
        // "uid":1000145,"gType":"DingXiang","quotesCode":1002148,"kFrom":"20100921","kTo":"20101028","stockProfitRate":-2.930000066757202,"userProfitRate":7.619999885559082,"userCapital":"100000","userProfit":"7623","ts":"1623050522","rank":1
        // {"uid":1000042,"gType":"ShuangMang","quotesCode":600000,
        // "kType":"Day","kFrom":20100101,"kTo":20101010,
        // "stockProfitRate":19.1200008392334,
        // "userProfitRate":10.220000267028809,
        // "userCapital":"100000","userProfit":"800","ts":"1618454133","rank":2}]}
        let sumEar = 0;
        let sumrate = 0;

        let arr = [];
        datas.forEach(el => {
            if ((TIMETEMP.indexOf(el.ts) != -1) && (el.gType == GameCfg.GameType)) {
                arr.push(el);
            }
        });

        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(this.historyItem, arr.length, this.historyItem.getContentSize(), 0, (node, index) => {

            let nodes = node.children;
            //   this.content.addChild(node);
            nodes[0].getComponent(cc.Label).string = (index + 1) + '';
            arr[index].quotesCode += '';
            if (arr[index].quotesCode.length >= 7) {
                arr[index].quotesCode = arr[index].quotesCode.slice(1);
            }
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                items = GameCfgText.getQHItemInfo(arr[index].quotesCode);

                nodes[1].getComponent(cc.Label).string = items[2] + items[3];
                items && (nodes[2].getComponent(cc.Label).string = items[1])
            } else {
                items = GameCfgText.getGPItemInfo(arr[index].quotesCode);
                nodes[1].getComponent(cc.Label).string = arr[index].quotesCode;
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

            sumEar += arr[index].userProfit;

            sumrate += arr[index].userProfitRate;

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
        //点击复盘
        else if (name == 'btnFuPan') {
            let nodes = event.target.parent.children;
            preNodes = nodes;
            let ts = parseInt(nodes[8].getComponent(cc.Label).string);

            if (GameCfg.TIMETEMP.length <= 0) {
                console.log('数据没保存');
                return;
            }
            console.log(JSON.stringify(GameCfg.TIMETEMP));
            let info = {
                uid: GameData.userID,
                ts: ts,
            }
            GlobalHandle.GetGameOperations(info);
        }

        //清空记录
        else if (name == 'xl_lsjl_qkjl') {
            this.content.removeAllChildren();
            let datas = this.historyInfo.results;

            if (datas.length <= 0) {
                return;
            }

            let str = cc.sys.localStorage.getItem('TIMETEMP');
            let TIMETEMP, arr = [];
            if (str) {
                TIMETEMP = JSON.parse(str);
                arr = JSON.parse(str);
                console.log(arr.length);

                for (let i = datas.length - 1; i >= 0; i--) {

                    if (TIMETEMP.length > 0) {

                        if (TIMETEMP.indexOf(datas[i].ts) != -1) {

                            cc.sys.localStorage.removeItem(datas[i].ts + 'cache');

                            arr.splice(arr.indexOf(datas[i].ts), 1);
                        }

                    }
                }
                cc.sys.localStorage.removeItem('TIMETEMP');
                console.log(arr.length);
                GameCfg.TIMETEMP = arr;
                cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(arr));
                this.label.string = '0';
            }
        }

    }
}
