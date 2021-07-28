import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";
import GameCfg from "./GameCfg";
import { pb } from '../../protos/proto';
import DrawData from "./DrawData";
//import ComUtils from "../Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    drawBg: cc.Graphics = null;

    @property(cc.Graphics)
    drawMA: cc.Graphics = null;

    @property(cc.Graphics)
    drawBOLL: cc.Graphics = null;

    @property(cc.Graphics)
    drawEXPMA: cc.Graphics = null;

    disValue = 0;       //当前绘制的最高值-当前绘制最低值

    MaList = [];

    BollList = [];           //Boll的前一个绘制点

    maxEXPMA = null;

    EXPMA1 = [];
    EXPMA2 = [];

    btx = [];

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

    topValue = 0;     //当前绘制的最高值

    bottomValue = 0;  //当前绘制最低值

    @property([cc.Label])
    EXPMALabel: cc.Label[] = [];

    sign = false;

    onLoad() {
        this.drawBordWidth = cc.winSize.width - 180 - this.part1.node.width - 25;
        let mixWidth = 6;
        let maxWidth = 80;
        let minCount = parseInt(this.drawBordWidth / maxWidth + '');
        let maxCount = parseInt(this.drawBordWidth / mixWidth + '');

        GlobalEvent.on(EventCfg.CLICKMOVE, (data) => {
            if (data == 'pre') {
                this.onMoveLeftOrRight(1, 1, 0);
            } else {
                this.onMoveLeftOrRight(1, -1, 0);
            }
        }, this);

        GlobalEvent.on(EventCfg.SETMALABEL, (labels) => {
            if (labels && labels.length > 0) {
                this.MAla = labels;
                this.MAla.forEach((el, t) => {
                    el.node.color = GameCfg.MAColor[t];
                })
            }

            //跟新label
            this.updataLabel(GameCfg.huizhidatas - 1);

        }, this);

        //ma boll pcm
        GlobalEvent.on('on_off', (flagData) => {

            this.drawMA.node.active = flagData.ma;

            this.MAla.forEach(el => {
                el.node.active = flagData.ma;
            })
            this.drawBOLL.node.active = flagData.boll;

            this.BOLLLabel.forEach(el => {
                el.node.active = flagData.boll;
            })
            this.drawEXPMA.node.active = flagData.expma;
            //   this.EXPMALabel..active = flagData.expma;
            this.EXPMALabel.forEach(el => {
                el.node.active = flagData.expma;
            })
        }, this);

        //QH
        GlobalEvent.on('onQHDraw', () => {
            this.initData();
            this.initDrawBg();
            //   GlobalEvent.emit('onDraw');
            this.updataLabel(GameCfg.beg_end[1] - 1);
        }, this);


        //每回合的绘制
        GlobalEvent.on('roundNUmber', () => {
            GameCfg.huizhidatas += 1;
            if (10 + (GameCfg.beg_end[1] - GameCfg.beg_end[0] + 1) * GameCfg.hz_width < this.drawBordWidth) {
                GameCfg.beg_end[1] += 1;
            } else {
                if (GameCfg.huizhidatas >= GameCfg.data[0].data.length) {
                    GameCfg.huizhidatas = GameCfg.data[0].data.length;
                    return;
                }

                GameCfg.beg_end[0] += GameCfg.huizhidatas - GameCfg.beg_end[1];
                GameCfg.beg_end[1] = GameCfg.huizhidatas;
            }
            this.initDrawBg();
            GlobalEvent.emit('onDraw');
            this.updataLabel(GameCfg.beg_end[1] - 1);
        }, this);

        let calDisY = 0;
        let calDisX = 0;
        let num = 90;

        //设置画布大小
        GlobalEvent.on('setDrawing', (falg) => {
            this.drawBordWidth = falg ? (this.drawBordWidth + 164) : (this.drawBordWidth - 164);
            // this.drawBordWidth = this.drawBg.node.width - this.part1.node.width - 15;

            this.setDrawing();
        }, this);

        GlobalEvent.on(EventCfg.SET_DRAW_SIZE, (falg) => {
            this.drawBordWidth = falg ? (this.drawBordWidth - 206) : (this.drawBordWidth + 206);
            //  this.drawBordWidth = this.drawBg.node.width - this.part1.node.width - 15;
            this.setDrawing();
        }, this);


        //开始
        this.node.on('touchstart', (event) => {
            GlobalEvent.emit('tipsPoint', event.getLocation().x);
            this.vertical1.active = true;
            this.Horizontal1.active = true;

            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());

            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
            this.vertical1.x = Math.floor((localPos.x - 10) / GameCfg.hz_width) * GameCfg.hz_width + 10 + GameCfg.hz_width / 2;
            this.Horizontal1.y = localPos.y;

            let index = GameCfg.beg_end[0] + (Math.floor((localPos.x - 10) / GameCfg.hz_width));

            if (index >= GameCfg.beg_end[1]) {
                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) + 10 - GameCfg.hz_width / 2;
                index = GameCfg.beg_end[1] - 1;
            }
            else if (index <= GameCfg.beg_end[0]) {
                this.vertical1.x = 10 + GameCfg.hz_width / 2;
            }
            this.updataLabel(index);
        }, this);

        //结束
        this.node.on('touchend', (event) => {
            GlobalEvent.emit('hideTips');
            this.Horizontal1.active = false;
            this.vertical1.active = false;
        }, this)

        //取消
        this.node.on('touchcancel', (event) => {
            GlobalEvent.emit('hideTips');
            this.Horizontal1.active = false;
            this.vertical1.active = false;
        }, this)


        this.node.on('touchmove', (event) => {
            calDisY += event.getDelta().y;
            calDisX += event.getDelta().x;
            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
            //右移   //左移
            if (Math.abs(calDisX) > Math.abs(calDisY)) {
                calDisY = 0;

                if (Math.abs(calDisX) >= (GameCfg.hz_width / 2)) {
                    if (!this.timer) {
                        this.timer = setTimeout(() => {

                            let count = Math.ceil(Math.abs(calDisX) / GameCfg.hz_width);
                            this.onMoveLeftOrRight(count, calDisX, calDisY);

                            //  if (GameCfg.beg_end[1] - GameCfg.beg_end[0] < count) {
                            let index = GameCfg.beg_end[0] + (Math.floor((localPos.x - 10) / GameCfg.hz_width));
                            this.vertical1.x = Math.floor((localPos.x - 10) / GameCfg.hz_width) * GameCfg.hz_width + 10 + GameCfg.hz_width / 2;
                            if (index >= GameCfg.beg_end[1]) {
                                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) + 10 - GameCfg.hz_width / 2;
                                index = GameCfg.beg_end[1] - 1;
                            }
                            else if (index <= GameCfg.beg_end[0]) {
                                this.vertical1.x = 10 + GameCfg.hz_width / 2;
                            }
                            //  }

                            this.updataLabel(index);
                            calDisX = 0;
                            calDisY = 0;
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 20)
                    }
                }
            }
            //放大   //缩小
            else if (Math.abs(calDisY) >= Math.abs(calDisX)) {
                calDisX = 0;

                if (Math.abs(calDisY) >= 2) {
                    if (!this.timer) {

                        this.timer = setTimeout(() => {
                            let preNum = parseInt(this.drawBordWidth / GameCfg.hz_width + '');
                            let hz_width = 0;
                            let w = (parseInt(Math.ceil(Math.abs(calDisY) / 2) + ''));
                            //  hz_width = calDisY > 0 ? GameCfg.hz_width + w : GameCfg.hz_width - w;
                            num = calDisY > 0 ? preNum - w : preNum + w;
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
                                    GameCfg.beg_end[0] = 0;
                                    GameCfg.beg_end[1] = GameCfg.huizhidatas;
                                } else {
                                    let count = GameCfg.beg_end[1] - GameCfg.beg_end[0] - num;

                                    GameCfg.beg_end[0] += parseInt(count / 2 + '');

                                    GameCfg.beg_end[1] -= (count - parseInt(count / 2 + ''));

                                }
                            } else {
                                if (num < GameCfg.huizhidatas) {
                                    let count = num - (GameCfg.beg_end[1] - GameCfg.beg_end[0]);

                                    GameCfg.beg_end[0] -= parseInt(count / 2 + '');
                                    GameCfg.beg_end[1] += (count - parseInt(count / 2 + ''));

                                    if (GameCfg.beg_end[0] < 0) {
                                        GameCfg.beg_end[0] = 0;
                                    }
                                    if (GameCfg.beg_end[1] > GameCfg.huizhidatas) {
                                        GameCfg.beg_end[1] = GameCfg.huizhidatas
                                    }
                                } else {
                                    GameCfg.beg_end[0] = 0;
                                    GameCfg.beg_end[1] = GameCfg.huizhidatas;
                                }
                            }

                            GameCfg.hz_width = this.drawBordWidth / (num);


                            this.Horizontal1.y = localPos.y;
                            let index = GameCfg.beg_end[0] + (Math.floor((localPos.x - 10) / GameCfg.hz_width));
                            if (index >= GameCfg.beg_end[1]) {
                                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) + 10 - GameCfg.hz_width / 2;
                                index = GameCfg.beg_end[1] - 1;
                            } else if (index <= GameCfg.beg_end[0]) {
                                this.vertical1.x = 10 + GameCfg.hz_width / 2;
                            }
                            this.updataLabel(index);
                            calDisY = 0;
                            calDisX = 0;
                            this.initDrawBg();
                            GlobalEvent.emit('onDraw');
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 20);
                    }
                }
            }
        }, this);

        this.initData();

        GlobalEvent.on(EventCfg.NOTICEDRAWMOVW, this.noticeDrawMove.bind(this), this);

        // GlobalEvent.on(EventCfg.RAISINGLIMIT, this.getRaisingLimit.bind(this), this);
    }

    //跳转到标签买卖点
    noticeDrawMove(index) {
        if (index >= GameCfg.beg_end[0] && index < GameCfg.beg_end[1]) {

        }
        else {

            if (index < GameCfg.beg_end[0]) {
                let count = GameCfg.beg_end[0] + parseInt((GameCfg.beg_end[1] - GameCfg.beg_end[0]) / 2 + '') - index;
                // let count = mid - index;
                if (GameCfg.beg_end[0] - count < 0) {
                    GameCfg.beg_end[1] -= (GameCfg.beg_end[0] - count) - count;
                    GameCfg.beg_end[0] = 0;

                } else {

                    GameCfg.beg_end[0] -= count;
                    GameCfg.beg_end[1] -= count;
                }
            } else {
                let count = index - GameCfg.beg_end[0] + parseInt((GameCfg.beg_end[1] - GameCfg.beg_end[0]) / 2 + '');
                // let count = index - mid;
                if (GameCfg.beg_end[1] + count > GameCfg.huizhidatas) {
                    GameCfg.beg_end[0] += (count - (GameCfg.beg_end[1] + count - GameCfg.huizhidatas));
                    GameCfg.beg_end[1] = GameCfg.huizhidatas;
                } else {
                    GameCfg.beg_end[0] += count;
                    GameCfg.beg_end[1] += count;
                }

            }

            this.initDrawBg();
            GlobalEvent.emit('onDraw');
        }

        let x = 10 + ((index - GameCfg.beg_end[0])) * GameCfg.hz_width + GameCfg.hz_width / 2;
        this.vertical1.x = x;
        this.vertical1.active = true;
    }

    onMoveLeftOrRight(count, calDisX, calDisY) {
        if (calDisX > 0) {
            GameCfg.beg_end[1] -= count;
            GameCfg.beg_end[0] -= count;

            if (GameCfg.beg_end[0] < 0) {
                GameCfg.beg_end[0] = 0;
            }

        } else {
            GameCfg.beg_end[0] += count;
            GameCfg.beg_end[1] += count;
            if (GameCfg.beg_end[1] > GameCfg.huizhidatas) {
                GameCfg.beg_end[1] = GameCfg.huizhidatas;
            }
        }
        this.initDrawBg();
        GlobalEvent.emit('onDraw');
    }

    //跟新label
    updataLabel(index) {
        if (index < 0 || GameCfg.beg_end[1] > GameCfg.huizhidatas) {
            return
        }
        this.setMALabelInfo(index);
        this.setBOLLLabelInfo(index);
        this.setEXPMALabelInfo(index)
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

    setEXPMALabelInfo(index) {
        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            let arr = ['EXPMA(' + GameCfg.EXPMA[0] + ',' + GameCfg.EXPMA[1] + ') EXP1: ', ' EXP2: '];
            this.EXPMALabel[0].string = arr[0] + (this.EXPMA1[index]).toFixed(2);
            this.EXPMALabel[1].string = arr[1] + (this.EXPMA2[index]).toFixed(2);
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
        GlobalEvent.off(EventCfg.SETMALABEL);
        GlobalEvent.off(EventCfg.NOTICEDRAWMOVW);
    }

    //绘制初始
    initDrawBg() {
        if (!GameCfg.beg_end[0]) {
            GameCfg.beg_end[0] = 0;
        }
        if (GameCfg.beg_end[0] < 0 || GameCfg.beg_end[1] > GameCfg.huizhidatas) {
            return;
        }

        let viweData = GameCfg.data[0].data;
        if (!viweData || !viweData[GameCfg.beg_end[0]] || !viweData[GameCfg.beg_end[1] - 1]) {
            console.log('行情数据为空' + GameCfg.beg_end[0] + GameCfg.beg_end[1]);
            return;
        }

        this.drawBg.clear();
        this.drawMA.clear();
        this.drawBOLL.clear();
        this.drawEXPMA.clear();

        this.drawBg.lineWidth = 2;
        this.drawMA.lineWidth = 2;
        this.drawBOLL.lineWidth = 2;
        this.drawEXPMA.lineWidth = 2;

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

        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

        for (let index = GameCfg.beg_end[0]; index < GameCfg.beg_end[1]; index++) {

            this.onDrawCandle(viweData[index], index);

            this.onDrawMA(index);

            this.onDrawBoll(index);

            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                this.onDrawEXPMA(index);
            }
        }

    }

    //Boll
    onDrawBoll(index) {
        if (!this.BollList[index]) {
            return;
        }
        let drawBox = this.drawBOLL.node.height;
        if (index >= 20) {
            let prex = 10 + ((index - 1 - GameCfg.beg_end[0])) * GameCfg.hz_width + GameCfg.hz_width / 2;
            let x = 10 + ((index - GameCfg.beg_end[0])) * GameCfg.hz_width + GameCfg.hz_width / 2;
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

        this.EXPMA1 = DrawData.EXPMA1;
        this.EXPMA2 = DrawData.EXPMA2;

        this.btx = DrawData.btx;
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
                let preMAX = 10 + ((index - 1 - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

                let MAY = (this.MaList[index][i] - this.bottomValue) / this.disValue * drawBox + initY;
                let MAX = 10 + ((index - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

                this.drawMA.strokeColor = GameCfg.MAColor[i];
                this.drawLine(this.drawMA, preMAX, preMAY, MAX, MAY, i);

            }
        }
    }

    onDrawEXPMA(index) {
        let drawBox = this.drawEXPMA.node.height;
        if (index > 0) {
            let prey1 = (this.EXPMA1[index - 1] - this.bottomValue) / this.disValue * drawBox;
            let prex = 10 + ((index - 1 - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

            let y1 = (this.EXPMA1[index] - this.bottomValue) / this.disValue * drawBox;
            let x = 10 + ((index - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width / 2;

            let prey2 = (this.EXPMA2[index - 1] - this.bottomValue) / this.disValue * drawBox;
            let y2 = (this.EXPMA2[index] - this.bottomValue) / this.disValue * drawBox;

            this.drawEXPMA.strokeColor = GameCfg.EXPMA_COL[0];
            this.drawLine(this.drawEXPMA, prex, prey1, x, y1);

            this.drawEXPMA.strokeColor = GameCfg.EXPMA_COL[1];
            this.drawLine(this.drawEXPMA, prex, prey2, x, y2);
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
        //宝塔线
        if (GameCfg.GameType == pb.GameType.DingXiang && GameCfg.GameSet.line == '宝塔线') {

            let ptlow = 0, pthigh = 0;
            if (index == 0) {
                this.drawRect(this.drawBg, startX, closeY, endX - startX, openY - closeY, el.open > el.close);
                //
                this.btx[index][2] = el.open > el.close ? 1 : 2;
                minY = openY;
                maxY = closeY;
            } else {

                minY = (this.btx[index - 1][0] - this.bottomValue) / this.disValue * drawBox + initY;
                maxY = (this.btx[index - 1][1] - this.bottomValue) / this.disValue * drawBox + initY;
                let max = Math.max(minY, maxY);
                let min = Math.min(minY, maxY);
                //绿
                if (this.btx[index - 1][2] == 1) {

                    if (max < closeY && max != maxY) {
                        this.btx[index][2] = max;
                        this.drawRect(this.drawBg, startX, max, endX - startX, closeY - max, false);
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, max - maxY, true);
                    }
                    else if (max < closeY) {
                        this.btx[index][2] = 2;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, false);
                    }
                    else {
                        this.btx[index][2] = 1;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, true);
                    }
                }
                //红
                else if (this.btx[index - 1][2] == 2) {

                    if (closeY < min && min == maxY) {
                        this.btx[index][2] = 1;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, true);
                    }
                    else if (closeY > min) {
                        this.btx[index][2] = 2;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, false);
                    }
                    else {
                        this.drawRect(this.drawBg, startX, min, endX - startX, max - min, false);
                        this.drawRect(this.drawBg, startX, closeY, endX - startX, min - closeY, true);
                        this.btx[index][2] = min;
                    }
                } else {

                    if (closeY < min && min == maxY) {
                        this.btx[index][2] = 1;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, true);
                    }
                    else if (closeY > min) {
                        this.btx[index][2] = 2;
                        this.drawRect(this.drawBg, startX, maxY, endX - startX, closeY - maxY, false);
                    }
                    else {
                        this.drawRect(this.drawBg, startX, min, endX - startX, max - min, false);
                        this.drawRect(this.drawBg, startX, closeY, endX - startX, min - closeY, true);
                        this.btx[index][2] = min;
                    }
                }

                ptlow = closeY > maxY ? maxY : closeY;
                pthigh = closeY > maxY ? closeY : minY;
            }

            let lowX = startX + (endX - startX) / 2;
            posInfo.lowPos = cc.v2(lowX, ptlow);
            posInfo.highPos = cc.v2(lowX, pthigh);

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

    //
    drawClear(ctx) {
        DrawUtils.drawClear(ctx);
    }

    setDrawing() {
        let num = parseInt(this.drawBordWidth / GameCfg.hz_width + '');
        GameCfg.beg_end[1] = GameCfg.huizhidatas;
        GameCfg.beg_end[0] = GameCfg.beg_end[1] - num;
        if (GameCfg.beg_end[0] <= 0) {
            GameCfg.beg_end[0] = 0;
        }
        this.initDrawBg();
        GlobalEvent.emit('onDraw');
    }

    //获取涨停板
    getRaisingLimit(index) {
        let falg = DrawData.getRaisingLimit(index);
        return !!falg;
    }
}
