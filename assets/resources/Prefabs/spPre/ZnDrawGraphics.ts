import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import DrawUtils from "../../../sctiprs/Utils/DrawUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    drawBg: cc.Graphics = null;

    @property(cc.Graphics)
    drawMA: cc.Graphics = null;

    topValue = 0;     //当前绘制的最高值

    bottomValue = 0;  //当前绘制最低值

    viewData = null;

    disValue = 0;       //当前绘制的最高值-当前绘制最低值

    @property(cc.Label)
    part1: cc.Label = null;  //分线1

    @property(cc.Label)
    part2: cc.Label = null;  //分线2

    @property(cc.Label)
    part3: cc.Label = null;  //分线3

    @property(cc.Label)
    part4: cc.Label = null;  //分线4

    @property(cc.Label)
    part5: cc.Label = null;  //分线5

    sign = false;

    MaList = [];
    MinMaList = [];

    ktype = null;

    prePointX = null;

    prePointY = null;

    prePoint1Y = null;

    @property([cc.Label])
    timelas: cc.Label[] = [];

    onEnable() {
        GlobalEvent.on('onDrawGrap', (arr, ktype) => {
            ktype && (this.ktype = ktype)
            arr && (this.viewData = arr)
            this.initDrawBg();
        }, this);
    }

    initDrawBg() {
        if (GameCfg.beg_end[1] < 0 || GameCfg.beg_end[0] > GameCfg.beg_end[1]) {
            console.log(' GameCfg.beg_end[0]:' + GameCfg.beg_end[0]);
            console.log(' GameCfg.beg_end[1]:' + GameCfg.beg_end[1]);
            return;
        }
        if (GameCfg.beg_end[0] < 0 || GameCfg.beg_end[1] > this.viewData.length) {
            console.log(' GameCfg.beg_end[0]:' + GameCfg.beg_end[0]);
            console.log(' GameCfg.beg_end[1]:' + GameCfg.beg_end[1]);
            return;
        }

        this.MaList = DrawData.MaList;
        this.MinMaList = DrawData.MinMaList;
        this.drawBg.clear();
        this.drawMA.clear();

        this.drawBg.lineWidth = 2;
        this.drawMA.lineWidth = 2;

        let viweData = this.viewData;
        this.bottomValue = viweData[GameCfg.beg_end[0]].low;
        this.topValue = 0;

        for (let i = GameCfg.beg_end[0]; i < GameCfg.beg_end[1]; i++) {
            this.topValue = Math.max(this.topValue, viweData[i].high);     //最高价
            this.bottomValue = Math.min(this.bottomValue, viweData[i].low); //最低价
        }

        this.disValue = this.topValue - this.bottomValue;
        this.part5.string = this.topValue.toFixed(2) + '';
        this.part4.string = (this.bottomValue + this.disValue / 4 * 3).toFixed(2);
        this.part3.string = (this.bottomValue + this.disValue / 4 * 2).toFixed(2);
        this.part2.string = (this.bottomValue + this.disValue / 4 * 1).toFixed(2);
        this.part1.string = this.bottomValue.toFixed(2);

        for (let index = GameCfg.beg_end[0]; index < GameCfg.beg_end[1]; index++) {

            this.onDrawCandle(viweData[index], index);

            this.onDrawMA(index);
        }

        this.setTiemNode();
    }

    setTiemNode() {
        if (this.ktype == pb.KType.Min) {
            let arr = ['09:30', '10:30', '11:30/13:00', '14:00', '15:00'];
            this.timelas.forEach((el, index) => {
                el.string = arr[index];
            })
        }
        else if (this.ktype == pb.KType.Day) {
            let c = Math.floor((GameCfg.beg_end[1] - GameCfg.beg_end[0]) / 4);
            let arr = [];
            arr[0] = this.viewData[GameCfg.beg_end[0]].day;
            arr[4] = this.viewData[GameCfg.beg_end[1] - 1].day;
            arr[1] = this.viewData[GameCfg.beg_end[0] + c].day;
            arr[2] = this.viewData[GameCfg.beg_end[0] + c * 2].day;
            arr[3] = this.viewData[GameCfg.beg_end[0] + c * 3].day;
            this.timelas.forEach((el, index) => {
                el.string = ComUtils.formatTime(arr[index]);
            })
        }
    }

    //绘制蜡烛线 曲线 、宝塔线
    onDrawCandle(el, index) {
        //最高点最低点
        let posInfo = {
            highPos: null,
            lowPos: null,
            index: index,
        }
        let drawBox = this.drawBg.node.height;
        let some = index - (GameCfg.beg_end[0]);
        let startX = (some * GameCfg.hz_width);
        let endX = ((some + 1) * GameCfg.hz_width);
        //根据区间价格决定坐标
        let openValue = (el.open - this.bottomValue);
        let openY = openValue / this.disValue * drawBox;
        let closeValue = (el.close - this.bottomValue)
        let closeY = closeValue / this.disValue * drawBox;

        if (this.ktype == pb.KType.Min) {
            GameCfg.hz_width = this.node.width / 240;
            if (index == 0) {
                this.prePointX = (some * GameCfg.hz_width);
                this.prePointY = (el.close - this.bottomValue) / this.disValue * drawBox;
                this.prePoint1Y = this.prePointY;
            }
            else {
                let x = ((some + 1) * GameCfg.hz_width);
                let y = (el.close - this.bottomValue) / this.disValue * drawBox;
                //   this.drawBg.lineWidth = width;
                DrawUtils.drawMinLineFill(this.drawBg, this.prePointX, this.prePointY, x, y);
                //    this.drawBg.lineWidth = width;
                this.drawBg.strokeColor = cc.Color.WHITE;
                this.drawLine(this.drawBg, this.prePointX, this.prePointY, x, y);


                let y1 = (this.MinMaList[index] - this.bottomValue) / this.disValue * drawBox;

                this.drawMA.strokeColor = new cc.Color().fromHEX('#e94343');
                this.drawLine(this.drawMA, this.prePointX, this.prePoint1Y, x, y1);
                this.prePoint1Y = y1;
                this.prePointX = x;
                this.prePointY = y;
            }
        }
        else {
            //判断颜色
            // let hz_color;
            //没涨没跌
            let lowPrice, highPrice;
            if (el.open == el.close) {
                this.drawBg.strokeColor = GameCfg.HZ_white;
                this.drawLine(this.drawBg, startX + 2, openY, endX, openY);
                lowPrice = el.open;
                highPrice = el.open;
            }
            //跌了
            else {
                let hy, by;
                if (el.open > el.close) {
                    lowPrice = el.close;
                    highPrice = el.open;
                    hy = openY;
                    by = closeY;

                }
                //涨了
                else if (el.open < el.close) {
                    lowPrice = el.open;
                    highPrice = el.close;
                    hy = closeY;
                    by = openY;

                }
                let flag = el.open > el.close;
                this.sign = this.getRaisingLimit(index);
                this.drawRect(this.drawBg, startX, by, endX - startX, hy - by, flag);
            }

            //画最高价、
            if (el.high >= highPrice) {
                let highY = (el.high - this.bottomValue) / this.disValue * drawBox;
                let highX = startX + (endX - startX) / 2 - 2.5;
                let hy = openY > closeY ? openY : closeY;
                this.drawLine(this.drawBg, highX, highY, highX, hy);
                posInfo.highPos = cc.v2(highX, highY);
            }
            //画最低
            if (el.low <= lowPrice) {
                let lowY = (el.low - this.bottomValue) / this.disValue * drawBox;
                let lowX = startX + (endX - startX) / 2 - 2.5;
                let hy = openY < closeY ? openY : closeY;
                this.drawLine(this.drawBg, lowX, lowY, lowX, hy);
                posInfo.lowPos = cc.v2(lowX, lowY);
            }
            GlobalEvent.emit(EventCfg.ONMARKUPDATE, posInfo);
        }

    }

    onDrawMA(index) {

        if (this.ktype == pb.KType.Min) {
            return;
        }

        if (!this.MaList[index]) {
            return;
        }
        let drawBox = this.drawMA.node.height, initY = 0, madata = 0;
        //每段数据绘制
        for (let i = 0; i < GameCfg.MAs.length; i++) {

            if (index >= GameCfg.MAs[i]) {
                //平均的位置
                let preMAY = (this.MaList[index - 1][i] - this.bottomValue) / this.disValue * drawBox + initY;
                let preMAX = 10 + ((index - 1 - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

                let MAY = (this.MaList[index][i] - this.bottomValue) / this.disValue * drawBox + initY;
                let MAX = 10 + ((index - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

                this.drawMA.strokeColor = GameCfg.MAColor[i];
                this.drawLine(this.drawMA, preMAX, preMAY, MAX, MAY, i);

            }
        }
    }

    //画线
    drawLine(ctx, sX, sY, eX, eY, falg?) {
        DrawUtils.drawLine(ctx, sX, sY, eX, eY, falg);
    }

    //画框
    drawRect(ctx, x, y, w, h, flag?) {
        let col;
        if (flag) {
            if (GameCfg.GameSet.isBW) {
                col = new cc.Color().fromHEX('#54ffff');
            } else {
                col = new cc.Color().fromHEX('#00BA50');
            }

            if (this.sign) {
                if (GameCfg.GameSet.isBW) {
                    col = new cc.Color().fromHEX('#3972F6');
                } else {
                    col = new cc.Color().fromHEX('#2B8917');
                }
            }

            ctx.strokeColor = col;
        } else if (flag != undefined) {
            if (GameCfg.GameSet.isBW) {
                col = new cc.Color().fromHEX('#ea233b');
            } else {
                col = new cc.Color().fromHEX('#e2233e');
            }
            ctx.strokeColor = col;

            if (GameCfg.GameSet.line != '宝塔线' && !this.sign) {
                col = null;
            }
        }

        DrawUtils.drawRect(ctx, x, y, w - 5, h, col);

    }

    //获取涨停板
    getRaisingLimit(index) {
        let falg = DrawData.getRaisingLimit(index);
        return !!falg;
    }

    onDisable() {
        this.drawBg.clear();
        this.drawMA.clear();
        GlobalEvent.off('onDrawGrap');
    }
}
