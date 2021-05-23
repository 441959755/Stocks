import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";
import GameCfg from "./GameCfg";
import GameData from '../GameData';
import { pb } from '../../protos/proto';
import DrawData from "./DrawData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    drawBg: cc.Graphics = null;

    @property(cc.Graphics)
    drawMA: cc.Graphics = null;

    @property(cc.Graphics)
    drawBOLL: cc.Graphics = null;

    disValue = 0;       //当前绘制的最高值-当前绘制最低值

    MaList = [];

    BollList = [];           //Boll的前一个绘制点



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

    drawBordWidth = 1080;

    @property(cc.Node)
    Horizontal1: cc.Node = null;

    @property(cc.Node)
    vertical1: cc.Node = null;

    MAla = [];

    @property([cc.Label])
    BOLLLabel: cc.Label[] = [];


    timer = null;

    btxPreCloseY = [];     ///宝塔前一日收盘价

    btxPreOpenY = [];

    btxChg = [];        ///宝塔线前一日的涨跌
    // btxList = [];


    //   multScale = 1;
    topValue = 0;     //当前绘制的最高值

    bottomValue = 0;  //当前绘制最低值

    onLoad() {
        GlobalEvent.on(EventCfg.CLICKMOVE, (data) => {
            if (data == 'pre') {
                this.onMoveLeftOrRight(1, 1, 0);
            } else {
                this.onMoveLeftOrRight(1, -1, 0);
            }

        }, this);

        GlobalEvent.on(EventCfg.SETMALABEL, (labels) => {
            this.MAla = labels;
            this.updataLabel(cc.ext.beg_end[1] - 1);
            this.MAla.forEach((el, t) => {
                el.node.color = GameCfg.MAColor[t];
            })
        }, this);

        //ma boll pcm
        GlobalEvent.on('on_off', (flagData) => {
            this.drawMA.node.active = flagData.maboll;
            this.MAla.forEach(el => {
                el.node.active = flagData.maboll;
            })
            this.drawBOLL.node.active = !flagData.maboll;
            this.BOLLLabel.forEach(el => {
                el.node.active = !flagData.maboll;
            })
        }, this);

        //QH
        GlobalEvent.on('onQHDraw', () => {
            this.initData();
            this.initDrawBg();
            //   GlobalEvent.emit('onDraw');
            this.updataLabel(cc.ext.beg_end[1] - 1);
        }, this);


        //每回合的绘制
        GlobalEvent.on('roundNUmber', () => {
            GameCfg.huizhidatas += 1;
            if (10 + (cc.ext.beg_end[1] - cc.ext.beg_end[0] + 1) * cc.ext.hz_width < this.drawBordWidth) {
                cc.ext.beg_end[1] += 1;
            } else {
                if (GameCfg.huizhidatas >= GameCfg.data[0].data.length) {
                    GameCfg.huizhidatas = GameCfg.data[0].data.length;
                    return;
                }

                cc.ext.beg_end[0] += GameCfg.huizhidatas - cc.ext.beg_end[1];
                cc.ext.beg_end[1] = GameCfg.huizhidatas;
            }
            this.initDrawBg();
            GlobalEvent.emit('onDraw');
            this.updataLabel(cc.ext.beg_end[1] - 1);
        }, this);

        let calDisY = 0;
        let calDisX = 0;
        let num = 90;

        //设置画布大小
        GlobalEvent.on('setDrawing', (falg) => {
            this.drawBordWidth = falg ? (this.drawBordWidth + 164) : (this.drawBordWidth - 164);
            this.setDrawing();
        }, this);

        GlobalEvent.on(EventCfg.SET_DRAW_SIZE, (falg) => {
            this.drawBordWidth = falg ? (this.drawBordWidth - 206) : (this.drawBordWidth + 206);
            this.setDrawing();
        }, this);


        //开始
        this.node.on('touchstart', (event) => {
            GlobalEvent.emit('tipsPoint', event.getLocation().x);
            this.vertical1.active = true;
            this.Horizontal1.active = true;

            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());

            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
            this.vertical1.x = Math.floor((localPos.x - 10) / cc.ext.hz_width) * cc.ext.hz_width + 10 + cc.ext.hz_width / 2;
            this.Horizontal1.y = localPos.y;
            let index = cc.ext.beg_end[0] + (Math.floor((localPos.x - 10) / cc.ext.hz_width));

            if (index >= cc.ext.beg_end[1]) {
                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                index = cc.ext.beg_end[1] - 1;
            }
            this.updataLabel(index);
        }, this);

        //结束
        this.node.on('touchend', (event) => {
            GlobalEvent.emit('hideTips');
            this.Horizontal1.active = false;
            this.vertical1.active = false;
        })

        //取消
        this.node.on('touchcancel', (event) => {
            GlobalEvent.emit('hideTips');
            this.Horizontal1.active = false;
            this.vertical1.active = false;
        })
        let mixWidth = 6;
        let maxWidth = 80;
        let minCount = parseInt(this.drawBordWidth / maxWidth + '');
        let maxCount = parseInt(this.drawBordWidth / mixWidth + '');

        this.node.on('touchmove', (event) => {
            calDisY += event.getDelta().y;
            calDisX += event.getDelta().x;
            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
            //右移   //左移
            if (Math.abs(calDisX) > Math.abs(calDisY)) {
                calDisY = 0;

                if (Math.abs(calDisX) >= (cc.ext.hz_width / 2)) {
                    if (!this.timer) {
                        this.timer = setTimeout(() => {

                            let count = Math.ceil(Math.abs(calDisX) / cc.ext.hz_width);
                            this.onMoveLeftOrRight(count, calDisX, calDisY);

                            //  if (cc.ext.beg_end[1] - cc.ext.beg_end[0] < count) {
                            let index = cc.ext.beg_end[0] + (Math.floor((localPos.x - 10) / cc.ext.hz_width));
                            this.vertical1.x = Math.floor((localPos.x - 10) / cc.ext.hz_width) * cc.ext.hz_width + 10 + cc.ext.hz_width / 2;
                            if (index >= cc.ext.beg_end[1]) {
                                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                                index = cc.ext.beg_end[1] - 1;
                            }
                            //  }

                            this.updataLabel(index);
                            calDisX = 0;
                            calDisY = 0;
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 10)
                    }
                }
            }
            //放大   //缩小
            else if (Math.abs(calDisY) >= Math.abs(calDisX)) {
                calDisX = 0;

                if (Math.abs(calDisY) >= 2) {
                    if (!this.timer) {

                        this.timer = setTimeout(() => {
                            let preNUm = parseInt(this.drawBordWidth / cc.ext.hz_width + '');
                            let hz_width = 0;
                            let w = (parseInt(Math.ceil(Math.abs(calDisY) / 2) + ''));
                            //  hz_width = calDisY > 0 ? cc.ext.hz_width + w : cc.ext.hz_width - w;
                            num = calDisY > 0 ? preNUm - w : preNUm + w;
                            if (num <= minCount) {
                                num = minCount
                            }
                            if (num >= maxCount) {
                                num = maxCount
                            }
                            hz_width = this.drawBordWidth / num;
                            if (hz_width < mixWidth) {
                                hz_width = mixWidth;
                            } else if (hz_width > maxWidth) {
                                hz_width = maxWidth;
                            }
                            num = parseInt(this.drawBordWidth / hz_width + '');

                            if (calDisY > 0) {
                                if (num > GameCfg.huizhidatas) {
                                    cc.ext.beg_end[0] = 0;
                                    cc.ext.beg_end[1] = GameCfg.huizhidatas;
                                } else {
                                    let count = cc.ext.beg_end[1] - cc.ext.beg_end[0] - num;

                                    cc.ext.beg_end[0] += parseInt(count / 2 + '');

                                    cc.ext.beg_end[1] -= (count - parseInt(count / 2 + ''));

                                }
                            } else {
                                if (num < GameCfg.huizhidatas) {
                                    let count = num - (cc.ext.beg_end[1] - cc.ext.beg_end[0]);
                                    if (cc.ext.beg_end[1] == GameCfg.huizhidatas) {
                                        cc.ext.beg_end[0] -= parseInt(count + '');
                                    } else if (cc.ext.beg_end[1] == 0) {
                                        cc.ext.beg_end[1] -= parseInt(count + '');
                                    } else {
                                        cc.ext.beg_end[0] -= parseInt(count / 2 + '');
                                        cc.ext.beg_end[1] += (count - parseInt(count / 2 + ''));
                                    }

                                    if (cc.ext.beg_end[0] < 0) {
                                        cc.ext.beg_end[0] = 0;
                                    }
                                    if (cc.ext.beg_end[1] > GameCfg.huizhidatas) {
                                        cc.ext.beg_end[1] = GameCfg.huizhidatas
                                    }
                                } else {
                                    cc.ext.beg_end[0] = 0;
                                    cc.ext.beg_end[1] = GameCfg.huizhidatas;
                                }
                            }

                            //  this.multScale = this.drawBordWidth / (num) / cc.ext.hz_width;
                            //    GlobalEvent.emit(EventCfg.ONMARKRANGESHOWORHIDE);

                            cc.ext.hz_width = this.drawBordWidth / (num);


                            this.Horizontal1.y = localPos.y;
                            let index = cc.ext.beg_end[0] + (Math.floor((localPos.x - 10) / cc.ext.hz_width));
                            if (index >= cc.ext.beg_end[1]) {
                                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                                index = cc.ext.beg_end[1] - 1;
                            }
                            this.updataLabel(index);
                            calDisY = 0;
                            calDisX = 0;
                            this.initDrawBg();
                            GlobalEvent.emit('onDraw');
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 10);
                    }
                }
            }
        }, this);

        // if (GameCfg.GameType == pb.GameType.ZhiBiao) {
        //     this.drawBordWidth += 164;
        // }

        this.initData();
    }

    onMoveLeftOrRight(count, calDisX, calDisY) {
        if (calDisX > 0) {
            if (cc.ext.beg_end[0] == 0) {
                clearTimeout(this.timer);
                this.timer = null;
                calDisX = 0;
                calDisY = 0;
                return;
            }
            if (cc.ext.beg_end[0] - count >= 0) {
                cc.ext.beg_end[1] -= count;
                cc.ext.beg_end[0] -= count;
            } else {
                count = cc.ext.beg_end[0];
                cc.ext.beg_end[0] -= count;
                cc.ext.beg_end[1] -= count;
            }
        } else {
            if (GameCfg.huizhidatas == cc.ext.beg_end[1]) {
                clearTimeout(this.timer);
                this.timer = null;
                calDisX = 0;
                calDisY = 0;
                return;
            }
            if (cc.ext.beg_end[1] + count < GameCfg.huizhidatas) {
                cc.ext.beg_end[0] += count;
                cc.ext.beg_end[1] += count;
            } else {
                count = GameCfg.huizhidatas - cc.ext.beg_end[1];
                cc.ext.beg_end[0] += count;
                cc.ext.beg_end[1] += count;
            }
        }
        this.initDrawBg();
        GlobalEvent.emit('onDraw');
    }

    //跟新label
    updataLabel(index) {
        if (!index || index <= 1) {
            return
        }
        this.setMALabelInfo(index);
        this.setBOLLLabelInfo(index);
        GlobalEvent.emit('updataLabel', index);
    }

    // ma boll
    setMALabelInfo(index) {
        if (this.MaList[index]) {
            this.MAla.forEach((el, t) => {
                if (this.MaList[index][t]) {
                    //   el.node.color = GameCfg.MAColor[t];
                    if (t == 0) {
                        if (GameCfg.GameType == pb.GameType.QiHuo) {
                            el.string = ' MA' + GameCfg.MAs[t] + ': ' + this.MaList[index][t].toFixed(2);
                        } else {
                            el.string = GameCfg.GameSet.ZLine + ' MA' + GameCfg.MAs[t] + ': ' + this.MaList[index][t].toFixed(2);
                        }

                    } else {
                        el.string = 'MA' + GameCfg.MAs[t] + ': ' + this.MaList[index][t].toFixed(2);
                    }

                }
            })
        }
    }

    //bol
    setBOLLLabelInfo(index) {
        let arr = ['BOLL(' + GameCfg.BOLL[0] + ') BOLL', 'UB', 'LB'];
        if (this.BollList[index]) {
            this.BOLLLabel.forEach((el, t) => {
                //  el.node.color = GameCfg.BOLLColor[t];
                if (this.BollList[index][t]) {
                    el.string = arr[t] + ': ' + this.BollList[index][t].toFixed(2);
                }
            })
        }
    }



    onShow() {
        this.initDrawBg();

        this.BOLLLabel.forEach((el, t) => {
            el.node.color = GameCfg.BOLLColor[t];
            el.node.active = false;
        })

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.MABOLLSWITCH);
        this.node.off('touchstart');
        this.node.off('touchend');
        this.node.off('touchcancel');
        this.node.off('touchmove');
        GlobalEvent.off('setDrawing');
        GlobalEvent.off('on_off');
        //   GlobalEvent.off('labelPoint');
        //  GlobalEvent.off('onBuyOrSell');
        GlobalEvent.off(EventCfg.SETMALABEL)
    }

    //绘制初始
    initDrawBg() {
        if (cc.ext.beg_end[0] < 0 || cc.ext.beg_end[1] > GameCfg.huizhidatas) {
            return;
        }
        this.drawBg.clear();
        this.drawMA.clear();
        this.drawBOLL.clear();


        this.drawBg.lineWidth = 2;
        this.drawMA.lineWidth = 2;
        this.drawBOLL.lineWidth = 2;

        if (cc.winSize.width > this.node.width) {
            this.drawBordWidth = 1280;
        }

        let viweData = GameCfg.data[0].data;

        if (!viweData || !viweData[cc.ext.beg_end[0]]) {
            console.log('行情数据为空');
            return;
        }

        if (!viweData || viweData.length <= 0) { return }

        this.bottomValue = viweData[0].low;

        this.topValue = 0;
        //  this.topVol = 0;

        for (let i = cc.ext.beg_end[0]; i < cc.ext.beg_end[1]; i++) {
            this.topValue = Math.max(this.topValue, viweData[i].high);     //最高价
            this.bottomValue = Math.min(this.bottomValue, viweData[i].low); //最低价

        }

        this.disValue = this.topValue - this.bottomValue;
        this.part1.string = this.topValue.toFixed(2) + '';
        this.part2.string = (this.bottomValue + this.disValue / 4 * 3).toFixed(2);
        this.part3.string = (this.bottomValue + this.disValue / 4 * 2).toFixed(2);
        this.part4.string = (this.bottomValue + this.disValue / 4 * 1).toFixed(2);
        this.part5.string = this.bottomValue.toFixed(2);
        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
        for (let index = cc.ext.beg_end[0]; index < cc.ext.beg_end[1]; index++) {

            this.onDrawCandle(viweData[index], index);

            this.onDrawMA(index);

            this.onDrawBoll(index);


        }

    }

    //Boll
    onDrawBoll(index) {
        if (!this.BollList[index]) {
            return;
        }

        let drawBox = this.drawBOLL.node.height;
        if (index >= 20) {
            let prex = 10 + ((index - 1 - cc.ext.beg_end[0])) * cc.ext.hz_width + cc.ext.hz_width / 2;
            let x = 10 + ((index - cc.ext.beg_end[0])) * cc.ext.hz_width + cc.ext.hz_width / 2;
            for (let j = 0; j < 3; j++) {
                let prey = (this.BollList[index - 1][j] - this.bottomValue) / this.disValue * drawBox;
                let y = (this.BollList[index][j] - this.bottomValue) / this.disValue * drawBox;
                this.drawBOLL.strokeColor = GameCfg.BOLLColor[j];
                this.drawLine(this.drawBOLL, prex, prey, x, y);
            }
        }
    }


    initData() {
        //绘制的数据
        let data = GameCfg.data[0].data;

        DrawData.initData(data);

        this.MaList = DrawData.MaList;
        this.BollList = DrawData.BollList;

    }

    //曲线MA
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
                let preMAX = 10 + ((index - 1 - cc.ext.beg_end[0]) * cc.ext.hz_width) + cc.ext.hz_width / 2;

                let MAY = (this.MaList[index][i] - this.bottomValue) / this.disValue * drawBox + initY;
                let MAX = 10 + ((index - cc.ext.beg_end[0]) * cc.ext.hz_width) + cc.ext.hz_width / 2;

                this.drawMA.strokeColor = GameCfg.MAColor[i];
                this.drawLine(this.drawMA, preMAX, preMAY, MAX, MAY, i);
            }
        }
    }

    //绘制蜡烛线 曲线 、宝塔线
    onDrawCandle(el, index) {

        let posInfo = {
            highPos: null,
            lowPos: null,
            index: index,
            // muit: this.multScale,
        }
        let initY = 0;
        let drawBox = this.drawBg.node.height;
        let some = index - cc.ext.beg_end[0];
        let startX = some == 0 ? 10 : 10 + (some * cc.ext.hz_width);
        let endX = 10 + ((some + 1) * cc.ext.hz_width);
        //根据区间价格决定坐标
        let openValue = (el.open - this.bottomValue);
        let openY = openValue / this.disValue * drawBox + initY;
        let closeValue = (el.close - this.bottomValue)
        let closeY = closeValue / this.disValue * drawBox + initY;

        let maxY, minY;
        //宝塔线
        if (GameCfg.GameType == pb.GameType.DingXiang && GameData.DXSet.line == '宝塔线') {
            let ptlow = 0, pthigh = 0;
            if (index == 0) {
                if (!this.btxPreCloseY[index]) {
                    this.btxChg[index] = el.open >= el.close ? false : true;

                    this.btxPreCloseY[index] = openValue > closeValue ? openValue : closeValue;
                    this.btxPreOpenY[index] = openValue < closeValue ? openValue : closeValue;
                }
                this.drawRect(this.drawBg, startX, closeY, endX - startX, openY - closeY, el.open > el.close);

            } else {
                //前一日上涨
                if (this.btxChg[index - 1]) {
                    //下跌
                    if (el.open > el.close) {

                        if (closeValue >= this.btxPreOpenY[index - 1]) {

                            maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;
                            this.drawRect(this.drawBg, startX, closeY, endX - startX, maxY - closeY, false);
                            ptlow = closeY;
                            pthigh = maxY;
                            // this.btxPreCloseY = closeY;
                            if (!this.btxPreOpenY[index]) {
                                this.btxPreOpenY[index] = closeValue;
                                this.btxPreCloseY[index] = this.btxPreCloseY[index - 1]
                                this.btxChg[index] = false;
                            }
                        } else if (closeValue < this.btxPreOpenY[index - 1]) {
                            minY = this.btxPreOpenY[index - 1] / this.disValue * drawBox + initY;
                            maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;

                            this.drawRect(this.drawBg, startX, minY, endX - startX, maxY - minY, false);
                            this.drawRect(this.drawBg, startX, closeY, endX - startX, minY - closeY, true);

                            ptlow = closeY;
                            pthigh = maxY;

                            if (!this.btxPreOpenY[index]) {
                                this.btxPreOpenY[index] = closeValue;
                                this.btxPreCloseY[index] = this.btxPreCloseY[index - 1]
                                this.btxChg[index] = false;
                            }
                        }
                    } else {
                        minY = this.btxPreOpenY[index - 1] / this.disValue * drawBox + initY;
                        maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, false);

                        ptlow = maxY;
                        pthigh = closeY;

                        if (!this.btxPreOpenY[index]) {
                            this.btxPreOpenY[index] = this.btxPreCloseY[index - 1];
                            this.btxPreCloseY[index] = closeValue;
                            this.btxChg[index] = true;
                        }
                    }

                } else {
                    //上涨
                    if (el.open < el.close) {
                        if (closeValue <= this.btxPreCloseY[index - 1]) {
                            minY = this.btxPreOpenY[index - 1] / this.disValue * drawBox + initY;
                            maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;
                            this.drawRect(this.drawBg, startX, minY, endX - startX, closeY - minY, true);

                            if (!this.btxPreOpenY[index]) {
                                this.btxPreOpenY[index] = this.btxPreOpenY[index - 1];
                                this.btxPreCloseY[index] = closeValue;
                                this.btxChg[index] = true;
                            }

                            ptlow = minY;
                            pthigh = closeY;

                        } else if (closeValue > this.btxPreCloseY[index - 1]) {
                            minY = this.btxPreOpenY[index - 1] / this.disValue * drawBox + initY;
                            maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;
                            this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, false);
                            this.drawRect(this.drawBg, startX, minY, endX - startX, maxY - minY, true);
                            //  this.btxPreCloseY = closeY;

                            if (!this.btxPreOpenY[index]) {
                                this.btxPreOpenY[index] = this.btxPreOpenY[index - 1];
                                this.btxPreCloseY[index] = closeValue;
                                this.btxChg[index] = true;
                            }

                            ptlow = minY;
                            pthigh = closeY;
                        }

                    }
                    //下跌
                    else {
                        minY = this.btxPreOpenY[index - 1] / this.disValue * drawBox + initY;
                        maxY = this.btxPreCloseY[index - 1] / this.disValue * drawBox + initY;
                        this.drawRect(this.drawBg, startX, minY, endX - startX, minY - closeY, true);
                        // this.btxPreOpenY = closeY;

                        ptlow = closeY;
                        pthigh = minY;

                        if (!this.btxPreOpenY[index]) {
                            this.btxPreOpenY[index] = closeValue;
                            this.btxPreCloseY[index] = this.btxPreCloseY[index - 1];
                            this.btxChg[index] = false;
                        }
                        // this.btxPreCloseY=
                    }
                }
                // this.btxChg = el.open > el.close ? false : true;
            }
            // minY = this.btxPreOpenY[index] / this.disValue * drawBox + initY;
            // maxY = this.btxPreCloseY[index] / this.disValue * drawBox + initY;
            let lowX = startX + (endX - startX) / 2;
            posInfo.lowPos = cc.v2(lowX, ptlow);
            posInfo.highPos = cc.v2(lowX, pthigh);
            //  this.btxPreCloseY = closeY;
            // this.btxPreOpenY = openY;
            // console.log(JSON.stringify(this.btxChg));
            // console.log(JSON.stringify(this.btxPreOpenY));
            // console.log(JSON.stringify(this.btxPreCloseY));

        } else {

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
                if (el.open > el.close) {
                    lowPrice = el.close;
                    highPrice = el.open;
                }
                //涨了
                else if (el.open < el.close) {
                    lowPrice = el.open;
                    highPrice = el.close;
                }
                this.drawRect(this.drawBg, startX, closeY, endX - startX, openY - closeY, el.open > el.close);
            }


            //画最高价、
            if (el.high >= highPrice) {
                let highY = (el.high - this.bottomValue) / this.disValue * drawBox + initY;
                let highX = startX + (endX - startX) / 2;
                let hy = openY > closeY ? openY : closeY;
                this.drawLine(this.drawBg, highX, highY, highX, hy);
                posInfo.highPos = cc.v2(highX, highY);
            }
            //画最低
            if (el.low <= lowPrice) {
                let lowY = (el.low - this.bottomValue) / this.disValue * drawBox + initY;
                let lowX = startX + (endX - startX) / 2;
                let hy = openY < closeY ? openY : closeY;
                this.drawLine(this.drawBg, lowX, lowY, lowX, hy);
                posInfo.lowPos = cc.v2(lowX, lowY);
            }
        }

        //posInfo.lowPos = cc.v2(lowX, lowY - 20);

        GlobalEvent.emit(EventCfg.ONMARKUPDATE, posInfo);

    }



    //成交量绘制
    start() {
        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            if (GameCfg.GameSet.select != '均线') {
                this.drawMA.node.active = false;
            }
            if (GameCfg.GameSet.select != 'BOLL') {
                this.drawBOLL.node.active = false;
            }

            // setTimeout(() => {
            //     GlobalEvent.emit('setDrawing', true);
            // }, 500);
        }

        this.onShow();

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
        DrawUtils.drawRect(ctx, x + 3, y, w - 3, h, col);
    }

    //
    drawClear(ctx) {
        DrawUtils.drawClear(ctx);
    }

    setDrawing() {
        let num = parseInt(this.drawBordWidth / cc.ext.hz_width + '');
        cc.ext.beg_end[1] = GameCfg.huizhidatas;
        cc.ext.beg_end[0] = cc.ext.beg_end[1] - num;
        if (cc.ext.beg_end[0] <= 0) {
            cc.ext.beg_end[0] = 0;
        }
        this.initDrawBg();
        GlobalEvent.emit('onDraw');
    }

}
