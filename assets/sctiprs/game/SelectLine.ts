import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameData from '../GameData';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    AllNode: cc.Node[] = [];

    _selectID = 0;

    qhData = null;

    huizhidatas = 0;

    beg = 0;

    end = 0;

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
    }

    start() {
        this.qhData = GameCfg.data[0];
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
        this.beg = cc.ext.beg_end[0];
        this.end = cc.ext.beg_end[1];
        this.huizhidatas = GameCfg.huizhidatas;

    }


    onGetData(type) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let time;
        if ((this.qhData.data[this.huizhidatas - 1].day + '').length < 10) {
            time = this.qhData.data[this.huizhidatas - 1].day;
            let year = time.slice(0, 4);
            let month = time.slice(4, 6);
            let day = time.slice(6);
            time = new Date(year + '-' + month + '-' + day);
        } else {
            time = this.qhData.data[this.huizhidatas - 1].day;
        }
        let ktype, code, from, total, to;
        code = this.qhData.code;
        total = 50;
        to = 0;
        let t = 0;
        if (type <= 3) {
            ktype = pb.KType.Min5;
            if (type == 0) {
                from = time - 50 * 60 * 5;
            } else if (type == 1) {
                from = time - 50 * 60 * 15;
                total *= 3;
                t = 3;
            } else if (type == 2) {
                from = time - 50 * 60 * 30;
                total *= 6;
                t = 6;
            } else if (type == 3) {
                from = time - 50 * 60 * 60;
                total *= 12;
                t = 12;
            }

        } else if (type == 4) {
            ktype = pb.KType.Day;
            let f = new Date(time - 50 * 24 * 60 * 60);
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
            from = ye + '' + mon + '' + da;
        } else if (type == 5) {
            ktype = pb.KType.Day7;

            let f = new Date(time - 50 * 24 * 60 * 60 * 7);
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
            from = ye + '' + mon + '' + da;
        }
        let data = {
            ktype: ktype,
            code: code,
            from: from,
            total: total,
            to: to,
        }
        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data), info => {
            console.log(JSON.stringify(info));
            if (type == 4 || type == 0 || type == 5) {
                info.items.forEach(el => {
                    // {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
                    let data = {
                        day: el.timestamp,
                        open: el.open,
                        close: el.close,
                        high: el.high,
                        low: el.low,
                        value: el.volume,
                    };
                    GameCfg.data[0].data.push(data);
                });
            } else {
                for (let index = 0; index < info.items.length;) {
                    if (index + t - 1 < info.items.length) {
                        let el = info.items[index];
                        let day = el.timestamp;
                        let open = el.open;
                        let close = info.items[index + t - 1].close;

                        let high = 0, low = el.low, volume = 0;
                        for (let i = 0; i < t; i++) {
                            if (info.items[index + i].high >= high) {
                                high = info.items[index + i].high;
                            }

                            if (info.items[index + i].low <= low) {
                                low = info.items[index + i].low;
                            }

                            volume += info.items[index + i].volume;

                        }
                        let data = {
                            day: day,
                            open: open,
                            close: close,
                            high: high,
                            low: low,
                            value: volume,
                        }
                        GameCfg.data[0].data.push(data);
                        index += t;
                    } else {
                        break;
                    }
                }
            }
            cc.ext.beg_end[0] = 0;
            cc.ext.beg_end[1] = GameCfg.data[0].data.length;
            GameCfg.huizhidatas = GameCfg.data[0].data.length;
            this.onDrawEvetn(GameCfg.data[0].data);
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
            nodes[0].active = true;

            if (this._selectID == 0) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);

            } else {
                this.onSaveData();
                this.onGetData(0);
            }
        }
        else if (name == 'btn15min') {
            if (this.AllNode[1].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[1].children;
            this.AllNode[1].color = cc.Color.RED;
            nodes[0].active = true;

            if (this._selectID == 1) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);
            } else {
                this.onSaveData();
                this.onGetData(1);
            }
        }

        else if (name == 'btn30min') {
            if (this.AllNode[2].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[2].children;
            this.AllNode[2].color = cc.Color.RED;
            nodes[0].active = true;

            if (this._selectID == 2) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);
            } else {
                this.onSaveData();
                this.onGetData(2);
            }
        }

        else if (name == 'btn60min') {
            if (this.AllNode[3].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[3].children;
            this.AllNode[3].color = cc.Color.RED;
            nodes[0].active = true;

            if (this._selectID == 3) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);
            } else {
                this.onSaveData();
                this.onGetData(3);
            }
        }

        else if (name == 'btn1day') {
            if (this.AllNode[4].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[4].children;
            this.AllNode[4].color = cc.Color.RED;
            nodes[0].active = true;

            if (this._selectID == 4) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);
            } else {
                this.onSaveData();
                this.onGetData(4);
            }
        }

        else if (name == 'btn7day') {
            if (this.AllNode[5].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[5].children;
            this.AllNode[5].color = cc.Color.RED;
            nodes[0].active = true;

            if (this._selectID == 5) {
                cc.ext.beg_end[0] = this.beg;
                cc.ext.beg_end[1] = this.end;
                GameCfg.huizhidatas = this.huizhidatas;
                this.onDrawEvetn(this.qhData);
            } else {
                this.onSaveData();
                this.onGetData(5);
            }
        }
    }
}
