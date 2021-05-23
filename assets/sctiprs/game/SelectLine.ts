import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameData from '../GameData';
import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import ComUtils from '../Utils/ComUtils';
import DrawDatas from './DrawData';
import DrawData from './DrawData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    AllNode: cc.Node[] = [];

    _selectID = 0;

    _preSelectID = 0;

    qhData = null;

    huizhidatas = 0;

    //    saveTime = null;

    beg = 0;

    end = 0;

    to = null;

    onLoad() {
        if (GameCfg.GameSet.ZKine == '5分钟K') {
            this._selectID = 0;
        }
        else if (GameCfg.GameSet.ZLine == '15分钟K') {
            this._selectID = 1;
        }
        else if (GameCfg.GameSet.ZLine == '30分钟K') {
            this._selectID = 2;
        }
        else if (GameCfg.GameSet.ZLine == '60分钟K') {
            this._selectID = 3;
        }
        else if (GameCfg.GameSet.ZLine == '日线') {
            this._selectID = 4;
        }

        this._preSelectID = this._selectID;

        GlobalEvent.on(EventCfg.GAMEOVEER, () => {
            // this.node.active = false;

            if (this.qhData && this.qhData.data.length > 0) {
                GameCfg.data[0].data = this.qhData.data;

            }
            if (this._selectID != this._preSelectID) {
                GameCfg.huizhidatas = this.huizhidatas;
            }

        }, this);
    }

    start() {
        let str = JSON.stringify(GameCfg.data[0])
        this.qhData = JSON.parse(str);
    }

    onEnable() {
        this.hideAllNode();
        let nodes = this.AllNode[this._selectID].children;
        this.AllNode[this._selectID].color = cc.Color.RED;
        nodes.forEach(e => {
            e.active = true;
        })
    }

    hideAllNode() {
        this.AllNode.forEach((el, index) => {
            el.color = cc.Color.WHITE;
            let nodes = el.children;
            nodes[0].active = false;
            if (index != this._selectID) {
                nodes[1].active = false;
            }
        })
    }

    onDrawEvetn(data) {
        GameCfg.data[0].data = data;
        GlobalEvent.emit('onQHDraw');
    }

    onSaveData() {
        if (GameCfg.huizhidatas < this.huizhidatas) {
            return;
        }
        this.beg = JSON.parse(JSON.stringify(cc.ext.beg_end[0]));
        this.end = JSON.parse(JSON.stringify(cc.ext.beg_end[1]));
        this.huizhidatas = JSON.parse(JSON.stringify(GameCfg.huizhidatas));
    }


    onGetData(type, id) {

        let tt = this.huizhidatas;
        //   this.saveTime = this.qhData.data[tt].day;
        if (GameCfg.GAMEFUPAN) {
            tt = GameCfg.history.huizhidatas;
            //    this.saveTime = this.qhData.data[tt].day;
        }

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let time;
        if ((this.qhData.data[tt].day + '').length < 10) {
            time = this.qhData.data[tt].day + '';
            let year = time.slice(0, 4);
            let month = time.slice(4, 6);
            let day = time.slice(6);
            time = new Date(year + '-' + month + '-' + day).getTime() / 1000;
        } else {
            time = this.qhData.data[tt].day;
        }
        let ktype, code, from, total, to;
        code = this.qhData.code;
        total = 40;
        to = time;
        let t = 0;
        if (type <= 3) {
            ktype = pb.KType.Min5;
            //  GameCfg.GameSet.ktype = pb.KType.Min5;
            // if (type == 0) {
            //     from = time - 40 * 60 * 5;
            // } else if (type == 1) {
            //     from = time - 40 * 60 * 15;
            //     // total *= 3;
            //     t = 3;
            // } else if (type == 2) {
            //     from = time - 40 * 60 * 30;

            //     t = 6;
            //     total *= 6;
            // } else if (type == 3) {
            //     from = time - 40 * 60 * 60;
            //     total *= 12;
            //     t = 12;
            // }
            total *= 40;
            to += 24 * 60 * 60;
        } else if (type == 4) {
            ktype = pb.KType.Day;
            //  GameCfg.GameSet.ktype = pb.KType.Day;
            let f = new Date((time - 40 * 24 * 60 * 60) * 1000);
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
            from = ye + '' + mon + '' + da;
            to = ComUtils.fromatTime1(to);
        } else if (type == 5) {
            ktype = pb.KType.Day7;
            //  GameCfg.GameSet.ktype = pb.KType.Day7;
            let f = new Date((time - 40 * 24 * 60 * 60 * 7) * 1000);
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
            from = ye + '' + mon + '' + da;
            to = ComUtils.fromatTime1(to);
        }
        let data = {
            ktype: ktype,
            code: code,
            from: 0,
            total: total,
            to: to,
        }
        this.to = to;
        console.log(JSON.stringify(data));
        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data), info => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GameCfg.data[0].data = [];
            //  console.log(info.items.length);
            info.items.forEach(el => {
                // {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
                let data = {
                    day: el.timestamp,
                    open: el.open,
                    close: el.close,
                    high: el.high,
                    low: el.low,
                    value: el.volume,
                    ccl_hold: el.cclHold,
                };
                GameCfg.data[0].data.push(data);
            });

            if (type <= 3) {
                DrawDatas.arrMin5 = GameCfg.data[0].data;
            } else if (type >= 4) {
                DrawDatas.arrDay = GameCfg.data[0].data;
            }
            this.onChanageType(id);
            // if (type == 4 || type == 0) {

            // }
            //  else {
            //     for (let index = 0; index < info.items.length;) {
            //         if (index + t - 1 < info.items.length) {
            //             let el = info.items[index];
            //             let day = el.timestamp;
            //             let open = el.open;
            //             let close = info.items[index + t - 1].close;

            //             let high = 0, low = el.low, volume = 0;
            //             for (let i = 0; i < t; i++) {
            //                 if (info.items[index + i].high >= high) {
            //                     high = info.items[index + i].high;
            //                 }

            //                 if (info.items[index + i].low <= low) {
            //                     low = info.items[index + i].low;
            //                 }

            //                 volume += info.items[index + i].volume;

            //             }
            //             let data = {
            //                 day: day,
            //                 open: open,
            //                 close: close,
            //                 high: high,
            //                 low: low,
            //                 value: volume,
            //                 ccl_hold: el.cclHold,
            //             }
            //             GameCfg.data[0].data.push(data);
            //             index += t;
            //         } else {
            //             break;
            //         }
            //     }
            // }
            // cc.ext.beg_end[0] = 0;
            // cc.ext.beg_end[1] = GameCfg.data[0].data.length;
            // GameCfg.huizhidatas = GameCfg.data[0].data.length;
            // this.onDrawEvetn(GameCfg.data[0].data);
        });

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        this.hideAllNode()
        if (name == 'btn5min') {
            if (this.AllNode[0].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[0].children;
            this.AllNode[0].color = cc.Color.RED;
            GameCfg.selectZline = pb.KType.Min5;
            nodes[0].active = true;

            this.onBlackDrawLine(0);
        }
        else if (name == 'btn15min') {
            if (this.AllNode[1].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[1].children;
            this.AllNode[1].color = cc.Color.RED;
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(1);
        }

        else if (name == 'btn30min') {
            if (this.AllNode[2].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[2].children;
            this.AllNode[2].color = cc.Color.RED;
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(2);
        }

        else if (name == 'btn60min') {
            if (this.AllNode[3].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[3].children;
            this.AllNode[3].color = cc.Color.RED;
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(3);
        }

        else if (name == 'btn1day') {
            if (this.AllNode[4].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[4].children;
            this.AllNode[4].color = cc.Color.RED;
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Day;
            this.onBlackDrawLine(4);
        }

        else if (name == 'btn7day') {
            if (this.AllNode[5].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[5].children;
            this.AllNode[5].color = cc.Color.RED;
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Day7;
            this.onBlackDrawLine(5);
        }

    }

    onBlackDrawLine(id) {

        if (GameCfg.GameSet.ZLine == '5分钟K' || GameCfg.GameSet.ZLine == '15分钟K' || GameCfg.GameSet.ZLine == '30分钟K' || GameCfg.GameSet.ZLine == '60分钟K') {
            if (this._selectID == id) {
                this.onGoBlackGame();
            } else {
                if (this._preSelectID == this._selectID) {
                    this.onSaveData();
                }

                if (id >= 4) {
                    if (DrawData.arrDay.length <= 0) {

                        this.onGetData(4, id);
                    } else {

                        this.onChanageType(id);
                    }
                }
                else {

                    this.onChanageType(id);
                }
            }
        } else if (GameData.QHSet.ZLine == '日线') {
            if (this._selectID == id) {

                this.onGoBlackGame();
            } else {
                if (this._preSelectID == this._selectID) {
                    this.onSaveData();
                }

                if (id < 4) {

                    if (DrawData.arrMin5.length <= 0) {

                        this.onGetData(0, id);
                    } else {

                        this.onChanageType(id);
                    }
                }
                else {

                    this.onChanageType(id);
                }
            }
        }

        this._preSelectID = id;
    }


    onDestroy() {
        //  GlobalEvent.off(EventCfg.GAMEOVEER);
    }

    onGoBlackGame() {
        cc.ext.beg_end[0] = this.beg;
        cc.ext.beg_end[1] = this.end;
        GameCfg.huizhidatas = this.huizhidatas;
        this.onDrawEvetn(this.qhData.data);
        GlobalEvent.emit('HIDEBOTTOMNODE', true);
        GlobalEvent.emit(EventCfg.ADDMARKHIDEORSHOW, true);
        GlobalEvent.emit(EventCfg.FILLNODEISSHOW, true);
    }

    onChanageType(id) {
        let le;
        let dataArr = [];
        // if (this.huizhidatas >= DrawDatas.arrMin5.length) {
        //     le = DrawDatas.arrMin5.length - 1;

        // } else {
        //     le = this.huizhidatas;
        // }
        let to = this.qhData.data[this.huizhidatas - 1].day;
        if (id == 0) {
            //  dataArr = DrawDatas.dataChange(this.qhData.data[le].day, 1, DrawDatas.arrMin5);
            dataArr = DrawDatas.getTimeSlotData(to, 50, DrawDatas.arrMin5);
        } else if (id == 1) {
            dataArr = DrawDatas.dataChange(to, 3, DrawDatas.arrMin5);
        } else if (id == 2) {
            dataArr = DrawDatas.dataChange(to, 6, DrawDatas.arrMin5);
        } else if (id == 3) {
            dataArr = DrawDatas.dataChange(to, 12, DrawDatas.arrMin5);
        } else if (id == 4) {
            // dataArr = DrawDatas.arrDay;
            dataArr = DrawDatas.getTimeSlotData(to, 50, DrawDatas.arrDay);
        } else if (id == 5) {
            if (this.huizhidatas >= DrawDatas.arrDay.length) {
                le = DrawDatas.arrDay.length - 1;

            } else {
                le = this.huizhidatas;
            }
            dataArr = DrawDatas.dataChange(to, 5, DrawDatas.arrDay);
        }
        if (dataArr.length > 50) {
            dataArr = dataArr.slice(dataArr.length - 51);
        }

        cc.ext.beg_end[0] = 0;
        cc.ext.beg_end[1] = dataArr.length;
        GameCfg.huizhidatas = dataArr.length;

        this.onDrawEvetn(dataArr);
        let flag = false;
        if (this._selectID == id) {
            flag = true;
        }

        GlobalEvent.emit('HIDEBOTTOMNODE', flag);
        GlobalEvent.emit(EventCfg.ADDMARKHIDEORSHOW, flag);
        GlobalEvent.emit(EventCfg.FILLNODEISSHOW, flag);
    }

}