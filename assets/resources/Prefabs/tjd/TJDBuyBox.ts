import GameCfg from "../../../sctiprs/game/GameCfg";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bccl: cc.Node = null;

    @property(cc.Node)
    xgcl: cc.Node = null;

    @property([cc.Button])
    btns: cc.Button[] = [];

    // @property(cc.Label)
    // price: cc.Label = null;

    @property(cc.Label)
    mrCount: cc.Label = null;

    @property(cc.Label)
    kmCount: cc.Label = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;


    callBack = null;

    kyzc = null;


    onShow(money, slg, call) {
        this.kyzc = money;

        this.btns.forEach(el => {
            el.interactable = true;
            el.enableAutoGrayEffect = false;
        })

        let data = GameCfg.data[0].data;
        this.callBack = call;
        if (!slg) {
            this.xgcl.active = false;
            this.bccl.active = true;
            this.editBox.string = data[GameCfg.huizhidatas - 1].close;
            this.mrCount.string = 0 + '';

            this.kmCount.string = parseInt((money / 100 / data[GameCfg.huizhidatas - 1].close) + '') * 100 + '';

        }
        else {
            this.btns.forEach(el => {
                el.interactable = false;
                el.enableAutoGrayEffect = true;
            })
            this.editBox.string = slg.price + '';
            this.mrCount.string = slg.count + '';

            this.kmCount.string = parseInt((money / 100 / data[GameCfg.huizhidatas - 1].close) + '') * 100 + '';

            this.xgcl.active = true;
            //  this.bccl.active = false;
        }

    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        //减价格
        else if (name == 'sp_znxg_sub') {
            if (parseFloat(this.editBox.string) <= 0) { return };
            this.editBox.string = (parseFloat(this.editBox.string) - 0.01).toFixed(2) + '';

            this.kmCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string)) + '') * 100 + '';
        }

        //加买入价
        else if (name == 'sp_znxg_add') {
            this.editBox.string = (parseFloat(this.editBox.string) + 0.01).toFixed(2) + '';

            this.kmCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string)) + '') * 100 + '';
        }

        //买入数量
        else if (name == 'sp_znxg_subd') {
            if (parseInt(this.mrCount.string) - 100 <= 0) { return };
            this.mrCount.string = parseInt(this.mrCount.string) - 100 + '';
        }

        else if (name == 'sp_znxg_addd') {
            let num = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string)) + '') * 100;
            if (parseInt(this.mrCount.string) + 100 > num) { return }
            this.mrCount.string = parseInt(this.mrCount.string) + 100 + '';
        }

        else if (name == 'sp_znxg_mrxd') {
            if (parseInt(this.mrCount.string) <= 0 || parseFloat(this.editBox.string) <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '交易价格、数量不能小于等于0')
                return
            }

            let slg = {
                price: parseFloat(this.editBox.string),
                count: parseInt(this.mrCount.string),
            }
            this.callBack && (this.callBack(slg, this.node));
            this.node.active = false;
        }

        else if (name == 'sp_znxg_qc') {
            this.mrCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string)) + '') * 100 + '';
        }

        else if (name == 'sp_znxg_fc1') {
            if (parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 2) + '') * 100 < 100) { return };
            this.mrCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 2) + '') * 100 + '';
        }

        else if (name == 'sp_znxg_fc2') {
            if (parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 3) + '') * 100 < 100) { return };
            this.mrCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 3) + '') * 100 + '';
        }

        else if (name == 'sp_znxg_fc3') {
            if (parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 4) + '') * 100 < 100) { return };
            this.mrCount.string = parseInt((this.kyzc / 100 / parseFloat(this.editBox.string) / 4) + '') * 100 + '';
        }

        else if (name == 'xl_btn_xgcl') {

            this.btns.forEach(el => {
                el.interactable = true;
                el.enableAutoGrayEffect = false;
            })

            this.xgcl.active = false;
        }
    }
}
