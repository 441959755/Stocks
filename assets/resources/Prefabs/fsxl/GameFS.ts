import GameCfg from "../../../sctiprs/game/GameCfg";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    autoCallback = null;

    @property([cc.Label])
    labdes: cc.Label[] = [];

    alllv = 0.00;

    curlv = 0.00;

    huiheshu = 0;

    mrPrice = 0;

    viewData = null;

    @property(cc.Node)
    findLayer: cc.Node = null;

    onEnable() {
        this.viewData = GameCfg.data[0].data;
        this.setLabelData();
    }


    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'sys_back') {
            if (GameCfg.GAMEFUPAN) {
                this.node.parent.active = false;
            }
            else {
                PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {

                })
            }
        }

        //卖出
        else if (name == 'xl_btn_maichu') {
            event.target.active = false;

        }

        //买入
        else if (name == 'xl_btn_mairu') {
            event.target.children[0].active = true;
            this.mrPrice = this.viewData[GameCfg.huizhidatas - 1].close;
            this.curlv = this.getCurLv();
        }

        else if (name == 'xl_btn_guanwang') {

        }

    }


    getCurLv() {
        if (this.viewData[GameCfg.huizhidatas]) {
            let curClose = parseFloat(this.viewData[GameCfg.huizhidatas].clsoe);
            return (curClose - this.mrPrice) / this.mrPrice;
        }
    }

    getAllLv() {
        if (this.viewData[GameCfg.huizhidatas - 1]) {
            let curClose = parseFloat(this.viewData[GameCfg.huizhidatas - 1].clsoe);
            let rate = (curClose - this.mrPrice) / this.mrPrice;

            this.alllv = (this.alllv + 1) * (rate + 1) - 1;
        }
    }


    setLabelData() {
        this.labdes[0].string = (this.alllv).toFixed(2) + '%';
        this.labdes[1].string = (this.curlv).toFixed(2) + '%';

        let code = GameCfg.data[0].code;
        if ((code + '').length >= 7) {
            code = code.slice(1);
        }

        this.labdes[2].string = GameCfg.data[0].name + '    ' + code;
        this.huiheshu = (GameCfg.data[0].data.length - GameCfg.huizhidatas)
        this.labdes[3].string = '回合数：' + this.huiheshu;

        if (this.huiheshu <= 0) {
            this.autoCallback && (clearInterval(this.autoCallback));
            this.autoCallback = null;
            this.findLayer.active = true;
            this.findLayer.getComponent('FSFinal').onShow(this.alllv);
        }
    }

}
