import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/GameCfg";
import DrawUtils from "../../../sctiprs/Utils/DrawUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    draw1: cc.Graphics = null;

    @property(cc.Graphics)
    drawMA: cc.Graphics = null;


    @property(cc.Graphics)
    drawVol: cc.Graphics = null;

    @property(cc.Graphics)
    drawPCM: cc.Graphics = null;



    @property([cc.Label])
    labels: cc.Label[] = [];

    @property(cc.Label)
    vol: cc.Label = null;

    viewData = null;

    MaList = null;

    MinMaList = null;

    bottomValue = null;

    topValue = null;

    disValue = null;

    prePointX = null;

    prePointY = null;

    prePoint1Y = null;

    topVol = 0;
    bottomVol = 0;

    VolList = null;

    autoCallback = null;

    onLoad() {
        GlobalEvent.on(EventCfg.ADDFILLCOLOR, this.drawFillColor.bind(this), this);
    }

    onEnable() {
        this.viewData = GameCfg.data[0].data;
        DrawData.initData(this.viewData);

        this.MaList = DrawData.MaList;
        this.MinMaList = DrawData.MinMaList;
        this.VolList = DrawData.VolList;

        this.draw1.lineWidth = 0;
        this.drawMA.lineWidth = 2;
        this.drawPCM.lineWidth = 2;
        this.drawVol.lineWidth = 2;
        this.initDrawBg();
        this.autoCallback = null;
    }

    drawFillColor() {
        if (GameCfg.GameType != pb.GameType.FenShi) { return }
        GameCfg.huizhidatas += 1;
        GameCfg.beg_end[1] = GameCfg.huizhidatas;

        if (GameCfg.huizhidatas >= GameCfg.data[0].data.length) {
            GameCfg.huizhidatas = GameCfg.data[0].data.length;
        }
        this.vol.string = 'VOL(5,10)' + GameCfg.data[0].data[GameCfg.huizhidatas - 1].value;
        this.initDrawBg();
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
        this.draw1.clear();
        this.drawMA.clear();
        this.drawPCM.clear();
        this.drawVol.clear();
        let viewData = this.viewData;
        this.bottomValue = viewData[0].low;
        this.topValue = 0;

        this.topVol = 0;

        let zs = viewData[0].zs;

        for (let i = 0; i < viewData.length; i++) {
            this.topValue = Math.max(this.topValue, viewData[i].high);
            this.bottomValue = Math.min(this.bottomValue, viewData[i].low);

            this.topVol = Math.max(this.topVol, viewData[i].value);
            this.bottomVol = Math.min(this.bottomVol, viewData[i].value);
        }


        this.disValue = Math.abs(this.topValue - zs) > Math.abs(zs - this.bottomValue) ? Math.abs(this.topValue - zs) :
            Math.abs(zs - this.bottomValue);

        this.labels[4].string = (zs + this.disValue).toFixed(2) + '';
        this.labels[3].string = (zs + this.disValue / 2).toFixed(2);
        this.labels[2].string = (zs).toFixed(2);
        this.labels[1].string = (zs - this.disValue / 2).toFixed(2);
        this.labels[0].string = (zs - this.disValue).toFixed(2);

        this.labels[5].string = ((parseFloat(this.labels[0].string) - zs) / zs * 100).toFixed(2) + '%';
        this.labels[6].string = ((parseFloat(this.labels[1].string) - zs) / zs * 100).toFixed(2) + '%';
        this.labels[7].string = ((parseFloat(this.labels[2].string) - zs) / zs * 100).toFixed(2) + '%';
        this.labels[8].string = ((parseFloat(this.labels[3].string) - zs) / zs * 100).toFixed(2) + '%';
        this.labels[9].string = ((parseFloat(this.labels[4].string) - zs) / zs * 100).toFixed(2) + '%';

        this.bottomValue = parseFloat(this.labels[0].string)
        this.disValue = this.topValue - this.bottomValue;

        for (let index = GameCfg.beg_end[0]; index < GameCfg.beg_end[1]; index++) {
            this.onDrawCandle(viewData[index], index);
            this.onDrawVol(viewData[index], index);
        }
    }


    onDrawCandle(el, index) {

        let drawBox = this.draw1.node.height;
        let some = index - (GameCfg.beg_end[0]);
        // let startX = (some * GameCfg.hz_width);
        // let endX = ((some + 1) * GameCfg.hz_width);
        //根据区间价格决定坐标
        let openValue = (el.open - this.bottomValue);
        let openY = openValue / this.disValue * drawBox;
        let closeValue = (el.close - this.bottomValue)
        let closeY = closeValue / this.disValue * drawBox;

        GameCfg.hz_width = this.draw1.node.width / this.viewData.length;

        if (index == 0) {
            this.prePointX = (some * GameCfg.hz_width);
            this.prePointY = (el.close - this.bottomValue) / this.disValue * drawBox;
            this.prePoint1Y = this.prePointY;
        }
        else {
            let x = ((some + 1) * GameCfg.hz_width);
            let y = (el.close - this.bottomValue) / this.disValue * drawBox;
            //   this.drawBg.lineWidth = width;
            DrawUtils.drawMinLineFill(this.draw1, this.prePointX, this.prePointY, x, y);
            //    this.drawBg.lineWidth = width;
            this.drawMA.strokeColor = cc.Color.WHITE;
            this.drawLine(this.drawMA, this.prePointX, this.prePointY, x, y);


            let y1 = (this.MinMaList[index] - this.bottomValue) / this.disValue * drawBox;

            this.drawMA.strokeColor = new cc.Color().fromHEX('#e94343');
            this.drawLine(this.drawMA, this.prePointX, this.prePoint1Y, x, y1);
            this.prePoint1Y = y1;
            this.prePointX = x;
            this.prePointY = y;
        }
    }

    //画线
    drawLine(ctx, sX, sY, eX, eY, falg?) {
        DrawUtils.drawLine(ctx, sX, sY, eX, eY, falg);
    }

    onDrawVol(el, index) {

        let width = this.drawVol.node.width / this.viewData.length;

        let some = index - GameCfg.beg_end[0];

        let x = (some * width) + width / 2;

        let y = el.value * (this.drawVol.node.height / this.topVol);

        if (index == 0) {
            if (el.open < el.close) {
                this.drawVol.strokeColor = cc.Color.RED;
            }
            else if (el.open == el.close) {
                this.drawVol.strokeColor = cc.Color.WHITE;
            }
            else if (el.open > el.close) {
                this.drawVol.strokeColor = cc.Color.GREEN;
            }
        }
        else {
            if (this.viewData[index - 1].close < el.close) {
                this.drawVol.strokeColor = cc.Color.RED;
            }
            else if (this.viewData[index - 1].close == el.close) {
                this.drawVol.strokeColor = cc.Color.WHITE;
            }
            else if (this.viewData[index - 1].close > el.close) {
                this.drawVol.strokeColor = cc.Color.GREEN;
            }
        }

        this.drawVol.lineWidth = width;

        DrawUtils.drawLine(this.drawVol, x, 0, x, y);

        let startX = (some * GameCfg.hz_width);
        let endX = ((some + 1) * GameCfg.hz_width);
        let hight = el.value * (this.drawVol.node.height / this.topVol);
        width = endX - startX;

        //均量线 白
        if (!this.VolList[index]) {
            return;
        }
        //每段数据绘制
        for (let i = 0; i < GameCfg.VOLGraph.length; i++) {
            if (index >= GameCfg.VOLGraph[i]) {
                let preY = this.VolList[index - 1][i] * (150 / this.topVol);
                let preX = ((some - 1) * GameCfg.hz_width) + width / 2
                //平均的位置
                let VOlPointY = this.VolList[index][i] * (150 / this.topVol);
                let VOlPointX = startX + width / 2;

                this.drawPCM.strokeColor = GameCfg.VOLColor[i];
                DrawUtils.drawLine(this.drawPCM, preX, preY, VOlPointX, VOlPointY);
            }
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.ADDFILLCOLOR);
    }

}
