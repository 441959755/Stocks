import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import DrawUtils from "../../../sctiprs/Utils/DrawUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

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

    VolList = [];            //均量线

    // huizhidatas = null;

    DIFList = [];

    DEAList = [];

    MACDList = [];

    maxDIF = 0;
    minDIF = 0;

    maxDEA = 0;
    minDEA = 0;

    maxMACD = 0;
    minMACD = 0;

    topVol = 0;     //最高成交量

    bottomVol = 0;  //最低成交量

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

    viweData = null;
    ktype = null;

    onEnable() {
        GlobalEvent.on('onDrawGrap', (arr, ktype) => {
            arr && (this.viweData = arr)
            ktype && (this.ktype = ktype)
            this.onDraw();
        }, this);

        GlobalEvent.on('clearGraphics', () => {
            this.drawRSI.clear();
            this.drawKDJ.clear();
            this.drawMACD.clear();

            this.drawPCM.clear();
            this.drawVol.clear();
        }, this)
    }

    start() {

    }

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

    onDraw() {
        if (GameCfg.beg_end[1] < 0 || GameCfg.beg_end[0] > GameCfg.beg_end[1]) {
            console.log(' GameCfg.beg_end[0]:' + GameCfg.beg_end[0]);
            console.log(' GameCfg.beg_end[1]:' + GameCfg.beg_end[1]);
            return;
        }
        if (GameCfg.beg_end[0] < 0 || GameCfg.beg_end[1] > this.viweData.length) {
            console.log(' GameCfg.beg_end[0]:' + GameCfg.beg_end[0]);
            console.log(' GameCfg.beg_end[1]:' + GameCfg.beg_end[1]);
            return;
        }
        this.initData()
        let viweData = this.viweData;
        this.drawRSI.clear();
        this.drawKDJ.clear();
        this.drawMACD.clear();

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



            this.topVol = Math.max(this.topVol, viweData[index].value);
            this.bottomVol = Math.min(this.bottomVol, viweData[index].value);

        }
        //   this.setLabelValue();
        this.drawPCM.lineWidth = 2;
        this.drawVol.lineWidth = 2;
        this.drawMACD.lineWidth = 2;
        this.drawKDJ.lineWidth = 2;
        //  this.drawCcl.lineWidth = 2;
        this.drawRSI.lineWidth = 2;
        for (let i = GameCfg.beg_end[0]; i < GameCfg.beg_end[1]; i++) {
            this.onDrawMACD(i);
            this.onDrawKDJ(i);
            this.onDrawRSI(i);
            //  this.onDrawCCL(i);
            this.onDrawVol(viweData[i], i);
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

        let difx = (some * GameCfg.hz_width) + GameCfg.hz_width / 2;
        let preX = ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;

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

    onDrawKDJ(index) {
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }
        this.maxK = 160;

        let bgheight = this.drawKDJ.node.height;

        let x = (some * GameCfg.hz_width) + GameCfg.hz_width / 2;

        let preX = ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;

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

    onDrawRSI(index) {
        let some = index - GameCfg.beg_end[0];

        if (index <= 0) {
            return
        }
        this.maxRs6 = 120;

        let bgHeight = this.drawRSI.node.height;
        let RSIX = (some * GameCfg.hz_width) + GameCfg.hz_width / 2;
        let preRSIX = ((some - 1) * GameCfg.hz_width) + GameCfg.hz_width / 2;
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

    onDrawVol(el, index) {

        let some = index - GameCfg.beg_end[0];

        if (this.ktype == pb.KType.Min) {
            let width = this.node.width / 240;
            let x = (some * width);
            let y = el.value * (150 / this.topVol);

            if (index == 0) {
                if (el.open < el.close) {
                    this.drawVol.strokeColor = new cc.Color().fromHEX('#e94343');
                }
                else if (el.open == el.close) {
                    this.drawVol.strokeColor = cc.Color.WHITE;
                }
                else if (el.open > el.close) {
                    this.drawVol.strokeColor = new cc.Color().fromHEX('#31a633');
                }
            }
            else {
                if (this.viweData[index - 1].close < el.close) {
                    this.drawVol.strokeColor = new cc.Color().fromHEX('#e94343');
                }
                else if (this.viweData[index - 1].close == el.close) {
                    this.drawVol.strokeColor = cc.Color.WHITE;
                }
                else if (this.viweData[index - 1].close > el.close) {
                    this.drawVol.strokeColor = new cc.Color().fromHEX('#31a633');
                }
            }

            this.drawVol.lineWidth = width;
            DrawUtils.drawLine(this.drawVol, x, 0, x, y);
        }
        else {

            let startX = (some * GameCfg.hz_width);
            // // console.log('startX='+startX);
            let endX = ((some + 1) * GameCfg.hz_width);
            let hight = el.value * (150 / this.topVol);
            let width = endX - startX;
            this.drawRect(this.drawVol, startX, 0, width, hight, el.open > el.close);

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
        DrawUtils.drawRect(ctx, x, y, w - 5, h, col);
    }

    onDisable() {
        this.drawRSI.clear();
        this.drawKDJ.clear();
        this.drawMACD.clear();
        this.drawPCM.clear();
        this.drawVol.clear();
        GlobalEvent.off('onDrawGrap');
        GlobalEvent.off('clearGraphics');
    }

}
