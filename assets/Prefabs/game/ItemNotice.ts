import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = '';

    infoCfg = null;

    onShow() {
        this.label.string = this.text;
        if (this.text == '曙光初现') {
            this.infoCfg = '1）曙光初现K线组合是由两根走势完全相反的较长K线构成，前一天为阴线，后一天为阳线。\n2）第二天阳线向下跳空低开，开盘价远低于前一天阴线的收盘价；但阳线收盘价却高于阴线的收盘价，且阳线的收盘价深入前面阴线的实体中，几乎达到阴线实体的一半左右的位置。\n3）一般出现在下跌趋势末端，预示着底部形成，转势上涨。'
        } else if (this.text == '旭日东升') {
            this.infoCfg = '1）旭日东升是由1阴和1阳两根K线组成，\n 2）先是出现一根中阴线或大阴线，然后出现一根高开大阳线或中阳线，阳线的收盘价已高于前一根阴线的开盘价。\n 3）”旭日东升”如同初生的太阳那样缓缓升起，越来越来亮，冉冉升起，准备迎接太阳吧。\n 4）一般出现在短线见底行情中，行情见低回转，后市看涨的信号'
        } else if (this.text == '红三兵') {
            this.infoCfg = '1）红三兵形态发生在股价见底回升、横盘整理后突破转上升趋势时,出现三根连创新高的小或中阳线；\n2）价格突破一个重要阻力位,形成上升行情,拉出第1根阳线,然后继续发力拉出2根阳线。\n  3）价格每一次拉升,一般以光头阳线收市,表明买盘意愿强劲。 \n 4）红三兵所连成的3根阳线实体部位一般等长。'
        } else if (this.text == '看涨吞没') {
            this.infoCfg = '1）由1阳和1阴2根K线组成，后面大阳线吞没前面的小或中阴线！\n  2）看涨吞没形态之前，市场应有清晰的下降；\n  3）它做为一种强烈的短线见底反转信号。'
        } else if (this.text == '三只乌鸦') {
            this.infoCfg = '1）也叫"暴跌三杰"，指股价在运行时突然出现连续三根阴线的K线组合，是一种下跌的信号；\n 2）三只乌鸦出现在下跌趋势启动之初，空头取得优势并开始发力，后市看淡！'
        } else if (this.text == '看跌吞没') {
            this.infoCfg = '1）由1阳和1阴两根K线组成，后面大阴线吞没前面的小或中阳线；\n 2）看跌吞没形态之前，市场应有清晰的上升过程；\n 3）它做为一种强烈的短线见顶反转信号。'
        } else if (this.text == '乌云盖顶') {
            this.infoCfg = '1）由1阳和1阴两根K线组成,阴线在阳线收盘价之上开盘,在阳线实体内收盘；\n 2）乌云盖顶之势,显示短线行情走软,阳线实体被阴线覆盖的越多,表明买气越弱,空方攻击力度越大。'
        } else if (this.text == '倾盆大雨') {
            this.infoCfg = '1）“倾盆大雨”是由1阳和1阴两根K线组成，\n 2）先是出现一根中阳线或大阳线，然后出现一根低开大阴线或中阴线。阴线的收盘价已低于前一根阳线的开盘价。\n3）大雨来临，所有人应该准备避雨了，不然浑身湿透，短线有股价一泻千里的意思。'
        } else if (this.text == 'MA5上穿MA10') {
            this.infoCfg = '5日均线上穿10日均线，短线买入信号'
        } else if (this.text == 'MA5上穿MA20') {
            this.infoCfg = '5日均线上穿20日均线，短线买入信号'
        } else if (this.text == 'MA10上穿MA20') {
            this.infoCfg = '10日均线上穿20日均线，短线买入信号'
        } else if (this.text == 'MA10上穿MA30') {
            this.infoCfg = '10日均线上穿30日均线，中线买入信号'
        } else if (this.text == 'MA30上穿MA60') {
            this.infoCfg = '30日均线上穿60日均线，中线买入信号'
        } else if (this.text == 'MA60上穿MA120') {
            this.infoCfg = '60日均线上穿120日均线，长线买入信号'
        } else if (this.text == 'MA5下穿MA10') {
            this.infoCfg = ' 5日均线下穿10日均线，短线卖出信号'
        } else if (this.text == 'MA5下穿MA20') {
            this.infoCfg = ' 5日均线下穿20日均线，短线卖出信号'
        } else if (this.text == 'MA10下穿MA20') {
            this.infoCfg = ' 10日均线下穿20日均线，短线卖出信号'
        } else if (this.text == 'MA10下穿MA30') {
            this.infoCfg = ' 10日均线下穿30日均线，中线卖出信号'
        } else if (this.text == 'MA30下穿MA60') {
            this.infoCfg = ' 30日均线下穿60日均线，中线卖出信号'
        } else if (this.text == 'MA60下穿MA120') {
            this.infoCfg = ' 60日均线下穿120日均线，长线卖出信号'
        } else if (this.text == '收益大于10%') {
            this.infoCfg = '第一止盈目标10%';
        } else if (this.text == '收益大于20%') {
            this.infoCfg = '第二止盈目标20%';
        } else if (this.text == '收益大于30%') {
            this.infoCfg = '第伞止盈目标30%';
        } else if (this.text == '亏损大于10%') {
            this.infoCfg = '第一止损目标-10%';
        } else if (this.text == '亏损大于15%') {
            this.infoCfg = '第二止损目标-15%';
        } else if (this.text == '亏损大于20%') {
            this.infoCfg = '第三止损目标-20%';
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'itemNotice') {
            let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                GlobalEvent.emit('clickTipsInfoPos', { pos: pos, str: this.text });
            } else {
                GlobalEvent.emit('clickTipsInfoPos', { pos: pos, str: this.infoCfg });
            }

        }
    }
}
