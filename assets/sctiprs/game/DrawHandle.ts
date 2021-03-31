import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";
import GameCfg from "./GameCfg";


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
    drawVol: cc.Graphics = null;

    @property(cc.Graphics)
    drawPCM: cc.Graphics = null;

    topValue = 0;     //当前绘制的最高值

    bottomValue = 0;  //当前绘制最低值

    topVol = 0;     //最高成交量

    bottomVol = 0;  //最低成交量

    disValue = 0;       //当前绘制的最高值-当前绘制最低值


    MaList = [];          //MA的前一个绘制点

    BollList = [];           //Boll的前一个绘制点

    VolList = [];            //均量线

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

    initDrawNumber = 90;

    drawBordWidth = 1080;

    @property(cc.Node)
    Horizontal1: cc.Node = null;

    @property(cc.Node)
    vertical1: cc.Node = null;

    MAla = [];

    @property([cc.Label])
    BOLLLabel: cc.Label[] = [];


    timer = null;

    onLoad() {

        GlobalEvent.on(EventCfg.SETMALABEL, (labels) => {
            this.MAla = labels;
            this.updataLabel(cc.ext.beg_end[1]);
        }, this);

        //买入卖出
        // GlobalEvent.on('onBuyOrSell', this.onBuyOrSell.bind(this), this);

        //ma boll pcm
        GlobalEvent.on('on_off', (flagData) => {
            this.drawMA.node.active = !flagData.maboll;
            this.drawBOLL.node.active = flagData.maboll;
            this.drawPCM.node.active = flagData.cpm;
            this.drawVol.node.children[0].active = true;
            if (flagData.macd || flagData.kdj || flagData.rsi) {
                this.drawVol.node.children[0].active = false;
            }
        }, this);


        //每回合的绘制
        GlobalEvent.on('roundNUmber', () => {
            GameCfg.huizhidatas += 1;
            if (10 + (cc.ext.beg_end[1] - cc.ext.beg_end[0] + 1) * cc.ext.hz_width < this.drawBordWidth) {
                cc.ext.beg_end[1] += 1;
            } else {
                if (GameCfg.huizhidatas >= cc.ext.gameData.gameDatas[0].data.length) {
                    GameCfg.huizhidatas = cc.ext.gameData.gameDatas[0].data.length;
                    return;
                }
                //  if(cc.ext.beg_end[1]>=cc.ext.gameData.gameDatas[0].data.length)
                cc.ext.beg_end[0] += GameCfg.huizhidatas - cc.ext.beg_end[1];
                cc.ext.beg_end[1] = GameCfg.huizhidatas;
            }
            this.initDrawBg();
            GlobalEvent.emit('onDraw');
            this.updataLabel(cc.ext.beg_end[1]);
        }, this);

        if (cc.ext.gameData.gameDatas) {
            this.initData();
        }

        let calDisY = 0;
        let calDisX = 0;
        let num = 90;


        //设置画布大小
        GlobalEvent.on('setDrawing', (falg) => {

            this.drawBordWidth = falg ? (this.drawBordWidth + 164) : (this.drawBordWidth - 164);
            num = parseInt(this.drawBordWidth / cc.ext.hz_width + '');
            cc.ext.beg_end[1] = GameCfg.huizhidatas;
            cc.ext.beg_end[0] = cc.ext.beg_end[1] - num;
            if (cc.ext.beg_end[0] <= 0) {
                cc.ext.beg_end[0] = 0;
            }

            this.initDrawBg();
            GlobalEvent.emit('onDraw');
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

            if ((10 + cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0])) < this.vertical1.x) {
                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                index = cc.ext.beg_end[1];
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

            //右移   //左移
            if (Math.abs(calDisX) > Math.abs(calDisY)) {
                calDisY = 0;
                // if (event.getDelta().x > 0 && calDisX < 0) {
                //     calDisX = event.getDelta().x;
                //     if (this.timer) {
                //         clearTimeout(this.timer);
                //         this.timer = null;
                //     }
                // } else if (event.getDelta().x < 0 && calDisX > 0) {
                //     calDisX = event.getDelta().x;
                //     if (this.timer) {
                //         clearTimeout(this.timer);
                //         this.timer = null;
                //     }
                // } else {
                //     calDisX += event.getDelta().x;
                // }
                if (Math.abs(calDisX) >= (cc.ext.hz_width / 2)) {
                    if (!this.timer) {
                        this.timer = setTimeout(() => {
                            let count = Math.ceil(Math.abs(calDisX) / cc.ext.hz_width);
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
                            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
                            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
                            let index = cc.ext.beg_end[0] + (Math.floor((localPos.x - 10) / cc.ext.hz_width));
                            if (index > cc.ext.beg_end[1]) {
                                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                                index = cc.ext.beg_end[1];
                            }
                            this.updataLabel(index);
                            calDisX = 0;
                            calDisY = 0;
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 5)
                    }
                }
            }
            //放大   //缩小
            else if (Math.abs(calDisY) >= Math.abs(calDisX)) {
                calDisX = 0;
                // if (event.getDelta().y > 0 && calDisY < 0) {
                //     calDisY = event.getDelta().y;
                //     if (this.timer) {
                //         clearTimeout(this.timer);
                //         this.timer = null;
                //     }
                // } else if (event.getDelta().y < 0 && calDisY > 0) {
                //     calDisY = event.getDelta().y;
                //     if (this.timer) {
                //         clearTimeout(this.timer);
                //         this.timer = null;
                //     }
                // } else {
                //     calDisY += event.getDelta().y;
                // }

                if (Math.abs(calDisY) >= 2) {
                    if (!this.timer) {

                        this.timer = setTimeout(() => {
                            let preNUm = parseInt(this.drawBordWidth / cc.ext.hz_width + '');
                            let hz_width = 0;
                            let w = (parseInt(Math.ceil(Math.abs(calDisY) / 2) + ''));
                            //  hz_width = calDisY > 0 ? cc.ext.hz_width + w : cc.ext.hz_width - w;
                            num = calDisY > 0 ? preNUm - w : preNUm + w;
                            if (num <= minCount) { num = minCount }
                            if (num >= maxCount) { num = maxCount }
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
                            cc.ext.hz_width = this.drawBordWidth / (num);
                            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
                            let localPos = this.node.children[0].convertToNodeSpaceAR(pos);
                            this.Horizontal1.y = localPos.y;
                            let index = cc.ext.beg_end[0] + (Math.floor((localPos.x - 10) / cc.ext.hz_width));
                            if (index > cc.ext.beg_end[1]) {
                                this.vertical1.x = cc.ext.hz_width * (cc.ext.beg_end[1] - cc.ext.beg_end[0]) + 10 - cc.ext.hz_width / 2;
                                index = cc.ext.beg_end[1];
                            }
                            this.updataLabel(index);
                            calDisY = 0;
                            calDisX = 0;
                            this.initDrawBg();
                            GlobalEvent.emit('onDraw');
                            clearTimeout(this.timer);
                            this.timer = null;
                        }, 5);
                    }
                }
            }
        }, this);
    }

    //跟新label
    updataLabel(index) {
        if (!index || index <= 1) {
            return
        }
        this.setMALabelInfo(index - 1);
        this.setBOLLLabelInfo(index - 1);
        this.setVOLInfo(index - 1);
        GlobalEvent.emit('updataLabel', index);
    }

    // ma boll
    setMALabelInfo(index) {
        if (this.MaList[index] != 'null' && this.MaList[index]) {
            this.MAla.forEach((el, t) => {
                if (this.MaList[index][t]) {
                 //   el.node.color = GameCfg.MAColor[t];
                    if (t == 0) {
                        el.string = '日线 MA' + GameCfg.MAs[t] + ': ' + this.MaList[index][t].toFixed(2);
                    } else {
                        el.string = 'MA' + GameCfg.MAs[t] + ': ' + this.MaList[index][t].toFixed(2);
                    }

                }
            })
        }
    }

    //bol
    setBOLLLabelInfo(index) {
        let arr = ['BOLL(20) BOLL', 'UB', 'LB'];
        if (this.BollList[index] && this.BollList[index] != 'null') {
            this.BOLLLabel.forEach((el, t) => {
              //  el.node.color = GameCfg.BOLLColor[t];
                if (this.BollList[index][t]) {
                    el.string = arr[t] + ': ' + this.BollList[index][t].toFixed(2);
                }
            })
        }
    }

    setVOLInfo(index) {

        if (cc.ext.gameData.gameDatas[0].data[index]) {
            let value = parseFloat(cc.ext.gameData.gameDatas[0].data[index].value);
            this.drawVol.node.children[0].getComponent(cc.Label).string = 'VOL(5,10): ' + value.toFixed(2);
        }
    }

    protected onEnable() {
        this.drawVol.node.children[0].color=GameCfg.VOLColor[0];
        this.BOLLLabel.forEach((el,t)=>{
            el.node.color=GameCfg.BOLLColor[t];
        })
        this.MAla.forEach((el,t)=>{
            el.node.color=GameCfg.MAColor[t];
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
        GlobalEvent.off('labelPoint');
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
        this.drawVol.clear();
        this.drawPCM.clear();

        let viweData = cc.ext.gameData.gameDatas[0].data;

        this.bottomValue = viweData[0].low;
        this.bottomVol = viweData[0].value;
        this.topValue = 0;
        this.topVol = 0;

        for (let i = cc.ext.beg_end[0]; i < cc.ext.beg_end[1]; i++) {
            this.topValue = Math.max(this.topValue, viweData[i].high);     //最高价
            this.bottomValue = Math.min(this.bottomValue, viweData[i].low); //最低价

            this.topVol = Math.max(this.topVol, viweData[i].value);
            this.bottomVol = Math.min(this.bottomVol, viweData[i].value);
        }

        this.disValue = this.topValue - this.bottomValue;
        this.part1.string = this.topValue.toFixed(2) + '';
        this.part2.string = (this.bottomValue + this.disValue / 4 * 3).toFixed(2);
        this.part3.string = (this.bottomValue + this.disValue / 4 * 2).toFixed(2);
        this.part4.string = (this.bottomValue + this.disValue / 4 * 1).toFixed(2);
        this.part5.string = this.bottomValue.toFixed(2);
        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.eachRate);
        for (let index = cc.ext.beg_end[0]; index < cc.ext.beg_end[1]; index++) {
            this.onDrawCandle(viweData[index], index);
        }


    }

    //Boll
    onDrawBoll(index) {

        let drawBox = 340;
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
        this.drawBg.lineWidth = 2;
        this.drawMA.lineWidth = 2;
        this.drawBOLL.lineWidth = 2;
        this.drawVol.lineWidth = 2;
        this.drawPCM.lineWidth = 2;
        this.MaList = [];

        if (cc.winSize.width > this.node.width) {
            this.drawBordWidth = 1280;
        }

        cc.ext.beg_end = [];
        GameCfg.huizhidatas = cc.ext.gameData.gameDatas[0].data.length - 150;

        cc.ext.beg_end[1] = GameCfg.huizhidatas;
        cc.ext.beg_end[0] = cc.ext.beg_end[1] - this.initDrawNumber;

        cc.ext.hz_width = this.drawBordWidth / this.initDrawNumber;

        //绘制的数据
        let data = cc.ext.gameData.gameDatas[0].data;

        let data5 = 5, data10 = 10;

        let k = 2, N = 20;

        data.forEach((el, index) => {

            if (index + 1 >= GameCfg.MAs[0]) {
                this.MaList[index] = [];
                if (GameCfg.MAs.includes(index + 1)) {
                    let MAPoint = 0;
                    for (let i = 0; i <= index; i++) {
                        MAPoint += parseFloat(data[i].close);
                    }
                    //位置
                    let MAPointY = (MAPoint / (index + 1));
                    this.MaList[index].push(MAPointY)
                }

                for (let i = 0; i < GameCfg.MAs.length; i++) {
                    if (index >= GameCfg.MAs[i]) {
                        let MaStart = index + 1 - GameCfg.MAs[i];
                        let sumUp = 0;
                        //天数的总和
                        for (let t = MaStart; t <= index; t++) {
                            sumUp += parseFloat(data[t].close);
                        }
                        //平均的位置
                        let MAY = (sumUp / GameCfg.MAs[i]);
                        this.MaList[index].push(MAY);

                    }
                }
            } else {
                this.MaList.push('null');
            }

            //boll

            if (index >= 19) {
                this.BollList[index] = [];
                let num = 0;
                let i = index + 1 - 20;
                for (; i <= index; i++) {
                    num += parseFloat(data[i].close);
                }
                let MBY = 0
                MBY = (num / N)//- this.bottomValue) / this.disValue * drawBox;

                let MD = Math.sqrt(Math.pow(el.close - num / (index + 1), 2) / (index + 1));
                let UP = (num / N) + k * MD;

                let DN = (num / N) - k * MD;

                this.BollList[index].push(MBY)
                this.BollList[index].push(UP)
                this.BollList[index].push(DN)
            } else {

                this.BollList.push('null');
            }


            //均量线 白

            if (index >= data5 - 1) {
                this.VolList[index] = [];
                if (GameCfg.VOLGraph.includes(index + 1)) {
                    let VolPoint = 0;
                    for (let i = 0; i <= index; i++) {
                        VolPoint += parseFloat(data[i].value);
                    }
                    //起点位置
                    let VolPointY = (VolPoint / (index + 1));
                    this.VolList[index].push(VolPointY);
                }

                //每段数据绘制
                for (let i = 0; i < GameCfg.VOLGraph.length; i++) {
                    if (index >= GameCfg.VOLGraph[i]) {
                        let MaStart = index + 1 - GameCfg.VOLGraph[i];
                        let sumUp = 0;
                        //天数的总和
                        for (let t = MaStart; t <= index; t++) {
                            sumUp += parseFloat(data[t].value);
                        }
                        //平均的位置
                        let VOlPointY = (sumUp / GameCfg.VOLGraph[i]);
                        this.VolList[index].push(VOlPointY);
                    }
                }
            } else {
                this.VolList.push('null');
            }
        });
    }

    //曲线MA
    onDrawMA(index) {
        if (this.MaList[index] == 'null') {
            return;
        }

        let drawBox = 340, initY = 0, madata = 0;
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

    //绘制蜡烛线 曲线
    onDrawCandle(el, index) {
        let some = index - cc.ext.beg_end[0];
        let initY = 0;
        let drawBox = 340;
        //根据区间价格决定坐标
        let openY = (el.open - this.bottomValue) / this.disValue * drawBox + initY;
        let closeY = (el.close - this.bottomValue) / this.disValue * drawBox + initY;
        let startX = some == 0 ? 10 : 10 + (some * cc.ext.hz_width);
        let endX = 10 + ((some + 1) * cc.ext.hz_width);

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
        if (el.high > highPrice) {
            let highY = (el.high - this.bottomValue) / this.disValue * drawBox + initY;
            let highX = startX + (endX - startX) / 2;
            let hy = openY > closeY ? openY : closeY;
            this.drawLine(this.drawBg, highX, highY, highX, hy);
        }
        //画最低
        if (el.low < lowPrice) {
            let lowY = (el.low - this.bottomValue) / this.disValue * drawBox + initY;
            let lowX = startX + (endX - startX) / 2;
            let hy = openY < closeY ? openY : closeY;
            this.drawLine(this.drawBg, lowX, lowY, lowX, hy);
        }

        this.onDrawMA(index);

        this.onDrawBoll(index);

        this.onDrawVol(el, index);

    }

    //成交量绘制
    onDrawVol(el, index) {

        let some = index - cc.ext.beg_end[0];

        let initY = 0;
        let drawBox = 150;
        let disVol = this.topVol - this.bottomVol;

        let startX = some == 0 ? 10 : 10 + (some * cc.ext.hz_width);
        // // console.log('startX='+startX);
        let endX = 10 + ((some + 1) * cc.ext.hz_width);

        let hight = el.value * (150 / this.topVol);

        let width = endX - startX;

        this.drawRect(this.drawVol, startX, 0, width, hight, el.open > el.close);

        //均量线 白
        if (this.VolList[index] == 'null') {
            return;
        }

        //每段数据绘制
        for (let i = 0; i < GameCfg.VOLGraph.length; i++) {
            if (index >= GameCfg.VOLGraph[i]) {

                let preY = this.VolList[index - 1][i] * (150 / this.topVol);
                let preX = 10 + ((some - 1) * cc.ext.hz_width) + width / 2

                //平均的位置
                let VOlPointY = this.VolList[index][i] * (150 / this.topVol);
                let VOlPointX = startX + width / 2;

                this.drawPCM.strokeColor = GameCfg.VOLColor[i];
                this.drawLine(this.drawPCM, preX, preY, VOlPointX, VOlPointY);
            }
        }
    }

    //成交量绘制
    start() {
        this.initDrawBg();
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


}
