import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    brickMall: cc.Node = null;

    @property(cc.Node)
    goldMall: cc.Node = null;

    @property(cc.Node)
    lotteryMall: cc.Node = null;

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property([cc.Label])
    infoLabels: cc.Label[] = [];

    diamondCfg = null;

    goldCfg = null;

    couponCfg = null;

    @property([cc.Node])
    diamondItems: cc.Node[] = [];

    @property([cc.Node])
    goldItems: cc.Node[] = [];

    @property([cc.Node])
    couponItems: cc.Node[] = [];

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    depict: cc.Node = null;

    @property(cc.Node)
    succeed: cc.Node = null;

    _curType = 0;

    onLoad() {
        GlobalEvent.on(EventCfg.GOLDCHANGE, this.initPlayerInfo.bind(this), this);
        GlobalEvent.on(EventCfg.DIAMONDCHANGE, this.initPlayerInfo.bind(this), this);
        GlobalEvent.on(EventCfg.LOTTERYCHANGE, this.initPlayerInfo.bind(this), this);
        GlobalEvent.on(EventCfg.HEADIMGCHANGE, this.initPlayerInfo.bind(this), this);
        GlobalEvent.on(EventCfg.LEVELCHANGE, this.initPlayerInfo.bind(this), this);
        GlobalEvent.on(EventCfg.NAMECHANGE, this.initPlayerInfo.bind(this), this);

        this.editBox.node.on('editing-did-ended', edit => {
            let str = parseInt(edit.string);
            if (this.isPhoneNumber(str)) {

            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的手机号有误，请重新输入');
                this.editBox.string = '';
                return;
            }
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.DIAMONDCHANGE);
        GlobalEvent.off(EventCfg.LOTTERYCHANGE);
        GlobalEvent.off(EventCfg.HEADIMGCHANGE);
        GlobalEvent.off(EventCfg.LEVELCHANGE);
        GlobalEvent.off(EventCfg.NAMECHANGE);
    }

    start() {
        this.brickMall.active = true;
        this.goldMall.active = false;
        this.lotteryMall.active = false;
        this.toggles[0].isChecked = true;
        this.toggles[1].isChecked = false;
        this.toggles[2].isChecked = false;
        this._curType = 0;

        this.initPlayerInfo();

        this.init();
    }

    getBindMobild() {
        return GameData.gameData.mobile;
    }

    init() {
        this.diamondCfg = GameCfgText.gameConf.item_diamond;
        this.couponCfg = GameCfgText.gameConf.item_coupon;
        this.goldCfg = GameCfgText.gameConf.item_gold;

        this.diamondCfg.forEach((el, index) => {
            this.diamondItems[index].getChildByName('label').getComponent(cc.Label).string = el.title;
            this.diamondItems[index].getChildByName('bank_pricebg').getChildByName('New Label').
                getComponent(cc.Label).string = Math.abs(el.costs[0].v) + '元';
        });

        this.couponCfg.forEach((el, index) => {
            this.couponItems[index] && (this.couponItems[index].getChildByName('label').getComponent(cc.Label).string = el.title,
                this.couponItems[index].getChildByName('bank_pricebg').getChildByName('node').getChildByName('la').
                    getComponent(cc.Label).string = Math.abs(el.costs[0].v) + ''
            )
        });

        this.goldCfg.forEach((el, index) => {
            this.goldItems[index].getChildByName('label').getComponent(cc.Label).string = el.title;
            this.goldItems[index].getChildByName('bank_pricebg').getChildByName('node').getChildByName('la').
                getComponent(cc.Label).string = Math.abs(el.costs[0].v) + '';
        });

        this.editBox.string = this.getBindMobild() || '';
    }

    initPlayerInfo() {
        this.infoLabels[0].string = '昵称：' + GameData.userName;
        this.infoLabels[1].string = 'LV  ：' + GameData.properties[pb.GamePropertyId.Level];
        this.infoLabels[2].string = 'ID  ：' + GameData.userID;
        this.infoLabels[4].string = '金币  ：' + GameData.properties[pb.GamePropertyId.Gold];
        this.infoLabels[3].string = '钻石  ：' + GameData.properties[pb.GamePropertyId.Diamond];
        this.infoLabels[5].string = '奖券  ：' + GameData.properties[pb.GamePropertyId.Coupon];
        this.headImg.spriteFrame = GameData.headImg;
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'black') {
            this.node.active = false;
        }

        else if (name == 'bank_leftbt_jkf') {
            console.log('添加客服');
        }

        //绑定手机号码
        else if (name == 'bank_bdsj') {

            if (this.isPhoneNumber(this.editBox.string)) {

                let info = {
                    mobile: this.editBox.string,
                }

                let CmdMobileBind = pb.CmdMobileBind;
                let message = CmdMobileBind.create(info);
                let buff = CmdMobileBind.encode(message).finish();

                socket.send(pb.MessageId.Req_Hall_MobileBind, buff, (res) => {
                    console.log('手机号绑定应答' + JSON.stringify(res));
                    if (!res.err) {
                        GameData.gameData.mobile = this.editBox.string;
                    }
                    else {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入正确的手机号');
                    }

                })
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入正确的手机号');
            }
        }

        else if (name == 'bank_pricebg') {
            let index = parseInt(curdata);
            this.onBankPrice(index);

        }

        else if (name == 'bank_block') {

            let index = parseInt(curdata);
            this.depict.active = true;
            this.depict.getComponent('Shopdepict').onShow(this._curType, index, this.onBankPrice.bind(this));
        }


    }

    onBankPrice(index) {
        //砖石商城
        if (this._curType == 0) {
            this.Orders(index, this.goldCfg[index].id);
        }
        //金币商城
        else if (this._curType == 1) {
            if (GameData.properties[pb.GamePropertyId.Diamond] > Math.abs(this.goldCfg[index].costs[0].v)) {

                this.Orders(index, this.goldCfg[index].id);
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '钻石不足');
            }

        }
        //奖券
        else if (this._curType == 2) {
            if (this.getBindMobild()) {
                if (GameData.properties[pb.GamePropertyId.Coupon] > Math.abs(this.couponCfg[index].costs[0].v)) {
                    this.Orders(index, this.couponCfg[index].id);
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '点券不足');
                }
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请先绑定手机号码');
            }
        }
    }



    Orders(index, id) {
        let obj = {
            itemId: id,
            count: 1,
            from: pb.AppFrom.WeChatMinProgram
        }

        let ItemOrder = pb.ItemOrder;
        let message = ItemOrder.create(obj);
        let buff = ItemOrder.encode(message).finish();

        socket.send(pb.MessageId.Req_Hall_ShopOrder, buff, (res) => {
            console.log('商城下购买应答' + JSON.stringify(res));
            if (!res.err) {

                if (this._curType) {
                    this.succeed.active = true;
                    this.succeed.getComponent('ShopSucced').onShow(this._curType, index);
                }

                else {

                }

            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
            }

        })
    }

    onToggleClick(event, curdata) {

        let name = event.node._name;
        if (name == 'toggle1') {
            this.brickMall.active = true;
            this.goldMall.active = false;
            this.lotteryMall.active = false;
            this._curType = 0;
        }
        else if (name == 'toggle2') {
            this.brickMall.active = false;
            this.goldMall.active = true;
            this.lotteryMall.active = false;
            this._curType = 1;

        }
        else if (name == 'toggle3') {
            this.brickMall.active = false;
            this.goldMall.active = false;
            this.lotteryMall.active = true;
            this._curType = 2;

        }
    }

    //是否为手机号
    isPhoneNumber(tel) {
        var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
    }
}
