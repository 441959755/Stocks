import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";

import GameCfg from "./GameCfg";

import DrawData from "./DrawData";

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
    drawPcm: cc.Graphics = null;

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

    onLoad() {
        //  this.Mask.active = false;
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

            this.drawPcm.node.active = flagData.cpm;
            this.drawVol.node.active = flagData.cpm;

            if (flagData.macd || flagData.kdj || flagData.rsi) {
                if (GameCfg.GameType != 3) {
                    this.Mask.active = true;
                }
                this.drawVol.node.zIndex = 1;
                this.drawPcm.node.zIndex = 2;
                this.Mask.zIndex = 3;
                this.drawMACD.node.zIndex = 4;
                this.drawKDJ.node.zIndex = 5;
                this.drawRSI.node.zIndex = 6;

            } else {
                this.drawVol.node.zIndex = 2;
                this.drawPcm.node.zIndex = 3;
                this.Mask.zIndex = 1;
            }

            this.setLabelValue();
            this.updataLabel(GameCfg.huizhidatas);
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
        this.drawMACD.lineWidth = 2;
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
    }

    protected start() {
        this.drawMACD && (this.drawMACD.node.active = false)
        this.drawKDJ && (this.drawKDJ.node.active = false)
        this.drawRSI && (this.drawRSI.node.active = false)
        // if (GameCfg.GameType == 3) {
        //     if (GameCfg.GameSet.select == 'MACD') {
        //         this.drawMACD.node.active = true;
        //         this.drawVol.node.active = false;
        //         this.drawPcm.node.active = false;
        //     } else if (GameCfg.GameSet.select == 'KDJ') {
        //         this.drawKDJ.node.active = true;
        //         this.drawVol.node.active = false;
        //         this.drawPcm.node.active = false;
        //     } else if (GameCfg.GameSet.select == 'RSI') {
        //         this.drawRSI.node.active = true;
        //         this.drawVol.node.active = false;
        //         this.drawPcm.node.active = false;
        //     }
        // }
        this.initData();
        this.onDraw();
    }

    updataLabel(index) {
        index -= 1;
        let arr = ['MACD(12,26,9) DIF', 'DEA', 'MACD'];

        if (this.DIFList[index]) {
            this.MACDLabels[0].string = arr[0] + ': ' + this.DIFList[index].toFixed(2);
        }

        if (this.DEAList[index]) {
            this.MACDLabels[1].string = arr[1] + ': ' + this.DEAList[index].toFixed(2);
        }

        if (this.MACDList[index]) {
            this.MACDLabels[2].string = arr[2] + ': ' + this.MACDList[index].toFixed(2);
        }

        let arr1 = ['KDJ(9,3,3) K', 'D', 'J'];
        if (this.Klist[index]) {
            this.KDJLabels[0].string = arr1[0] + ': ' + this.Klist[index].toFixed(2);
        }

        if (this.Dlist[index]) {
            this.KDJLabels[1].string = arr1[1] + ': ' + this.Dlist[index].toFixed(2);
        }

        if (this.jList[index]) {
            this.KDJLabels[2].string = arr1[2] + ': ' + this.jList[index].toFixed(2);
        }

        let arr2 = ['RSI(6,12,24) RSI1', 'RSI2', 'RSI3'];
        if (this.Rs6[index]) {
            this.RSILabels[0].string = arr2[0] + ': ' + this.Rs6[index].toFixed(2);
        }

        if (this.Rs12[index]) {
            this.RSILabels[1].string = arr2[1] + ': ' + this.Rs12[index].toFixed(2);
        }

        if (this.Rs24[index]) {
            this.RSILabels[2].string = arr2[2] + ': ' + this.Rs24[index].toFixed(2);
        }
    }

    //设置label的值
    setLabelValue() {
        this.label1.node.active = true;
        this.label2.node.active = true;
        this.label3.node.active = true;

        let maxKDJ;
        maxKDJ = Math.max(this.maxK, this.maxD);
        maxKDJ = Math.max(maxKDJ, this.maxJ);

        let minKDJ;
        minKDJ = Math.max(this.minK, this.minD);
        minKDJ = Math.max(minKDJ, this.minJ);

        let min = parseInt(minKDJ / 10 + '') * 10 <= 0 ? 10 : parseInt(minKDJ / 10 + '') * 10
        let max = Math.ceil(maxKDJ / 10) * 10;
        let con = (max - min) / 2 + min;

        this.maxK = max;
        this.maxD = max;
        this.maxJ = max;

        let maxRSI;
        maxRSI = Math.max(this.maxRs6, this.maxRs24);
        maxRSI = Math.max(maxRSI, this.maxRs12);

        let minRSI;
        minRSI = Math.max(this.minRs6, this.minRs12);
        minRSI = Math.max(minRSI, this.minRs24);


        let min1 = parseInt(minRSI / 10 + '') * 10 <= 0 ? 10 : parseInt(minRSI / 10 + '') * 10
        let max1 = Math.ceil(maxRSI / 10) * 10;
        let con1 = (max - min) / 2 + min;

        this.maxRs6 = max;
        this.maxRs12 = max;
        this.maxRs24 = max;

        if (this.drawMACD.node.active == true) {
            this.label1.string = (this.minMACD / 2).toFixed(2) + '';
            this.label2.string = '0.00';
            this.label3.string = (this.maxMACD / 2).toFixed(2) + '';
        } else if (this.drawKDJ.node.active == true) {
            this.label1.string = min + '';
            this.label2.string = con + '';
            this.label3.string = max + '';
        } else if (this.drawRSI.node.active == true) {

            this.label1.string = min1 + '';
            this.label2.string = con1 + '';
            this.label3.string = max1 + '';


        } else {
            this.label1.node.active = false;
            this.label2.node.active = false;
            this.label3.node.active = false;
        }
    }

    onDraw() {
        this.drawRSI.clear();
        this.drawKDJ.clear();
        this.drawMACD.clear();
        this.minDIF = this.DIFList[cc.ext.beg_end[0]];
        this.maxDIF = this.DIFList[cc.ext.beg_end[0]];

        this.minDEA = this.DEAList[cc.ext.beg_end[0]];
        this.maxDEA = this.DEAList[cc.ext.beg_end[0]];

        this.maxMACD = this.MACDList[cc.ext.beg_end[0]];
        this.minMACD = this.MACDList[cc.ext.beg_end[0]];

        this.minK = this.Klist[cc.ext.beg_end[0]];
        this.maxK = this.Klist[cc.ext.beg_end[0]];

        this.minD = this.Dlist[cc.ext.beg_end[0]];
        this.maxD = this.Dlist[cc.ext.beg_end[0]];

        this.minJ = this.jList[cc.ext.beg_end[0]];
        this.maxJ = this.jList[cc.ext.beg_end[0]];

        this.minRs6 = this.Rs6[cc.ext.beg_end[0]];
        this.maxRs6 = this.Rs6[cc.ext.beg_end[0]];

        this.maxRs12 = this.Rs12[cc.ext.beg_end[0]];
        this.minRs12 = this.Rs12[cc.ext.beg_end[0]];

        this.maxRs24 = this.Rs24[cc.ext.beg_end[0]];
        this.minRs24 = this.Rs24[cc.ext.beg_end[0]];

        for (let index = cc.ext.beg_end[0]; index < cc.ext.beg_end[1]; index++) {
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


        }
        this.setLabelValue();
        // this.setLabelValue('RSI');
        // this.setLabelValue('MACD');

        for (let i = 0; i < this.DIFList.length; i++) {
            if (i >= cc.ext.beg_end[0] && i < cc.ext.beg_end[1]) {
                this.onDrawMACD(i);
                this.onDrawKDJ(i);
                this.onDrawRSI(i);
            }
        }
    }

    onEnable() {

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


    }

    onDrawKDJ(index) {
        let some = index - cc.ext.beg_end[0];


        if (index <= 0) {
            return
        }

        let bgheight = this.drawKDJ.node.height;

        let x = 10 + (some * cc.ext.hz_width) + cc.ext.hz_width / 2;

        let preX = 10 + ((some - 1) * cc.ext.hz_width) + cc.ext.hz_width / 2;

        let kY = this.Klist[index] / this.maxK * bgheight;

        let preky = this.Klist[index - 1] / this.maxK * bgheight;

        let dY = this.Dlist[index] / this.maxD * bgheight;

        let predy = this.Dlist[index - 1] / this.maxD * bgheight;

        let jY = this.jList[index] / this.maxJ * bgheight;

        let prejy = this.jList[index - 1] / this.maxJ * bgheight;

        if (index > 0) {
            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[0];
            this.drawKDJ.lineWidth = 2;
            DrawUtils.drawLine(this.drawKDJ, preX, preky, x, kY);

            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[1];
            this.drawKDJ.lineWidth = 2;
            DrawUtils.drawLine(this.drawKDJ, preX, predy, x, dY);

            this.drawKDJ.strokeColor = GameCfg.K_D_J_Line[2];
            this.drawKDJ.lineWidth = 2;
            DrawUtils.drawLine(this.drawKDJ, preX, prejy, x, jY);
        }
    }

    onDrawRSI(index) {
        let some = index - cc.ext.beg_end[0];

        if (index <= 0) {
            return
        }

        let bgHeight = this.drawRSI.node.height;
        let RSIX = 10 + (some * cc.ext.hz_width) + cc.ext.hz_width / 2;
        let preRSIX = 10 + ((some - 1) * cc.ext.hz_width) + cc.ext.hz_width / 2;
        //RSI6
        if (index > 5) {
            // let RSI6Y = this.Rs6[index - 5] / this.maxRs6 * bgHeight;

            // let preRSI6Y = this.Rs6[index - 6] / this.maxRs6 * bgHeight;
            let RSI6Y = this.Rs6[index] / this.maxRs6 * bgHeight;

            let preRSI6Y = this.Rs6[index - 1] / this.maxRs6 * bgHeight;
            // if (RSI6Y > bgHeight) {
            //     RSI6Y = bgHeight;
            // }
            // if (preRSI6Y > bgHeight) {
            //     preRSI6Y = bgHeight;
            // }
            //    if (index > 5) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[0];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI6Y, RSIX, RSI6Y);
            //    }
        }

        //RSI12
        if (index > 11) {
            // let RSI12Y = this.Rs12[index - 11] / this.maxRs12 * bgHeight;
            // let preRSI12Y = this.Rs12[index - 12] / this.maxRs12 * bgHeight;
            let RSI12Y = this.Rs12[index] / this.maxRs12 * bgHeight;
            let preRSI12Y = this.Rs12[index - 1] / this.maxRs12 * bgHeight;
            // if (RSI12Y > bgHeight) {
            //     RSI12Y = bgHeight;
            // }
            // if (preRSI12Y > bgHeight) {
            //     preRSI12Y = bgHeight;
            // }
            //   if (index > 11) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[1];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI12Y, RSIX, RSI12Y);
            //  }

        }

        //RSI24
        if (index > 23) {
            // let RSI24Y = this.Rs24[index - 23] / this.maxRs24 * bgHeight;
            // let preRSI24Y = this.Rs24[index - 24] / this.maxRs24 * bgHeight;

            let RSI24Y = this.Rs24[index] / this.maxRs24 * bgHeight;
            let preRSI24Y = this.Rs24[index - 1] / this.maxRs24 * bgHeight;
            // if (RSI24Y > 150) {
            //     RSI24Y = 150;
            // }
            // if (preRSI24Y > 150) {
            //     preRSI24Y = 150;
            // }
            //   if (index > 23) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[2];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI24Y, RSIX, RSI24Y);
            //  }

        }
    }

    onDrawMACD(index) {
        let some = index - cc.ext.beg_end[0];
        // 
        //dif
        if (index <= 0) {
            return
        }

        let bgHeight = this.drawMACD.node.height;
        let difY = 0;
        if (this.DIFList[index] >= 0) {
            difY = this.DIFList[index] / this.maxDIF * bgHeight / 2;//+ bgHeight / 2;
        } else if (this.DIFList[index] <= 0) {
            difY = -(this.DIFList[index] / this.minDIF * bgHeight / 2)
        }

        let predifY = 0;
        if (this.DIFList[index - 1] >= 0) {
            predifY = this.DIFList[index - 1] / this.maxDIF * bgHeight / 2;//+ bgHeight / 2;
        } else if (this.DIFList[index - 1] <= 0) {
            predifY = -(this.DIFList[index - 1] / this.minDIF * bgHeight / 2)
        }
        let difx = 10 + (some * cc.ext.hz_width) + cc.ext.hz_width / 2;
        let preX = 10 + ((some - 1) * cc.ext.hz_width) + cc.ext.hz_width / 2;

        if (some > 0) {
            this.drawMACD.strokeColor = GameCfg.DIF_LINE_COL;
            this.drawMACD.lineWidth = 2;
            DrawUtils.drawLine(this.drawMACD, preX, predifY, difx, difY);

        }
        //  this.preDIF = [difx, difY];

        //dea
        let deaY = 0;
        if (this.DEAList[index] >= 0) {
            deaY = this.DEAList[index] / this.maxDEA * bgHeight / 2;
        } else if (this.DEAList[index] <= 0) {
            deaY = -(this.DEAList[index] / this.minDEA * bgHeight / 2);
        }

        let predeaY = 0;
        if (this.DEAList[index - 1] >= 0) {
            predeaY = this.DEAList[index - 1] / this.maxDEA * bgHeight / 2;
        } else if (this.DEAList[index - 1] <= 0) {
            predeaY = -(this.DEAList[index - 1] / this.minDEA * bgHeight / 2);
        }
        if (index > 0) {
            this.drawMACD.strokeColor = GameCfg.DEA_LINE_COL;
            this.drawMACD.lineWidth = 2;
            DrawUtils.drawLine(this.drawMACD, preX, predeaY, difx, deaY);
        }
        //    this.preDEA = [difx, deaY];

        //MACD
        //MACD线的宽度
        this.drawMACD.lineWidth = cc.ext.hz_width / 3;
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
            macdY = -(this.MACDList[index] / this.minMACD * bgHeight / 2);
            this.drawMACD.strokeColor = GameCfg.MACD_COL[1];
            DrawUtils.drawLine(this.drawMACD, difx, 0, difx, macdY);
        }
    }


    protected onDestroy() {
        GlobalEvent.off('onDraw');
        GlobalEvent.off('updataLabel')
    }
}
