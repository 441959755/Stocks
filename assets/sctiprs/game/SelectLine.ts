import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
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

    beg = 0;

    end = 0;

    to = null;

    onDisable() {
        this._selectID = 0;
        this._preSelectID = 0;
        this.qhData = null;
        this.huizhidatas = 0;
        this.beg = 0;
        this.end = 0;
        this.to = null;
    }

    onLoad() {

        GlobalEvent.on('recover', () => {
            if (this.qhData && this.qhData.data.length > 0) {
                GameCfg.data[0].data = this.qhData.data;
            }
            if (this.huizhidatas) {
                GameCfg.huizhidatas = this.huizhidatas;
            }
        }, this);
    }

    protected onDestroy() {
        GlobalEvent.off('recover');
    }

    onEnable() {
        if (GameCfg.enterGameCache.ktype == pb.KType.Min5) {
            this._selectID = 0;
        }

        else if (GameCfg.enterGameCache.ktype == pb.KType.Min15) {
            this._selectID = 1;
        }

        else if (GameCfg.enterGameCache.ktype == pb.KType.Min30) {
            this._selectID = 2;
        }

        else if (GameCfg.enterGameCache.ktype == pb.KType.Min60) {
            this._selectID = 3;
        }

        else if (GameCfg.enterGameCache.ktype == pb.KType.Day) {
            this._selectID = 4;
        }

        this._preSelectID = this._selectID;
        let str = JSON.stringify(GameCfg.data[0])
        this.qhData = JSON.parse(str);

        this.hideAllNode();
        let nodes = this.AllNode[this._selectID].children;
        this.AllNode[this._selectID].color = new cc.Color().fromHEX('#e94343');
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
        GameCfg.hz_width = 15;
        DrawData.initData(data);
        GlobalEvent.emit('onQHDraw');
    }

    onSaveData() {
        if (GameCfg.huizhidatas < this.huizhidatas) {
            return;
        }
        this.beg = JSON.parse(JSON.stringify(GameCfg.beg_end[0]));
        this.end = JSON.parse(JSON.stringify(GameCfg.beg_end[1]));
        this.huizhidatas = JSON.parse(JSON.stringify(GameCfg.huizhidatas));
    }


    onGetData(type, id) {

        let tt = this.huizhidatas - 1;

        if (GameCfg.GAMEFUPAN) {
            tt = GameCfg.huizhidatas - 1;
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

        total = 100;

        to = time;

        let t = 0;

        if (type <= 3) {
            ktype = pb.KType.Min5;

            total *= 12;

            to += 24 * 60 * 60;

        } else if (type == 4) {

            ktype = pb.KType.Day;

            to = ComUtils.fromatTime1(to);

            if (DrawDatas.arrDay.length > 0 && DrawDatas.arrDay[DrawDatas.arrDay.length - 1].day == to) {
                this.onChanageType(id);
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }

        } else if (type == 5) {

            ktype = pb.KType.Day7;

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

            info.items.forEach(el => {

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
            this.AllNode[0].color = new cc.Color().fromHEX('#e94343');
            GameCfg.selectZline = pb.KType.Min5;
            nodes[0].active = true;

            this.onBlackDrawLine(0);
        }
        else if (name == 'btn15min') {
            if (this.AllNode[1].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[1].children;
            this.AllNode[1].color = new cc.Color().fromHEX('#e94343');
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(1);
        }

        else if (name == 'btn30min') {
            if (this.AllNode[2].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[2].children;
            this.AllNode[2].color = new cc.Color().fromHEX('#e94343');
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(2);
        }

        else if (name == 'btn60min') {
            if (this.AllNode[3].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[3].children;
            this.AllNode[3].color = new cc.Color().fromHEX('#e94343');
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Min5;
            this.onBlackDrawLine(3);
        }

        else if (name == 'btn1day') {
            if (this.AllNode[4].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[4].children;
            this.AllNode[4].color = new cc.Color().fromHEX('#e94343');
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Day;
            this.onBlackDrawLine(4);
        }

        else if (name == 'btn7day') {
            if (this.AllNode[5].children[0].active == true) {
                return;
            }
            let nodes = this.AllNode[5].children;
            this.AllNode[5].color = new cc.Color().fromHEX('#e94343');
            nodes[0].active = true;
            GameCfg.selectZline = pb.KType.Day7;
            this.onBlackDrawLine(5);
        }

    }

    onBlackDrawLine(id) {

        if (GameCfg.enterGameCache.ktype == pb.KType.Min5 ||
            GameCfg.enterGameCache.ktype == pb.KType.Min15 ||
            GameCfg.enterGameCache.ktype == pb.KType.Min30 ||
            GameCfg.enterGameCache.ktype == pb.KType.Min60) {

            if (this._selectID == id) {
                this.onGoBlackGame();
            } else {

                if (this._preSelectID == this._selectID) {
                    this.onSaveData();
                }

                if (id >= 4) {
                    this.onGetData(4, id);
                }
                else {
                    this.onChanageType(id);
                }

            }
        } else if (GameCfg.enterGameCache.ktype == pb.KType.Day) {
            if (this._selectID == id) {

                this.onGoBlackGame();
            } else {
                if (this._preSelectID == this._selectID) {
                    this.onSaveData();
                }

                if (id < 4) {
                    this.onGetData(0, id);
                }
                else {
                    this.onChanageType(id);
                }
            }
        }

        this._preSelectID = id;
    }


    onGoBlackGame() {

        GameCfg.beg_end[0] = this.beg;
        GameCfg.beg_end[1] = this.end;

        GameCfg.huizhidatas = this.huizhidatas;

        GlobalEvent.emit(EventCfg.FILLNODEISSHOW, true);

        this.onDrawEvetn(this.qhData.data);

        GlobalEvent.emit('HIDEBOTTOMNODE', true);

        GlobalEvent.emit(EventCfg.ADDMARKHIDEORSHOW, true);

    }

    onChanageType(id) {
        let le;
        let dataArr = [];

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

        GameCfg.beg_end[0] = 0;
        GameCfg.beg_end[1] = dataArr.length;
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