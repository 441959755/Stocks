import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";

import GameCfg from "./GameCfg";

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

    n_high = null;

    n_low = null;

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

    Rs12 = [];

    Rs24 = [];

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
            this.drawKDJ.node.active = flagData.kdj;
            this.drawRSI.node.active = flagData.rsi;
            this.drawPcm.node.active = flagData.cpm;
            this.drawVol.node.active = flagData.cpm;
            if (flagData.macd || flagData.kdj || flagData.rsi) {
                //  this.Mask.active = true;
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
        }, this);

        GlobalEvent.on('onDraw', this.onDraw.bind(this), this);

        GlobalEvent.on('updataLabel', this.updataLabel.bind(this), this);

    }

    protected start() {
        this.drawMACD && (this.drawMACD.node.active = false)
        this.drawKDJ && (this.drawKDJ.node.active = false)
        this.drawRSI && (this.drawRSI.node.active = false)

        let huizhidatas = cc.ext.gameData.gameDatas[0].data;

        let EMA1Data = 12, EMA2Data = 26, DEAData = 9;
        let EMA12 = 0, EMA26 = 0;

        this.drawMACD.lineWidth = 2;

        //画图的数据
        huizhidatas.forEach((el, index) => {
            let RSV = 0;
            if (index == 0) {
                EMA12 = parseFloat(el.close);
                EMA26 = parseFloat(el.close);
                //   let dif = EMA12 - EMA26;
                this.DIFList.push(0);
                this.DEAList.push(0);
                this.MACDList.push(0);
                this.minDIF = this.DIFList[index];
                this.maxDIF = this.DIFList[index];

                this.minDEA = this.DEAList[index];
                this.maxDEA = this.DEAList[index];

                this.minMACD = this.MACDList[index];
                this.maxMACD = this.MACDList[index];

                RSV = (el.close - el.low) / (el.high - el.low) * 100;
                let k = (2 / 3) * 50 + 1 / 3 * RSV;
                let d = 2 / 3 * 50 + 1 / 3 * k;
                let j = 3 * k - 2 * d;
                this.Klist.push(k);
                this.Dlist.push(d);
                this.jList.push(j);

                this.n_high = el.high;
                this.n_low = el.low;

                this.maxD = d;
                this.minD = d;
                this.maxJ = j;
                this.minJ = j;
                this.maxK = k;
                this.minK = k;

                this.UPRS.push(0);
                this.DOWNRS.push(0);

            } else {
                EMA12 = (EMA12 * (EMA1Data - 1) + parseFloat(el.close)) / (EMA1Data + 1);
                EMA26 = (EMA26 * (EMA2Data - 1) + parseFloat(el.close)) / (EMA2Data + 1);
                let dif = EMA12 - EMA26
                let dea = (this.DIFList[this.DIFList.length - 1] * (DEAData - 1) + dif * 2) / (DEAData + 1);
                let macd = (dif - dea) * 2;
                this.DIFList.push(dif);
                this.DEAList.push(dea);
                this.MACDList.push(macd);

                this.n_low = Math.min(this.n_low, el.low);
                this.n_high = Math.max(this.n_high, el.high);

                RSV = (el.close - this.n_low) / (this.n_high - this.n_low) * 100;
                let k = (2 / 3) * this.Klist[this.Klist.length - 1] + 1 / 3 * RSV;
                let d = (2 / 3) * this.Dlist[this.Dlist.length - 1] + 1 / 3 * k;
                let j = 3 * k - 2 * d;
                this.Klist.push(k);
                this.Dlist.push(d);
                this.jList.push(j);

                if (el.close < huizhidatas[index - 1].close) {
                    this.UPRS.push(0);
                    this.DOWNRS.push(this.DOWNRS[this.DOWNRS.length - 1] * 5 / 6 + (huizhidatas[index - 1].close - el.close) / 6);
                } else {
                    this.DOWNRS.push(0);
                    this.UPRS.push(this.UPRS[this.UPRS.length - 1] * 5 / 6 + (el.close - huizhidatas[index - 1].close) / 6);
                }

                if (index >= 5) {
                    let rs = index + 1 - 6;
                    let UP6 = 0, DOWN6 = 0;
                    for (; rs <= index; rs++) {
                        UP6 += this.UPRS[rs];
                        DOWN6 += this.DOWNRS[rs];
                    }
                    let RS = (UP6 / 6) / (DOWN6 / 6);
                    this.Rs6.push(100 * RS / (1 + RS));
                } else {
                    this.Rs6.push('null');
                }
                if (index >= 11) {
                    let rs = index + 1 - 12;
                    let UP12 = 0, DOWN12 = 0;
                    for (; rs <= index; rs++) {
                        UP12 += this.UPRS[rs];
                        DOWN12 += this.DOWNRS[rs];
                    }
                    let RS = (UP12 / 12) / (DOWN12 / 12);
                    this.Rs12.push(100 * RS / (1 + RS));
                } else {
                    this.Rs12.push('null');
                }

                if (index >= 23) {
                    let rs = index + 1 - 24;
                    let UP24 = 0, DOWN24 = 0;
                    for (; rs <= index; rs++) {
                        UP24 += this.UPRS[rs];
                        DOWN24 += this.DOWNRS[rs];
                    }
                    let RS = (UP24 / 24) / (DOWN24 / 24);
                    this.Rs24.push(100 * RS / (1 + RS));
                } else {
                    this.Rs24.push('null');
                }

            }
        })
    }

    updataLabel(index) {
        index -= 1;
        let arr = ['MACD(12,26,9) DIF', 'DEA', 'MACD'];
        if (this.DIFList[index] && this.DIFList[index] != 'null') {
            this.MACDLabels[0].string = arr[0] + ': ' + this.DIFList[index].toFixed(2);
        }
        if (this.DEAList[index] && this.DEAList[index] != 'null') {
            this.MACDLabels[1].string = arr[1] + ': ' + this.DEAList[index].toFixed(2);
        }
        if (this.MACDList[index] && this.MACDList[index] != 'null') {
            this.MACDLabels[2].string = arr[2] + ': ' + this.MACDList[index].toFixed(2);
        }

        let arr1 = ['KDJ(9,3,3)', 'k', 'j'];
        if (this.Klist[index] && this.Klist[index] != 'null') {
            this.KDJLabels[0].string = arr1[0] + ': ' + this.Klist[index].toFixed(2);
        }

        if (this.Dlist[index] && this.Dlist[index] != 'null') {
            this.KDJLabels[1].string = arr1[1] + ': ' + this.Dlist[index].toFixed(2);
        }

        if (this.jList[index] && this.jList[index] != 'null') {
            this.KDJLabels[2].string = arr1[2] + ': ' + this.jList[index].toFixed(2);
        }

        let arr2 = ['RSI(6,12,24) RSI1', 'RSI2', 'RSI3'];
        if (this.Rs6[index] != 'null' && this.Rs6[index]) {
            this.RSILabels[0].string = arr2[0] + ': ' + this.Rs6[index].toFixed(2);
        }

        if (this.Rs12[index] != 'null' && this.Rs12[index]) {
            this.RSILabels[1].string = arr2[1] + ': ' + this.Rs12[index].toFixed(2);
        }

        if (this.Rs24[index] != 'null' && this.Rs24[index]) {
            this.RSILabels[2].string = arr2[2] + ': ' + this.Rs24[index].toFixed(2);
        }
    }

    //设置label的值
    setLabelValue(str) {
        if (str == 'MACD') {
            this.label1.string = (this.minMACD / 2).toFixed(2) + '';
            this.label2.string = '0.00';
            this.label3.string = (this.maxMACD / 2).toFixed(2) + '';
        } else if (str == 'KDJ') {
            this.label1.string = '10';
            this.label2.string = '50';
            this.label3.string = '90';
        } else {
            this.label1.string = '20';
            this.label2.string = '50';
            this.label3.string = '80';
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
        }

        for (let i = 0; i < this.DIFList.length; i++) {
            if (i >= cc.ext.beg_end[0] && i < cc.ext.beg_end[1]) {
                this.onDrawMACD(i);
                this.onDrawKDJ(i);
                this.onDrawRSI(i);
            }
        }
    }

    onEnable() {
        this.onDraw();
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


    }

    onDrawKDJ(index) {
        let some = index - cc.ext.beg_end[0];

        this.setLabelValue('KDJ');
        if (index <= 0) {
            return
        }

        let bgheight = 150;

        let x = 10 + (some * cc.ext.hz_width) + cc.ext.hz_width  / 2;

        let preX = 10 + ((some - 1) * cc.ext.hz_width)  + cc.ext.hz_width/ 2;

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
        this.setLabelValue('RSI');
        if (index <= 0) {
            return
        }

        let bgHeight = 150;
        let RSIX = 10 + (some * cc.ext.hz_width) + cc.ext.hz_width / 2;
        let preRSIX = 10 + ((some - 1) * cc.ext.hz_width)  + cc.ext.hz_width / 2;
        //RSI6
        if (index > 5) {
            let RSI6Y = this.Rs6[index - 5] / 100 * bgHeight;
            if (RSI6Y > 150) {
                RSI6Y = 150;
            }
            let preRSI6Y = this.Rs6[index - 6] / 100 * bgHeight;
            if (preRSI6Y > 150) {
                preRSI6Y = 150;
            }
            //    if (index > 5) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[0];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI6Y, RSIX, RSI6Y);
            //    }
        }

        //RSI12
        if (index > 11) {
            let RSI12Y = this.Rs12[index - 11] / 100 * bgHeight;
            let preRSI12Y = this.Rs12[index - 12] / 100 * bgHeight;
            if (RSI12Y > 150) {
                RSI12Y = 150;
            }
            if (preRSI12Y > 150) {
                preRSI12Y = 150;
            }
            //   if (index > 11) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[1];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI12Y, RSIX, RSI12Y);
            //  }

        }

        //RSI24
        if (index > 23) {
            let RSI24Y = this.Rs24[index - 23] / 100 * bgHeight;
            let preRSI24Y = this.Rs24[index - 24] / 100 * bgHeight;
            if (RSI24Y > 150) {
                RSI24Y = 150;
            }
            if (preRSI24Y > 150) {
                preRSI24Y = 150;
            }
            //   if (index > 23) {
            this.drawRSI.lineWidth = 2;
            this.drawRSI.strokeColor = GameCfg.RSI_COLOR[2];
            DrawUtils.drawLine(this.drawRSI, preRSIX, preRSI24Y, RSIX, RSI24Y);
            //  }

        }
    }

    onDrawMACD(index) {
        let some = index - cc.ext.beg_end[0];
        this.setLabelValue('MACD');
        //dif
        if (index <= 0) {
            return
        }

        let bgHeight = 150;
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
        let difx = 10 + (some * cc.ext.hz_width)  + cc.ext.hz_width / 2;
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
