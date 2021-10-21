import GameCfg from "../../../sctiprs/game/GameCfg";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ingNode: cc.Node = null;

    @property(cc.Node)
    fupanNode: cc.Node = null;

    @property([cc.Label])
    klabels: cc.Label[] = [];

    @property([cc.Label])
    flabels: cc.Label[] = [];

    @property([cc.Node])
    mrNode: cc.Node[] = [];

    @property([cc.Node])
    mcNode: cc.Node[] = [];

    @property([cc.Node])
    zsNode: cc.Node[] = [];

    @property([cc.Node])
    zxNode: cc.Node[] = [];

    junjia = 0.00;

    chigushuliang = 0;

    keyongzhichan = 0;

    zongzhichan = 100000;

    huiheshu = 0;

    viweData = null;

    autoCallback = null;

    onLoad() {
        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onShowGameFuPan.bind(this), this);
    }

    onShowGameFuPan() {
        this.ingNode.active = false;
        this.fupanNode.active = true;
    }

    onEnable() {

        this.viweData = GameCfg.data[0].data;

        if (GameCfg.GAMEFUPAN) {
            this.onShowGameFuPan();
            return;
        }

        this.ingNode.active = true;
        this.fupanNode.active = false;
        this.mrNode[1].active = false;
        this.mcNode[1].active = true;
        this.zsNode[1].active = true;
        this.zxNode[1].active = false;

        this.setLabelData();
    }


    onBtnClick(event, curData) {
        let name = event.target.name;

        //返回
        if (name == 'sys_back') {
            this.node.active = false;
        }

        else if (name == 'xl_btn_mairu') {

        }

        else if (name == 'xl_btn_maichu') {

        }

        else if (name == 'xl_btn_zhisun') {

        }

        //执行
        else if (name == 'xl_btn_zhixing') {
            this.zxNode[1].active = true;
            this.setAutoExecute();
        }

        //暂停
        else if (name == 'xl_btn_zanting') {
            this.zxNode[1].active = false;
            this.autoCallback && (clearInterval(this.autoCallback))
            this.autoCallback = null;
        }
    }

    //自动执行
    setAutoExecute() {
        this.autoCallback = setInterval(() => {

        })
    }



    setLabelData() {

        if (GameCfg.GAMEFUPAN) {


        }
        else {
            this.klabels[0].string = this.viweData[GameCfg.huizhidatas - 1].open;
            this.klabels[1].string = this.viweData[GameCfg.huizhidatas - 1].close;
            this.klabels[2].string = this.viweData[GameCfg.huizhidatas - 1].high;
            this.klabels[3].string = this.viweData[GameCfg.huizhidatas - 1].low;

            this.klabels[4].string = this.junjia + '';
            this.klabels[5].string = this.chigushuliang + '';
            this.klabels[6].string = this.zongzhichan + '';
            this.klabels[7].string = this.keyongzhichan + '';

            this.huiheshu = this.viweData.length - GameCfg.huizhidatas;
            this.klabels[8].string = '回合数：' + this.huiheshu;

        }
    }

    ////买入的均价
    onGetJunjia() {
        let data = this.viweData;

    }
}
