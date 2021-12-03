import GlobalEvent from "../Utils/GlobalEvent";
import DrawUtils from "../Utils/DrawUtils";
import GameCfg from "./GameCfg";
import DrawData from "./DrawData";
import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    drawMACD: cc.Graphics = null;

    @property(cc.Graphics)
    drawKDJ: cc.Graphics = null;

    @property(cc.Graphics)
    drawRSI: cc.Graphics = null;

    @property(cc.Graphics)
    drawVol: cc.Graphics = null;


    @property(cc.Graphics)
    drawPCM: cc.Graphics = null;

    @property(cc.Graphics)
    drawCcl: cc.Graphics = null;

    VolList = [];            //均量线

    DIFList = [];

    DEAList = [];

    MACDList = [];

    maxDIF = 0;
    minDIF = 0;

    maxDEA = 0;
    minDEA = 0;

    maxMACD = 0;
    minMACD = 0;

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Label)
    label3: cc.Label = null;

    preDIF = null;

    preDEA = null;

    preMACD = null;

    Klist = [];

    Dlist = [];

    jList = [];

    maxK = 0;
    minK = 0;
    maxD = 0;
    minD = 0;
    maxJ = 0;
    minJ = 0;

    maxCcl = 0;
    minCcl = 0;

    preK = null;
    preD = null;
    preJ = null;

    UPRS = [];

    DOWNRS = [];

    Rs6 = [];

    maxRs6 = 0;
    minRs6 = 0;

    Rs12 = [];

    maxRs12 = 0;
    minRs12 = 0;

    Rs24 = [];

    maxRs24 = 0;
    minRs24 = 0;

    preRs6Point = null;

    preRs12Point = null;

    preRs24Point = null;

    @property(cc.Node)
    Mask: cc.Node = null;

    @property([cc.Label])
    MACDLabels: cc.Label[] = [];

    @property([cc.Label])
    KDJLabels: cc.Label[] = [];

    @property([cc.Label])
    RSILabels: cc.Label[] = [];

    @property(cc.Label)
    cclLabel: cc.Label = null;

    @property(cc.Node)
    voltext: cc.Node = null;

    topVol = 0;     //最高成交量

    bottomVol = 0;  //最低成交量

    onLoad() {

        GlobalEvent.on('on_off', (flagData) => {

            this.drawMACD.node.active = flagData.macd;

            this.MACDLabels.forEach(el => {
                el.node.active = flagData.macd;
            })

            this.drawKDJ.node.active = flagData.kdj;

            this.KDJLabels.forEach(el => {
                el.node.active = flagData.kdj;
            })

            this.drawRSI.node.active = flagData.rsi;

            this.RSILabels.forEach(el => {
                el.node.active = flagData.rsi;
            })

            this.drawPCM.node.active = flagData.cpm;

            this.drawVol.node.active = flagData.cpm;

            this.drawCcl.node.active = flagData.ccl;

            this.cclLabel.node.active = flagData.ccl;

            this.voltext.active = true;

            if (flagData.macd || flagData.kdj || flagData.rsi || flagData.ccl) {
                this.Mask.active = true;
                this.voltext.active = false;
            } else {
                this.Mask.active = false
                this.voltext.active = true;
            }

            this.setLabelValue();

            this.updataLabel(GameCfg.beg_end[1] - 1);

        }, this);

        GlobalEvent.on('onDraw', this.onDraw.bind(this), this);

        GlobalEvent.on('updataLabel', this.updataLabel.bind(this), this);

        GlobalEvent.on('onQHDraw', () => {
            this.initData();
            this.onDraw();
        }, this);
    }

    //计算数据
    initData() {
        this.DIFList = DrawData.DIFList;
        this.DEAList = DrawData.DEAList;
        this.MACDList = DrawData.MACDList;
        this.Klist = DrawData.Klist;
        this.Dlist = DrawData.Dlist;
        this.jList = DrawData.jList;
        this.UPRS = DrawData.UPRS;
        this.DOWNRS = DrawData.DOWNRS;
        this.Rs6 = DrawData.Rs6;
        this.Rs12 = DrawData.Rs12;
        this.Rs24 = DrawData.Rs24;
        this.VolList = DrawData.VolList;
    }

    onDisable() {
        this.drawRSI.clear();
        this.drawKDJ.clear();
        this.drawMACD.clear();
        this.drawCcl.clear();
        this.drawPCM.clear();
        this.drawVol.clear();
    }

    protected onEnable() {
        this.drawMACD && (this.drawMACD.node.active = false)
        this.drawKDJ && (this.drawKDJ.node.active = false)
        this.drawRSI && (this.drawRSI.node.active = false)

        this.initData();
        this.onDraw();
        this.onShow();

        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.MACDLabels[0].node.parent.x = 10;
            this.KDJLabels[0].node.parent.x = 10;
            this.RSILabels[0].node.parent.x = 10;
            this.cclLabel.node.parent.x = 10;
            this.voltext.x = 10;
        } else {
            this.MACDLabels[0].node.parent.x = 102;
            this.KDJLabels[0].node.parent.x = 102;
            this.RSILabels[0].node.parent.x = 102;
            this.cclLabel.node.parent.x = 102;
            this.voltext.x = 102;
        }
    }

    updataLabel(index) {

        let arr = ['MACD(' + GameCfg.MACD[0] + ',' + GameCfg.MACD[1] + ',' + GameCfg.MACD[2] + ') DIF', 'DEA', 'MACD'];

        if (this.DIFList[index]) {
            this.MACDLabels[0].string = arr[0] + ': ' + this.DIFList[index].toFixed(2);
        }

        if (this.DEAList[index]) {
            this.MACDLabels[1].string = arr[1] + ': ' + this.DEAList[index].toFixed(2);
        }

        if (this.MACDList[index]) {
            this.MACDLabels[2].string = arr[2] + ': ' + this.MACDList[index].toFixed(2);
        }

        let arr1 = ['KDJ(' + GameCfg.KDJ[0] + ',' + GameCfg.KDJ[1] + ',' + GameCfg.KDJ[2] + ') K', 'D', 'J'];

        if (this.Klist[index]) {
            this.KDJLabels[0].string = arr1[0] + ': ' + this.Klist[index].toFixed(2);
        }

        if (this.Dlist[index]) {
            this.KDJLabels[1].string = arr1[1] + ': ' + this.Dlist[index].toFixed(2);
        }

        if (this.jList[index]) {
            this.KDJLabels[2].string = arr1[2] + ': ' + this.jList[index].toFixed(2);
        }

        let arr2 = ['RSI(' + GameCfg.RSI[0] + ',' + GameCfg.RSI[1] + ',' + GameCfg.RSI[2] + ') RSI1', 'RSI2', 'RSI3'];

        if (this.Rs6[index]) {
            this.RSILabels[0].string = arr2[0] + ': ' + this.Rs6[index].toFixed(2);
        }

        if (this.Rs12[index]) {
            this.RSILabels[1].string = arr2[1] + ': ' + this.Rs12[index].toFixed(2);
        }

        if (this.Rs24[index]) {
            this.RSILabels[2].string = arr2[2] + ': ' + this.Rs24[index].toFixed(2);
        }

        if (GameCfg.GameType == pb.GameType.QiHuo) {
            if (GameCfg.data[0].data[index]) {
                this.cclLabel.string = 'CCL:' + GameCfg.data[0].data[index].ccl_hold;
            }
        }

        if (GameCfg.data[0].data[index]) {
            let value = parseFloat(GameCfg.data[0].data[index].value);
            this.voltext.getComponent(cc.Label).string = 'VOL(' + GameCfg.VOLGraph[0] + ',' + GameCfg.VOLGraph[1] + '):' + value;
        }

    }

    //设置label的值
    setLabelValue() {
        this.label1.node.active = true;
        this.label2.node.active = true;
        this.label3.node.active = true;

        let maxKDJ;

        maxKDJ = this.maxK;

        let minKDJ;

        minKDJ = this.minK;

        this.maxK = maxKDJ;
        this.maxD = maxKDJ;
        this.maxJ = maxKDJ;

        let maxRSI;

        maxRSI = this.maxRs6;
        let minRSI;

        minRSI = this.minRs6;

        this.maxRs6 = maxKDJ;
        this.maxRs12 = maxKDJ;
        this.maxRs24 = maxKDJ;

        this.maxMACD = Math.abs(this.minMACD) > this.maxMACD ? Math.abs(this.minMACD) : this.maxMACD;
        this.maxDIF = Math.abs(this.minDIF) > this.maxDIF ? Math.abs(this.minDIF) : this.maxDIF;
        this.maxDEA = Math.abs(this.minDEA) > this.maxDEA ? Math.abs(this.minDEA) : this.maxDEA;

        this.maxMACD = Math.max(this.maxMACD, this.maxDIF);
        this.maxMACD = Math.max(this.maxMACD, this.maxDEA);

        if (this.drawMACD.node.active == true) {
            this.label1.string = (this.maxMACD / 2).toFixed(2) + '';
            this.label2.string = '0.00';
            this.label3.string = (this.maxMACD / 2).toFixed(2) + '';

        } else if (this.drawKDJ.node.active == true) {

            this.label1.string = 10 + '';
            this.label2.string = 50 + '';
            this.label3.string = 90 + '';

        } else if (this.drawRSI.node.active == true) {

            this.label1.string = 20 + '';
            this.label2.string = 50 + '';
            this.label3.string = 80 + '';
        } else {
            this.label1.node.active = false;
            this.label2.node.active = false;
            this.label3.node.active = false;
        }
    }

    onDraw() {

        if (GameCfg.beg_end[0] < 0 || GameCfg.beg_end[1] > GameCfg.huizhidatas) {
            return;
        }

        let viweData = GameCfg.data[0].data;
        if (viweData.length <= 0) { return }
        if (!viweData || !viweData[GameCfg.beg_end[0]] || !viweData[GameCfg.beg_end[1] - 1]) {
            console.log('行情数据为空');
            return;
        }

        this.drawRSI.clear();
        this.drawKDJ.clear();
        this.drawMACD.clear();
        this.drawCcl.clear();
        this.drawPCM.clear();
        this.drawVol.clear();
        this.minDIF = this.DIFList[GameCfg.beg_end[0]];
        this.maxDIF = this.DIFList[GameCfg.beg_end[0]];

        this.minDEA = this.DEAList[GameCfg.beg_end[0]];
        this.maxDEA = this.DEAList[GameCfg.beg_end[0]];

        this.maxMACD = this.MACDList[GameCfg.beg_end[0]];
        this.minMACD = this.MACDList[GameCfg.beg_end[0]];

        this.minK = this.Klist[GameCfg.beg_end[0]];
        this.maxK = this.Klist[GameCfg.beg_end[0]];

        this.minD = this.Dlist[GameCfg.beg_end[0]];
        this.maxD = this.Dlist[GameCfg.beg_end[0]];

        this.minJ = this.jList[GameCfg.beg_end[0]];
        this.maxJ = this.jList[GameCfg.beg_end[0]];

        this.minRs6 = this.Rs6[GameCfg.beg_end[0]];
        this.maxRs6 = this.Rs6[GameCfg.beg_end[0]];

        this.maxRs12 = this.Rs12[GameCfg.beg_end[0]];
        this.minRs12 = this.Rs12[GameCfg.beg_end[0]];

        this.maxRs24 = this.Rs24[GameCfg.beg_end[0]];
        this.minRs24 = this.Rs24[GameCfg.beg_end[0]];


        this.topVol = 0;
        this.bottomVol = viweData[0].value;

        if (GameCfg.GameType == pb.GameType.QiHuo && GameCfg.data[0].data[GameCfg.beg_end[0]]) {
            this.maxCcl = GameCfg.data[0].data[GameCfg.beg_end[0]].ccl_hold;
            this.minCcl = GameCfg.data[0].data[GameCfg.beg_end[0]].ccl_hold;
        }

        for (let index = GameCfg.beg_end[0]; index < GameCfg.beg_end[1]; index++) {

            this.minDIF = Math.min(this.minDIF, this.DIFList[index]);
            this.maxDIF = Math.max(this.maxDIF, this.DIFList[index]);

            this.minDEA = Math.min(this.minDEA, this.DEAList[index]);
            this.maxDEA = Math.max(this.maxDEA, this.DEAList[index]);

            this.minMACD = Math.min(this.minMACD, this.MACDList[index]);
            this.maxMACD = Math.max(this.maxMACD, this.MACDList[index]);

            this.minK = Math.min(this.minK, this.Klist[index]);
            this.maxK = Math.max(this.maxK, this.Klist[index]);

            this.minD = Math.min(this.minD, this.Dlist[index]);
            this.maxD = Math.max(this.maxD, this.Dlist[index]);

            this.minJ = Math.min(this.minJ, this.jList[index]);
            this.maxJ = Math.max(this.maxJ, this.jList[index]);

            if (this.Rs6[index]) {
                this.minRs6 = Math.min(this.minRs6, this.Rs6[index]);
                this.maxRs6 = Math.max(this.maxRs6, this.Rs6[index]);
            }

            if (this.Rs12[index]) {
                this.minRs12 = Math.min(this.minRs12, this.Rs12[index]);
                this.maxRs12 = Math.max(this.maxRs12, this.Rs12[index]);
            }

            if (this.Rs24[index]) {
                this.minRs24 = Math.min(this.minRs24, this.Rs24[index]);
                this.maxRs24 = Math.max(this.maxRs24, this.Rs24[index]);
            }

            if (GameCfg.data[0].data[index] && GameCfg.data[0].data[index].ccl_hold) {
                this.maxCcl = Math.max(GameCfg.data[0].data[index].ccl_hold, this.maxCcl);
                this.minCcl = Math.min(GameCfg.data[0].data[index].ccl_hold, this.minCcl);
            }

            this.topVol = Math.max(this.topVol, viweData[index].value);
            this.bottomVol = Math.min(this.bottomVol, viweData[index].value);

        }

        this.setLabelValue();

        this.drawPCM.lineWidth = 2;
        this.drawVol.lineWidth = 2;
        this.drawMACD.lineWidth = 2;
        this.drawKDJ.lineWidth = 2;
        this.drawCcl.lineWidth = 2;
        this.drawRSI.lineWidth = 2;
        for (let i = GameCfg.beg_end[0]; i < GameCfg.beg_end[1]; i++) {
            this.onDrawMACD(i);
            this.onDrawKDJ(i);
            this.onDrawRSI(i);
            this.onDrawCCL(i);
            this.onDrawVol(viweData[i], i);
        }
    }

    onShow() {
        this.MACDLabels.forEach((el, index) => {
            if (index == 0) {
                el.node.color = GameCfg.DIF_LINE_COL;
            } else if (index == 1) {
                el.node.color = GameCfg.DEA_LINE_COL;
            } else {
                el.node.color = GameCfg.MACD_COL[0];
            }
        })

        this.KDJLabels.forEach((el, index) => {
            el.node.color = GameCfg.K_D_J_Line[index];
        })

        this.RSILabels.forEach((el, index) => {
            el.node.color = GameCfg.RSI_COLOR[index];
        })

        if (GameCfg.GameSet.isBW) {
            this.Mask.color = cc.Color.BLACK;
        } else {
            this.Mask.color = cc.Color.WHITE;
        }

        this.cclLabel.node.color = GameCfg.CCL_COL;

        this.voltext.color = GameCfg.VOLColor[0];
    }

    onDrawKDJ(index) {
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }
        this.maxK = 160;

        let bgheight = this.drawKDJ.node.height;

        let x = 10 + (some * GameCfg.hz_width) + GameCfg.hz_width / 2;

        let preX = 10 + ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;

        let kY = this.Klist[index] / this.maxK * bgheight;

        let preky = this.Klist[index - 1] / this.maxK * bgheight;

        let dY = this.Dlist[index] / this.maxK * bgheight;

        let predy = this.Dlist[index - 1] / this.maxK * bgheight;

        let jY = this.jList[index] / this.maxK * bgheight;

        let prejy = this.jList[index - 1] / this.maxK * bgheight;

        if (index > 0) {
            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[0];

            DrawUtils.drawLine(this.drawKDJ, preX, preky + 30, x, kY + 30);

            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[1];

            DrawUtils.drawLine(this.drawKDJ, preX, predy + 30, x, dY + 30);

            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[2];

            DrawUtils.drawLine(this.drawKDJ, preX, prejy + 30, x, jY + 30);
        }
    }

    onDrawCCL(index) {
        if (GameCfg.GameType != pb.GameType.QiHuo) {
            return;
        }
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }
        let bgheight = this.drawCcl.node.height;

        let x = 10 + (some * GameCfg.hz_width) + GameCfg.hz_width / 2;

        let preX = 10 + ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;

        let y = GameCfg.data[0].data[index].ccl_hold / this.maxCcl * bgheight;

        let preY = GameCfg.data[0].data[index - 1].ccl_hold / this.maxCcl * bgheight;

        this.drawCcl.strokeColor = GameCfg.CCL_COL;

        DrawUtils.drawLine(this.drawCcl, preX, preY, x, y);
    }

    onDrawRSI(index) {
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }
        this.maxRs6 = 120;

        let bgHeight = this.drawRSI.node.height;
        let RSIX = 10 + (some * GameCfg.hz_width) + GameCfg.hz_width / 2;
        let preRSIX = 10 + ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;
        //RSI6
        if (index >= 6) {

            let RSI6Y = this.Rs6[index] / this.maxRs6 * bgHeight;

            let preRSI6Y = this.Rs6[index - 1] / this.maxRs6 * bgHeight;

            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[0];

            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI6Y + 10, RSIX, RSI6Y + 10);

        }

        if (index >= 12) {

            let RSI12Y = this.Rs12[index] / this.maxRs6 * bgHeight;

            let preRSI12Y = this.Rs12[index - 1] / this.maxRs6 * bgHeight;

            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[1];

            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI12Y + 10, RSIX, RSI12Y + 10);

        }

        if (index >= 24) {

            let RSI24Y = this.Rs24[index] / this.maxRs6 * bgHeight;
            let preRSI24Y = this.Rs24[index - 1] / this.maxRs6 * bgHeight;

            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[2];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI24Y + 10, RSIX, RSI24Y + 10);
        }
    }

    onDrawMACD(index) {
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }

        let bgHeight = this.drawMACD.node.height;
        let difY = 0;

        difY = this.DIFList[index] / this.maxMACD * bgHeight / 2;//+ bgHeight / 2;

        let predifY = 0;

        predifY = this.DIFList[index - 1] / this.maxMACD * bgHeight / 2;//+ bgHeight / 2;

        let difx = 10 + (some * GameCfg.hz_width) + GameCfg.hz_width / 2;
        let preX = 10 + ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;

        if (some > 0) {
            this.drawMACD.strokeColor = GameCfg.DIF_LINE_COL;
            this.drawMACD.lineWidth = 2;
            DrawUtils.drawLine(this.drawMACD, preX, predifY, difx, difY);
        }

        let deaY = 0;

        deaY = this.DEAList[index] / this.maxMACD * bgHeight / 2;

        let predeaY = 0;

        predeaY = this.DEAList[index - 1] / this.maxMACD * bgHeight / 2;

        if (index > 0) {
            this.drawMACD.strokeColor = GameCfg.DEA_LINE_COL;
            this.drawMACD.lineWidth = 2;
            DrawUtils.drawLine(this.drawMACD, preX, predeaY, difx, deaY);
        }

        //MACD
        //MACD线的宽度
        this.drawMACD.lineWidth = GameCfg.hz_width / 3;
        if (this.drawMACD.lineWidth < 3) {
            this.drawMACD.lineWidth = 3;
        } else if (this.drawMACD.lineWidth > 6) {
            this.drawMACD.lineWidth = 6;
        }

        let macdY = 0;
        if (this.MACDList[index] >= 0) {
            macdY = this.MACDList[index] / this.maxMACD * bgHeight / 2;
            this.drawMACD.strokeColor = GameCfg.MACD_COL[0];
            DrawUtils.drawLine(this.drawMACD, difx, 0, difx, macdY);

        } else if (this.MACDList[index] <= 0) {
            macdY = (this.MACDList[index] / this.maxMACD * bgHeight / 2);
            this.drawMACD.strokeColor = GameCfg.MACD_COL[1];
            DrawUtils.drawLine(this.drawMACD, difx, 0, difx, macdY);
        }
    }

    //成交量绘制
    onDrawVol(el, index) {

        let some = index - GameCfg.beg_end[0];

        let disVol = this.topVol - this.bottomVol;

        let startX = some == 0 ? 10 : 10 + (some * GameCfg.hz_width);

        let endX = 10 + ((some + 1) * GameCfg.hz_width);

        let hight = el.value * ( this.drawVol.node.height / this.topVol);

        let width = endX - startX;

        this.drawRect(this.drawVol, startX, 0, width, hight, el.open > el.close);

        //均量线 白
        if (!this.VolList[index]) {
            return;
        }

        //每段数据绘制
        for (let i = 0; i < GameCfg.VOLGraph.length; i++) {
            if (index >= GameCfg.VOLGraph[i]) {

                let preY = this.VolList[index - 1][i] * ( this.drawPCM.node.height / this.topVol);
                let preX = 10 + ((some - 1) * GameCfg.hz_width) + width / 2

                //平均的位置
                let VOlPointY = this.VolList[index][i] * ( this.drawPCM.node.height / this.topVol);
                let VOlPointX = startX + width / 2;

                this.drawPCM.strokeColor = GameCfg.VOLColor[i];
                DrawUtils.drawLine(this.drawPCM, preX, preY, VOlPointX, VOlPointY);
            }
        }
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
            ctx.strokeColor = col;
        } else if (flag != undefined) {
            if (GameCfg.GameSet.isBW) {
                col = new cc.Color().fromHEX('#ea233b');
            } else {
                col = new cc.Color().fromHEX('#e2233e');
            }
            ctx.strokeColor = col;
            col = null;
        }
        DrawUtils.drawRect(ctx, x + 2, y, w - 2, h, col);
    }

    protected onDestroy() {
        GlobalEvent.off('onDraw');
        GlobalEvent.off('updataLabel');
        GlobalEvent.off('on_off');
        GlobalEvent.off('onQHDraw');
    }
}
