import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";
import { pb } from '../../../protos/proto';
import GameData from "../../../sctiprs/GameData";
import List from '../../../sctiprs/Utils/List';
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

    @property(List)
    listV: List = null;

    arr = [];

    onEnable() {
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

            console.log('历史数据' + JSON.stringify(info));

            this.historyInfo = info;

            this.onShow();

            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    onShow() {

        let datas = this.historyInfo.results;
        this.tipsNode && (this.tipsNode.active = true)
        if (datas.length <= 0) {
            return;
        }

        let str = cc.sys.localStorage.getItem('CLEARTS' + GameCfg.GameType);
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
        } else {
            TIMETEMP = str1;
        }

        this.arr = [];

        datas.forEach(el => {
            if ((el.ts > TIMETEMP) && (el.gType == GameCfg.GameType)) {
                this.arr.push(el);
            }
        });

        this.listV.numItems = this.arr.length;

        this.onShowCount();
    }

    onShowCount() {

        if (this.arr.length > 0) {
            this.tipsNode && (this.tipsNode.active = false)
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }

        let sumEar = 0;
        let sumRate = 0;

        this.arr.forEach(el => {
            sumEar += el.userProfit;
            sumRate += el.userProfitRate;
        })

        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            // this.title.string = '双盲训练';
            if (sumEar >= 1000000000) {
                this.label.string = '10亿+';
            }
            else if (sumEar >= 100000) {
                this.label.string = (sumEar / 10000).toFixed(2) + '万';
            }
            else {
                this.label.string = sumEar + '';
            }

            if (sumEar > 0) {
                this.label.node.color = new cc.Color().fromHEX('#e94343');
            } else if (sumEar < 0) {
                this.label.node.color = new cc.Color().fromHEX('#31a633');
            } else {
                this.label.node.color = cc.Color.WHITE;
            }
        }

        else if (GameCfg.GameType == pb.GameType.DingXiang || GameCfg.GameType == pb.GameType.QiHuo) {
            this.label.string = (sumRate).toFixed(2) + '%';
            if (sumRate > 0) {
                this.label.node.color = new cc.Color().fromHEX('#e94343');
            } else if (sumRate < 0) {
                this.label.node.color = new cc.Color().fromHEX('#31a633');
            } else {
                this.label.node.color = cc.Color.WHITE;
            }
        }
    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('HistoryItem');
        handle.onShow(this.arr[idx], idx);
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

            this.arr = [];

            let datas = this.arr;

            if (datas.length <= 0) {
                this.tipsNode.active = true;
            }

            this.listV.numItems = this.arr.length;

            let ts = parseInt(new Date().getTime() / 1000 + '')

            cc.sys.localStorage.setItem('CLEARTS' + GameCfg.GameType, ts);

            this.label.string = 0.00 + '%';
            this.label.node.color = cc.Color.WHITE;

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
