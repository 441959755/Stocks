import GameCfg from "../../../sctiprs/GameCfg";
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

    @property(cc.Label)
    mcCount: cc.Label = null;

    @property(cc.Label)
    kmCount: cc.Label = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    callBack = null;

    kmgs = null;

    onShow(kmgs, slg, call) {
        this.kmgs = kmgs;

        this.btns.forEach(el => {
            el.interactable = true;
            el.enableAutoGrayEffect = false;
        })

        let data = GameCfg.data[0].data;

        this.callBack = call;

        if (!slg.count) {
            this.xgcl.active = false;
            this.bccl.active = true;
            this.editBox.string = data[GameCfg.huizhidatas - 1].close;
            this.mcCount.string = 0 + '';

            this.kmCount.string = kmgs + '';
        }
        else {
            this.btns.forEach(el => {
                el.interactable = false;
                el.enableAutoGrayEffect = true;
            })

            this.editBox.string = slg.price + '';

            this.mcCount.string = slg.count + '';

            this.kmCount.string = kmgs + '';

            this.xgcl.active = true;
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
        }

        //加买入价
        else if (name == 'sp_znxg_add') {
            this.editBox.string = (parseFloat(this.editBox.string) + 0.01).toFixed(2) + '';
        }

        //买入数量
        else if (name == 'sp_znxg_subd') {
            if (parseInt(this.mcCount.string) - 100 <= 0) { return };
            this.mcCount.string = parseInt(this.mcCount.string) - 100 + '';
        }

        else if (name == 'sp_znxg_addd') {
            if (parseInt(this.mcCount.string) + 100 > this.kmgs) { return }
            this.mcCount.string = parseInt(this.mcCount.string) + 100 + '';
        }

        else if (name == 'sp_znxg_mrxd') {

            if (parseInt(this.mcCount.string) <= 0 || parseFloat(this.editBox.string) <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '交易价格、数量不能小于等于0')
                return
            }

            let slg = {
                price: parseFloat(this.editBox.string),
                count: parseInt(this.mcCount.string),
            }
            this.callBack && (this.callBack(slg, this.node));
        }

        else if (name == 'sp_znxg_qc') {
            this.mcCount.string = this.kmgs + '';
        }

        else if (name == 'sp_znxg_fc1') {
            if (parseInt((this.kmgs / 2) + '') < 100) { return };
            this.mcCount.string = parseInt(this.kmgs / 2 + '') + '';
        }

        else if (name == 'sp_znxg_fc2') {
            if (parseInt((this.kmgs / 3) + '') < 100) { return };
            this.mcCount.string = parseInt(this.kmgs / 3 + '') + '';
        }

        else if (name == 'sp_znxg_fc3') {
            if (parseInt((this.kmgs / 4) + '') < 100) { return };
            this.mcCount.string = parseInt(this.kmgs / 4 + '') + '';
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
