import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    codeLabel: cc.Label = null;

    @property(cc.EditBox)
    priceLabel: cc.EditBox = null;

    @property(cc.Label)
    mrslLabel: cc.Label = null;

    @property(cc.Label)
    kmgsLabel: cc.Label = null;

    @property(cc.Button)
    mrxdBtn: cc.Button = null;

    curData = null;

    kyzc = null;

    kmsl = null;

    cursl = null;

    @property([cc.Button])
    AllBtnNode: cc.Button[] = [];

    @property(cc.Node)
    wtcdBtn: cc.Node = null;



    onShow(data) {

        this.wtcdBtn.active = false;
        this.AllBtnNode.forEach(el => {
            el.interactable = true;
            el.enableAutoGrayEffect = false;
        })

        if (!data) {
            this.priceLabel.string = '0';
        }
        else {
            this.curData = data;
            this.nameLabel.string = this.curData.name;

            let code = this.curData.code + '';
            if (code.length >= 7) {
                code = code.slice(1);
            }

            this.codeLabel.string = code;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        this.mrslLabel.string = '0';

        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {

            this.kyzc = GameData.mncgDataList.account;

            if (GameData.mncgDataList.orderList && GameData.mncgDataList.orderList.items) {

                GameData.mncgDataList.orderList.items.forEach(el => {

                    if (el.code == this.curData.code && el.type == pb.OrderType.AskLimit) {

                        this.AllBtnNode.forEach(el => {
                            el.interactable = false;
                            el.enableAutoGrayEffect = true;
                        })
                        this.wtcdBtn.active = true;

                        this.mrslLabel.string = el.volume
                        // this.node.active = false;
                        // GlobalEvent.emit(EventCfg.OPENMNCDLAYER);

                    }

                });
            }
        }

        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            GameData.cgdsStateList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    this.kyzc = el.state.account / 2;

                    if (el.state.orderList && el.state.orderList.items) {
                        el.state.orderList.items.forEach(el1 => {
                            if (el1.code == this.curData.code && el1.type == pb.OrderType.AskLimit) {
                                // this.node.active = false;
                                // GlobalEvent.emit(EventCfg.OPENMNCDLAYER);

                                this.AllBtnNode.forEach(el => {
                                    el.interactable = false;
                                    el.enableAutoGrayEffect = true;
                                })
                                this.wtcdBtn.active = true;
                                this.mrslLabel.string = el1.volume;
                            }

                        });
                    }
                }
            })
        }

        if (!this.kyzc) {
            this.kmgsLabel.string = '0';
            this.kmsl = 0;
        }
        else {
            let num = parseInt(this.kyzc / 100 / this.curData.price + '');
            this.kmsl = num * 100;
            this.kmgsLabel.string = this.kmsl + '';
        }

        if (!this.kyzc || !this.kmsl) {
            this.mrxdBtn.interactable = false;
            this.mrxdBtn.enableAutoGrayEffect = true;
        }
        else {
            this.mrxdBtn.interactable = true;
            this.mrxdBtn.enableAutoGrayEffect = false;
        }
    }

    onEnable() {
        this.cursl = 0;
    }

    isZhangTing(price) {

        let code = this.curData.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let p = 1.1;
        if (code.slice(0, 2) == '30' || code.slice(0, 3) == '688') {
            p = 1.2;
        }

        if ((this.curData.close * p) < price) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '委托价格不能超过涨停价格！');
            return false;
        }
        return true;
    }

    isDieTing(price) {
        let code = this.curData.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let p = 0.8;
        // if (code.slice(0, 2) == '30' || code.slice(0, 3) == '688') {
        //     p = 1.2;
        // }

        if ((this.curData.close * p) > price) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '委托价格不能低于跌停价格！！');
            return false;
        }
        return true;
    }

    onBtnClick(event) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
        //当前交易价格  减
        else if (name == 'sp_znxg_sub') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }




            this.curData.price -= 0.01;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        else if (name == 'sp_znxg_add') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            this.curData.price += 0.01;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        //买入数量
        else if (name == 'sp_znxg_subd') {

            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }

            if (this.cursl > this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }

            if (!this.cursl) {
                return;
            }
            this.cursl -= 100;
            this.mrslLabel.string = this.cursl + '';
        }

        else if (name == 'sp_znxg_addd') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }

            if (this.cursl + 100 > this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }

            this.cursl += 100;
            this.mrslLabel.string = this.cursl + '';

        }
        //全仓
        else if (name == 'sp_znxg_qc') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            this.cursl = this.kmsl;
            this.mrslLabel.string = this.cursl + '';
        }
        //1/2
        else if (name == 'sp_znxg_fc1') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 2 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';

        }
        //1/3
        else if (name == 'sp_znxg_fc2') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 3 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';
        }
        //1/4
        else if (name == 'sp_znxg_fc3') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 4 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';
        }
        //买入下单
        else if (name == 'sp_znxg_mrxd') {

            this.curData.price = parseFloat(this.priceLabel.string);

            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的资产不足');
                return;
            }
            if (!this.cursl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '买入数量不能为空');
                return;
            }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            let id = 0
            if (GameData.SpStockData && GameData.SpStockData.id) {
                id = GameData.SpStockData.id;
            }
            this.curData.price = ComUtils.changeTwoDecimal(this.curData.price);

            if (!this.isZhangTing(this.curData.price)) {
                return;
            }


            let info = {
                code: this.curData.code,
                type: pb.OrderType.AskLimit,
                price: this.curData.price,
                volume: this.cursl,
                uid: GameData.userID,
                amount: this.curData.price * this.cursl,
                id: id,
            }
            let CmdStockOrder = pb.CmdStockOrder;
            let message = CmdStockOrder.create(info);
            let buff = CmdStockOrder.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_Order, buff, (res) => {
                console.log('买入下单应答:' + JSON.stringify(res));
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                if (res.orderId) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '买入下单成功!');
                    this.node.active = false;
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result.err);
                }
            })

        }

        else if (name == 'xl_btn_cxwt') {
            let id = 0
            if (GameData.SpStockData && GameData.SpStockData.id) {
                id = GameData.SpStockData.id;
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            let info = {
                orderId: this.curData.orderId,
                type: this.curData.type,
                code: this.curData.code,
                uid: GameData.userID,
                id: id,
                node: this.curData.node,
            }

            if (info.type == pb.OrderType.AskLimit) {
                info.type = pb.OrderType.AskLimit_Cancel;
            }
            else if (info.type == pb.OrderType.BidLimit) {
                info.type = pb.OrderType.BidLimit_Cancel;
            }
            console.log(JSON.stringify(info));

            let CmdStockOrderCancel = pb.CmdStockOrderCancel;
            let message = CmdStockOrderCancel.create(info);
            let buff = CmdStockOrderCancel.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_OrderCancel, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                console.log('删除委托记录' + JSON.stringify(res));
                if (res.err) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
                }
                else {
                    this.node.active = false;
                }
            })

        }

    }

}
