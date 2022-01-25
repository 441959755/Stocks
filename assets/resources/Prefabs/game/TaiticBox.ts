import GameCfg from "../../../sctiprs/GameCfg";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    xgclBtn: cc.Button = null;

    @property(cc.Button)
    bcclBtn: cc.Button = null;

    @property([cc.Button])
    btns: cc.Button[] = [];

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.EditBox)
    edit: cc.EditBox = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Label)
    mrcountLabel: cc.Label = null;

    @property(cc.Label)
    kmCountLabel: cc.Label = null;

    mrCount = 0;

    kmCount = 0;

    _price = 0;

    set price(val) {
        this._price = val;
        this.priceLabel.string = this._price + '';
    }

    get price() {
        return this._price;
    }


    status = 0;

    gpData = null;

    zichan = null;

    call = null;

    onLoad() {
        this.gpData = GameCfg.data[0].data;
    }

    onShwo(type, zichan, call, obj) {

        if (obj) {
            this.xgclBtn.node.active = true;
            this.bcclBtn.node.active = false;
            this.btns.forEach(el => {
                el.enableAutoGrayEffect = true;
                el.interactable = false;
            })
        }
        else {
            this.xgclBtn.node.active = false;
            this.bcclBtn.node.active = true;
            this.btns.forEach(el => {
                el.enableAutoGrayEffect = false;
                el.interactable = true;
            })
        }


        this.status = type;
        this.zichan = zichan;
        this.call = call;
        //买入策略
        if (type == 1) {
            this.title.string = '买入条件设置';
        }

        //卖出策略
        else if (type == 2) {
            this.title.string = '卖出条件设置';
        }

        //止损
        else if (type == 2) {
            this.title.string = '止损条件设置';
        }

        this.price = this.gpData[GameCfg.huizhidatas - 1].close;

        let kmCount = parseInt((zichan) / (this.price * 100) + '') * 100;
        this.kmCountLabel.string = kmCount + '';

    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'sp_znxg_sub') {
            if (this.price - 0.01 <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '价格请设置合理区间');
                return;
            }
            this.price -= 0.01;

            let kmCount = parseInt((this.zichan) / (this.price * 100) + '') * 100;
            this.kmCountLabel.string = kmCount + '';

            if (this.mrCount > kmCount) {
                this.mrCount = this.kmCount;
                this.mrcountLabel.string = this.mrCount + '';
            }
        }

        else if (name == 'sp_znxg_add') {

            this.price += 0.01;

            let kmCount = parseInt((this.zichan) / (this.price * 100) + '') * 100;
            this.kmCountLabel.string = kmCount + '';

            if (this.mrCount > kmCount) {
                this.mrCount = this.kmCount;
                this.mrcountLabel.string = this.mrCount + '';
            }
        }

        else if (name == 'sp_znxg_subd') {
            if (this.mrCount - 100 < 0) {
                return;
            }
            this.mrCount -= 100;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_addd') {
            if (this.mrCount + 100 > this.kmCount) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }

            this.mrCount += 100;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_qc') {
            this.mrCount = this.kmCount;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_fc1') {
            this.mrCount = parseInt(this.kmCount / 100 / 2 + '') * 100;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_fc2') {
            this.mrCount = parseInt(this.kmCount / 100 / 3 + '') * 100;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_fc3') {
            this.mrCount = parseInt(this.kmCount / 100 / 4 + '') * 100;
            this.mrcountLabel.string = this.mrCount + '';
        }

        else if (name == 'sp_znxg_bccl') {
            let data = {
                type: this.status,
                price: this.price,
                count: this.mrCount,
            }
            this.call && (this.call(data));
        }

        else if (name == 'xl_btn_xgcl') {
            this.xgclBtn.node.active = false;
            this.bcclBtn.node.active = true;
            this.btns.forEach(el => {
                el.enableAutoGrayEffect = false;
                el.interactable = true;
            })
        }
    }
}
