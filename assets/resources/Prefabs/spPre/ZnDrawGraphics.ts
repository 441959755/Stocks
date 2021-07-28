import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import DrawUtils from "../../../sctiprs/Utils/DrawUtils";
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

    onLoad() {
        GlobalEvent.on('onDraw', (arr) => {
            if (!arr || arr.length == 0) { return };
            this.viewData = arr;
            this.MaList = DrawData.MaList;
            this.initDrawBg();
        }, this);
    }

    initDrawBg() {
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
        this.part1.string = this.topValue.toFixed(2) + '';
        this.part2.string = (this.bottomValue + this.disValue / 4 * 3).toFixed(2);
        this.part3.string = (this.bottomValue + this.disValue / 4 * 2).toFixed(2);
        this.part4.string = (this.bottomValue + this.disValue / 4 * 1).toFixed(2);
        this.part5.string = this.bottomValue.toFixed(2);

        for (let index = GameCfg.beg_end[0]; index < GameCfg.beg_end[1]; index++) {

            this.onDrawCandle(viweData[index], index);

            this.onDrawMA(index);
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

        let initY = 0;
        let drawBox = this.drawBg.node.height;
        let some = index - GameCfg.beg_end[0];
        let startX = some == 0 ? 10 : 10 + (some * GameCfg.hz_width);
        let endX = 10 + ((some + 1) * GameCfg.hz_width);
        //根据区间价格决定坐标
        let openValue = (el.open - this.bottomValue);
        let openY = openValue / this.disValue * drawBox + initY;
        let closeValue = (el.close - this.bottomValue)
        let closeY = closeValue / this.disValue * drawBox + initY;

        let maxY, minY;
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
            let highY = (el.high - this.bottomValue) / this.disValue * drawBox + initY;
            let highX = startX + (endX - startX) / 2 - 2.5;
            let hy = openY > closeY ? openY : closeY;
            this.drawLine(this.drawBg, highX, highY, highX, hy);
            posInfo.highPos = cc.v2(highX, highY);
        }
        //画最低
        if (el.low <= lowPrice) {
            let lowY = (el.low - this.bottomValue) / this.disValue * drawBox + initY;
            let lowX = startX + (endX - startX) / 2 - 2.5;
            let hy = openY < closeY ? openY : closeY;
            this.drawLine(this.drawBg, lowX, lowY, lowX, hy);
            posInfo.lowPos = cc.v2(lowX, lowY);
        }

    }

    onDrawMA(index) {
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
        GlobalEvent.off('onDraw');
    }
}
