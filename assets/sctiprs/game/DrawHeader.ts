

import gameCfg from "./gameCfg";

const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    drawBg: cc.Graphics = null;

    @property(cc.Graphics)
    drawMA: cc.Graphics = null;

    topValue = 0;     //当前绘制的最高值

    bottomValue = 0;  //当前绘制最低值

    disValue = 0;       //当前绘制的最高值-当前绘制最低值

    currData = 0;         //当前的绘制的天数

    Ma5List = [];

    Ma10List = [];

    Ma20List = [];

    Ma30List = [];

    Ma60List = [];

    Ma120List = [];

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

    hz_Scale = 2;

    huizhidatas = null;


    onLoad() {
        this.huizhidatas = cc.ext.gameData.gameDatas[0].data;
        if (cc.ext.gameData.gameDatas) {
            this.initDrawBg();
        }
    }

    //绘制初始
    initDrawBg() {
        //   console.log(cc.ext.gameData.gameDatas.data);
        // let huizhidatas = cc.ext.gameData.gameDatas[0].data;//.slice(0, gameCfg.initHuizhiData - 1);
        this.currData = gameCfg.initHuizhiData;
        //  this.topValue=Math.max()
        this.bottomValue = this.huizhidatas[0].low;
        this.huizhidatas.forEach((el) => {
            this.topValue = Math.max(this.topValue, el.high);
            this.bottomValue = Math.min(this.bottomValue, el.low);
        })

        this.disValue = this.topValue - this.bottomValue;
        this.part1.string = this.topValue.toFixed(2) + '';
        this.part2.string = (this.bottomValue + this.disValue / 4 * 3).toFixed(2);
        this.part3.string = (this.bottomValue + this.disValue / 4 * 2).toFixed(2);
        this.part4.string = (this.bottomValue + this.disValue / 4 * 1).toFixed(2);
        this.part5.string = this.bottomValue.toFixed(2);

        this.huizhidatas.forEach((el, index) => {
            this.onDrawCandle(el, index);
        })

    }

    //曲线MA
    onDrawMA(index) {
        if (index + 1 >= 5) {
            let drawBox = 340, initY = 0, madata = 0;
            //MA起点
            if (gameCfg.MAGraph.includes(index + 1)) {
                let MAPoint = 0;
                for (let i = 0; i <= index; i++) {
                    MAPoint += parseFloat(this.huizhidatas[i].close);
                }
                let MAPointY = (MAPoint / 5 - this.bottomValue) / this.disValue * drawBox + initY;
                let MAPointX = 10 + (index * 10) * this.hz_Scale + 10 * this.hz_Scale / 2;

                if (index + 1 == 5) {
                    this.Ma5List.push([MAPointX, MAPointY]);
                } else if (index + 1 == 10) {
                    this.Ma10List.push([MAPointX, MAPointY]);
                } else if (index + 1 == 20) {
                    this.Ma20List.push([MAPointX, MAPointY]);
                } else if (index + 1 == 30) {
                    this.Ma30List.push([MAPointX, MAPointY]);
                } else if (index + 1 == 60) {
                    this.Ma60List.push([MAPointX, MAPointY]);
                } else if (index + 1 == 120) {
                    this.Ma120List.push([MAPointX, MAPointY]);
                }
            }

            if (index < 5) {
                return;
            }

            //每段数据绘制
            for (let i = 0; i < gameCfg.MAGraph.length; i++) {
                if (index >= gameCfg.MAGraph[i]) {
                    let MaStart = index + 1 - gameCfg.MAGraph[i];
                    let sumUp = 0;
                    for (let t = MaStart; t <= index; t++) {
                        sumUp += parseFloat(this.huizhidatas[t].close);
                    }
                    let MAY = (sumUp /gameCfg.MAGraph[i] - this.bottomValue) / this.disValue * drawBox + initY;
                    let MAX = 10 + (index * 10) * this.hz_Scale + 10 * this.hz_Scale / 2;
                    this.drawMA.strokeColor = gameCfg.MAColor[i];
                    if (i == 0) {
                        this.drawLine(this.drawMA, this.Ma5List[this.Ma5List.length - 1][0], this.Ma5List[this.Ma5List.length - 1][1], MAX, MAY);
                        this.Ma5List.push([MAX, MAY]);
                    } else if (i == 1) {
                        this.drawLine(this.drawMA, this.Ma10List[this.Ma10List.length - 1][0], this.Ma10List[this.Ma10List.length - 1][1], MAX, MAY);
                        this.Ma10List.push([MAX, MAY]);
                    } else if (i == 2) {
                        this.drawLine(this.drawMA, this.Ma20List[this.Ma20List.length - 1][0], this.Ma20List[this.Ma20List.length - 1][1], MAX, MAY);
                        this.Ma20List.push([MAX, MAY]);
                    } else if (i == 3) {
                        this.drawLine(this.drawMA, this.Ma30List[this.Ma30List.length - 1][0], this.Ma30List[this.Ma30List.length - 1][1], MAX, MAY);
                        this.Ma30List.push([MAX, MAY]);
                    } else if (i == 4) {
                        this.drawLine(this.drawMA, this.Ma60List[this.Ma60List.length - 1][0], this.Ma60List[this.Ma60List.length - 1][1], MAX, MAY);
                        this.Ma60List.push([MAX, MAY]);
                    } else if (i == 5) {
                        this.drawLine(this.drawMA, this.Ma120List[this.Ma120List.length - 1][0], this.Ma120List[this.Ma120List.length - 1][1], MAX, MAY);
                        this.Ma120List.push([MAX, MAY]);
                    }
                }
            }
        }
    }

    //绘制蜡烛线 曲线
    onDrawCandle(el, index) {
        //开始要绘制的天数
        if (index >= this.currData) {
            return;
        }
        // let initY = this.drawBg.node.y;
        let initY = 0;
        let drawBox = 340;
        //  console.log(drawBox);
        //let num=this.disValue/drawBox;
        //根据区间价格决定坐标
        let openY = (el.open - this.bottomValue) / this.disValue * drawBox + initY;
        // console.log('openY='+openY);
        let closeY = (el.close - this.bottomValue) / this.disValue * drawBox + initY;
        //  console.log('closeY='+closeY);
        let startX = index == 0 ? 10 : 10 + (index * 10) * this.hz_Scale;
        // console.log('startX='+startX);
        let endX = 10 + ((index + 1) * 10) * this.hz_Scale;
        //  console.log('endX='+endX);

        //判断颜色
        // let hz_color;
        //没涨没跌
        this.drawBg.lineWidth = 2;
        let lowPrice, highPrice;
        if (el.open == el.close) {
            this.drawBg.strokeColor = gameCfg.HZ_white;
            this.drawLine(this.drawBg, startX + 2, openY, endX, openY);
            lowPrice = el.open;
            highPrice = el.open;
        }
        //跌了
        else if (el.open > el.close) {

            this.drawBg.strokeColor = gameCfg.HZ_green;
            this.drawRect(startX + 2, closeY, endX - startX, openY - closeY, true);

            lowPrice = el.close;
            highPrice = el.open;
        }
        //涨了
        else if (el.open < el.close) {
            this.drawBg.strokeColor = gameCfg.HZ_red;
            this.drawRect(startX + 2, openY, endX - startX, closeY - openY);
            lowPrice = el.open;
            highPrice = el.close;
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

    }

    //画线
    drawLine(ctx, sX, sY, eX, eY, falg?) {
        ctx.moveTo(sX, sY);
        ctx.lineTo(eX, eY);
        ctx.stroke();
    }

    //画框
    drawRect(x, y, w, h, falg?) {
        this.drawBg.rect(x, y, w, h);
        falg && (this.drawBg.fill());
        this.drawBg.stroke();
    }

    //

    start() {

    }

    // update (dt) {}
}
