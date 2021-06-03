//import ActionUtils from "../Utils/ActionUtils";

import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";
import { pb } from '../../../protos/proto';
import GameCfgText from '../../../sctiprs/GameText';

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


    protected onEnable() {
        // ActionUtils.openLayer(this.node);
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
                }

                sumEar += datas[i].userProfit;

                sumrate += datas[i].userProfitRate;
            }

        }

        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.title.string = '双盲训练';
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
            if (GameCfg.GameType == pb.GameType.DingXiang) {
                this.title.string = '定向训练';
            } else if (GameCfg.GameType == pb.GameType.QiHuo) {
                this.title.string = '期货训练';
            }

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

            //TODO进入游戏
            let nodes = event.target.parent.children;
            let ts = nodes[8].getComponent(cc.Label).string;

            if (GameCfg.TIMETEMP.length <= 0) {
                console.log('数据没保存');
                return;
            }
            console.log(JSON.stringify(GameCfg.TIMETEMP));

            if (GameCfg.TIMETEMP.indexOf(parseInt(ts)) != -1) {
                let history = cc.sys.localStorage.getItem(ts + 'ts');
                if (history) {
                    GameCfg.history = JSON.parse(history);
                    //   console.log(JSON.stringify(GameCfg.history));
                }
                let GameSet = cc.sys.localStorage.getItem(ts + 'set');
                if (GameSet) {
                    GameCfg.GameSet = JSON.parse(GameSet);
                    //    console.log(JSON.stringify(GameCfg.GameSet));
                }

                let mark = cc.sys.localStorage.getItem(ts + 'mark');
                if (mark) {
                    GameCfg.mark = JSON.parse(mark);
                    //  console.log(JSON.stringify(GameCfg.mark));
                }

                let notice = cc.sys.localStorage.getItem(ts + 'notice');
                if (notice) {
                    GameCfg.notice = JSON.parse(notice);
                    //    console.log(JSON.stringify(GameCfg.notice));
                }

                let fill = cc.sys.localStorage.getItem(ts + 'fill');
                if (fill) {
                    GameCfg.fill = JSON.parse(fill);
                    // console.log(JSON.stringify(GameCfg.fill));
                }

                let blockHistory = cc.sys.localStorage.getItem(ts + 'block');
                if (blockHistory) {
                    GameCfg.blockHistoy = JSON.parse(blockHistory);
                }
            }


            if (!GameCfg.history || !GameCfg.GameSet || !GameCfg.fill || !GameCfg.notice || !GameCfg.mark) {
                console.log(JSON.stringify(GameCfg.GameSet));
                console.log('没有取得数据');
                return;
            }

            //  let datas = this.historyInfo.results;
            GameCfg.huizhidatas = GameCfg.history.huizhidatas;
            // console.log(nodes[3].getComponent(cc.Label).string);
            // console.log('history' + GameCfg.history.huizhidatas)
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
            //GameCfg.data[0].code = nodes[1].getComponent(cc.Label).string;
            GameCfg.data[0].circulate = items[4];
            GameCfg.GAMEFUPAN = true;

            GameCfg.finalfund = parseInt(nodes[7].getComponent(cc.Label).string) + GameCfg.ziChan;

            GameCfg.allRate = nodes[6].getComponent(cc.Label).string;

            let cache = cc.sys.localStorage.getItem(ts + 'cache');
            if (!cache) {
                console.log('没有保存此记录');
                return;
            }

            console.log(JSON.parse(cache));
            GameCfg.enterGameCache = JSON.parse(cache);
            GameCfg.historyType = GameCfg.GameType;
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                GlobalEvent.emit(EventCfg.CmdQuoteQueryFuture, JSON.parse(cache));
            } else {
                GlobalEvent.emit('onCmdQuoteQuery', JSON.parse(cache));
            }

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
                            cc.sys.localStorage.removeItem(datas[i].ts + 'ts');
                            cc.sys.localStorage.removeItem(datas[i].ts + 'set');
                            cc.sys.localStorage.removeItem(datas[i].ts + 'fill');
                            cc.sys.localStorage.removeItem(datas[i].ts + 'notice');
                            cc.sys.localStorage.removeItem(datas[i].ts + 'mark');
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
