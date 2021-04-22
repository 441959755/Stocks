//import ActionUtils from "../Utils/ActionUtils";

import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";
import { pb } from '../../../protos/proto';

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


    start() {

    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
    }

    onShow() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        //   if (this.historyType == 'SM') {
        let datas = this.historyInfo.results;
        if (datas.length <= 0) {
            return;
        }

        let selectName = function (code) {
            let name;
            for (let i = 0; i < stocklist.length; i++) {
                if (stocklist[i].indexOf(code) != -1) {
                    let items = stocklist[i].split('|');
                    name = items[1];
                    break;
                }
            }
            if (!name) {
                console.log('没有找到该股票');
            }
            return name;
        }
        // {"uid":1000042,"gType":"ShuangMang","quotesCode":600000,
        // "kType":"Day","kFrom":20100101,"kTo":20101010,
        // "stockProfitRate":19.1200008392334,
        // "userProfitRate":10.220000267028809,
        // "userCapital":"100000","userProfit":"800","ts":"1618454133","rank":2}]}
        let sumEar = 0;
        for (let i = 0; i < datas.length; i++) {
            let node = cc.instantiate(this.historyItem);
            let nodes = node.children;
            this.content.addChild(node);
            node.setPosition(cc.v2(0, 0));
            nodes[0].getComponent(cc.Label).string = datas[i].uid;
            nodes[1].getComponent(cc.Label).string = datas[i].quotesCode;
            nodes[2].getComponent(cc.Label).string = selectName(datas[i].quotesCode);
            nodes[3].getComponent(cc.Label).string = datas[i].kFrom;			// 行情起始日期YYYYMMDD或时间HHMMSS
            nodes[4].getComponent(cc.Label).string = datas[i].kTo;

            nodes[5].getComponent(cc.Label).string = datas[i].stockProfitRate.toFixed(2) + '%';
            nodes[6].getComponent(cc.Label).string = datas[i].userProfitRate.toFixed(2) + '%';
            nodes[7].getComponent(cc.Label).string = datas[i].userProfit;
            nodes[8].getComponent(cc.Label).string = datas[i].ts;
            sumEar += datas[i].userProfit;
        }

        this.label.string = sumEar + '';
        // }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        //点击复盘
        else if (name == 'btnFuPan') {
            GameCfg.GAMEFUPAN = true;
            //TODO进入游戏


            let nodes = event.target.parent.children;
            let ts = nodes[8].getComponent(cc.Label).string;

            if (GameCfg.TIMETEMP.length <= 0) {
                console.log('数据没保存');
                return;
            }
            if (GameCfg.TIMETEMP.indexOf(parseInt(ts)) != -1) {
                GameCfg.history = JSON.parse(cc.sys.localStorage.getItem(ts));
                GameCfg.GameSet = JSON.parse(cc.sys.localStorage.getItem(ts + 'set'));
            }

            if (!GameCfg.history || !GameCfg.GameSet) {
                console.log('没有取得数据');
                return;
            }

            //  let datas = this.historyInfo.results;

            let data = {
                ktype: null,
                kstyle: null,
                code: parseInt(nodes[1].getComponent(cc.Label).string),
                from: parseInt(nodes[3].getComponent(cc.Label).string),
                total: parseInt(GameCfg.GameSet.KLine) + 100,
                to: 0,
            }

            if (GameCfg.GameSet.market == '随机行情') {
                data.kstyle = pb.KStyle.Random;
            } else if (GameCfg.GameSet.market == '震荡行情') {
                data.kstyle = pb.KStyle.Wave;
            } else if (GameCfg.GameSet.market == '单边向上行情') {
                data.kstyle = pb.KStyle.Up;
            } else if (GameCfg.GameSet.market == '单边向下行情') {
                data.kstyle = pb.KStyle.Down;
            }

            if (GameCfg.GameSet.ZLine == '日线') {
                data.ktype = pb.KType.Day;
            } else if (GameCfg.GameSet.ZLine == '周线') {
                data.ktype = pb.KType.Day7;
            } else if (GameCfg.GameSet.ZLine == '30分钟K') {
                data.ktype = pb.KType.Min30;
            } else if (GameCfg.GameSet.ZLine == '60分钟K') {
                data.ktype = pb.KType.Min60;
            }

            let dex = -1, items;
            for (let i = 0; i < stocklist.length; i++) {

                if (stocklist[i].indexOf(data.code) != -1) {
                    dex = i;
                    break;
                }

            }
            if (dex != -1) {
                items = stocklist[dex].split('|');

            }

            GameCfg.data[0].data = [];
            GameCfg.data[0].name = items[1];
            GameCfg.data[0].code = items[0];
            GameCfg.data[0].circulate = items[4];
            GlobalEvent.emit('onCmdQuoteQuery', data);
        }
    }

    // update (dt) {}
}
