
//import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
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

    // historyType = null;

    historyInfo = null;

    @property(cc.Node)
    content: cc.Node = null;


    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    title: cc.Label = null;

    onEnable() {
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
        let it = 1;

        for (let i = datas.length - 1; i >= 0; i--) {
            if (TIMETEMP.indexOf(datas[i].ts) != -1 || GameCfg.GameType == pb.GameType.ShuangMang) {
                let node = cc.instantiate(this.historyItem);
                let nodes = node.children;
                this.content.addChild(node);
                node.setPosition(cc.v2(0, 0));
                nodes[0].getComponent(cc.Label).string = (it++) + '';
                datas[i].quotesCode += '';
                if (datas[i].quotesCode.length >= 7) {
                    datas[i].quotesCode = datas[i].quotesCode.slice(1);
                }

                if (GameCfg.GameType == pb.GameType.QiHuo) {
                    items = GameCfgText.getQHItemInfo(datas[i].quotesCode);
                    //  nodes[1].getComponent(cc.Label).string = datas[i].quotesCode;
                    nodes[1].getComponent(cc.Label).string = items[2] + items[3];
                    items && (nodes[2].getComponent(cc.Label).string = items[1])
                } else {
                    items = GameCfgText.getGPItemInfo(datas[i].quotesCode);
                    nodes[1].getComponent(cc.Label).string = datas[i].quotesCode;
                    items && (nodes[2].getComponent(cc.Label).string = items[1])
                }
                nodes[3].getComponent(cc.Label).string = datas[i].kFrom;			// 行情起始日期YYYYMMDD或时间HHMMSS
                nodes[4].getComponent(cc.Label).string = datas[i].kTo;

                nodes[5].getComponent(cc.Label).string = datas[i].stockProfitRate.toFixed(2) + '%';
                if (datas[i].stockProfitRate > 0) {
                    nodes[5].color = cc.Color.RED;
                } else if (datas[i].stockProfitRate < 0) {
                    nodes[5].color = cc.Color.GREEN;
                } else {
                    nodes[5].color = cc.Color.WHITE;
                }
                nodes[6].getComponent(cc.Label).string = datas[i].userProfitRate.toFixed(2) + '%';
                if (datas[i].userProfitRate > 0) {
                    nodes[6].color = cc.Color.RED;
                } else if (datas[i].userProfitRate < 0) {
                    nodes[6].color = cc.Color.GREEN;
                } else {
                    nodes[6].color = cc.Color.WHITE;
                }
                nodes[7].getComponent(cc.Label).string = datas[i].userProfit;
                if (datas[i].userProfit > 0) {
                    nodes[7].color = cc.Color.RED;
                } else if (datas[i].userProfit < 0) {
                    nodes[7].color = cc.Color.GREEN;
                } else {
                    nodes[7].color = cc.Color.WHITE;
                }
                if (GameCfg.GameType != pb.GameType.ShuangMang) {
                    nodes[8].getComponent(cc.Label).string = datas[i].ts;
                    nodes[9].getComponent(cc.Label).string = datas[i].kStartup;
                    nodes[10].getComponent(cc.Label).string = datas[i].kStop;
                }

                if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                    let GameSet = cc.sys.localStorage.getItem(datas[i].ts + 'set');
                    if (GameSet) {
                        GameSet = JSON.parse(GameSet);
                        nodes[12].getComponent(cc.Label).string = GameSet.select + ' ' + GameSet.strategy;
                    }


                    let AIrate = cc.sys.localStorage.getItem(datas[i].ts + 'AIRATE');

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

                sumEar += datas[i].userProfit;

                sumrate += datas[i].userProfitRate;
            }

        }

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
            let ts = nodes[8].getComponent(cc.Label).string;

            if (GameCfg.TIMETEMP.length <= 0) {
                console.log('数据没保存');
                return;
            }
            console.log(JSON.stringify(GameCfg.TIMETEMP));

            GlobalHandle.GetGameOperations(ts);
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
            }
        }

    }
}
