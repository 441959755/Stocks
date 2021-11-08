
import GameCfgText from "../../../sctiprs/GameText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    Callback = null;

    index = null;

    type = null;

    @property(cc.Sprite)
    depImg: cc.Sprite = null;

    @property([cc.Label])
    labels: cc.Label[] = [];

    @property(cc.Label)
    tipsLa: cc.Label = null;

    @property(cc.Sprite)
    typeimg: cc.Sprite = null;

    @property([cc.SpriteFrame])
    sp: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    tipsSp: cc.SpriteFrame[] = [];

    onShow(type, index, callback) {
        this.Callback = callback;
        this.index = index;
        this.type = type;
        let cfg;

        this.depImg.spriteFrame = this.sp[type];

        if (type == 0) {
            cfg = GameCfgText.gameConf.item_diamond
            this.labels[1].string = '商品说明：' + Math.abs(cfg[index].costs[0].v) + '元购买' + cfg[index].gains[0].v + '钻石';

            this.labels[2].string = '兑换所需：' + Math.abs(cfg[index].costs[0].v) + '元';
            this.tipsLa.string = Math.abs(cfg[index].costs[0].v) + '元';
            this.typeimg.node.active = false;
        }

        else if (type == 1) {
            cfg = GameCfgText.gameConf.item_gold;

            this.labels[1].string = '商品说明：' + Math.abs(cfg[index].costs[0].v) + '钻石兑换' + cfg[index].gains[0].v + '金币';

            this.labels[2].string = '兑换所需：' + Math.abs(cfg[index].costs[0].v) + '钻石';
            this.tipsLa.string = Math.abs(cfg[index].costs[0].v) + '';
            this.typeimg.node.active = true;
            this.typeimg.spriteFrame = this.tipsSp[0];

        }

        else if (type == 2) {
            cfg = GameCfgText.gameConf.item_coupon;
            let str = index < 3 ? '充值卡' : ''

            this.depImg.spriteFrame = this.sp[type + index];

            this.labels[1].string = '商品说明：' + '价值' + cfg[index].title + str;

            this.labels[2].string = '兑换所需：' + Math.abs(cfg[index].costs[0].v) + '奖券兑换';
            this.tipsLa.string = Math.abs(cfg[index].costs[0].v) + '';
            this.typeimg.node.active = true;
            this.typeimg.spriteFrame = this.tipsSp[1];
        }

        this.labels[0].string = '商品名称：' + cfg[index].title;
    }

    onBtnClick(event, target) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'bank_price1') {
            this.node.active = false;
            this.Callback(this.index);
        }
    }
}
