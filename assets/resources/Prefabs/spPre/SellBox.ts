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
    codeLabal: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.EditBox)
    mcjgLabel: cc.EditBox = null;

    @property(cc.Label)
    mcslLabel: cc.Label = null;

    @property(cc.Label)
    kmslLabel: cc.Label = null;

    @property(cc.Button)
    mcxdBtn: cc.Button = null;

    curData = null;

    curSl = null;  //当前数量  

    curSellCount = 0;

    onShow(data) {
        this.curData = data;
        let code = this.curData.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.codeLabal.string = code;
        this.nameLabel.string = this.curData.name;

        this.mcjgLabel.string = this.curData.price;
        this.mcslLabel.string = '0';

        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            let items = GameData.mncgDataList.positionList.items || [];
            if (items.length > 0) {
                items.forEach(el => {
                    if (el.code == this.curData.code) {
                        this.curSl = el.volumeFree;
                    }
                });
            }

            if (GameData.mncgDataList.positionList && GameData.mncgDataList.positionList.items) {
                GameData.mncgDataList.positionList.items.forEach(el => {
                    if (el.code == this.curData.code && el.type == pb.OrderType.BidLimit) {
                        this.node.active = false;
                        GlobalEvent.emit(EventCfg.OPENMNCDLAYER);
                    }

                });
            }

        }
        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            GameData.cgdsStateList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    let items = el.state.positionList;
                    if (items.length > 0) {
                        items.forEach(el => {
                            if (el.code == this.curData.code) {
                                this.curSl = el.volumeFree;
                            }
                        });
                    }

                    if (el.state.positionList && el.state.positionList.items) {
                        el.state.positionList.items.forEach(el1 => {
                            if (el1.code == this.curData.code && el1.type == pb.OrderType.BidLimit) {
                                this.node.active = false;
                                GlobalEvent.emit(EventCfg.OPENMNCDLAYER);
                            }

                        });
                    }

                }
            })
        }


        if (this.curSl) {
            this.kmslLabel.string = this.curSl;
            this.mcxdBtn.interactable = true;
            this.mcxdBtn.enableAutoGrayEffect = false;
        }
        else {
            this.kmslLabel.string = '0';
            this.mcxdBtn.interactable = false;
            this.mcxdBtn.enableAutoGrayEffect = true;
        }

    }

    onEnable() {
        this.curSellCount = 0;
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.active = false;
        }
        //交易价格减
        else if (name == 'sp_znxg_sub') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curData.price -= 0.01;
            this.mcjgLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }
        //加
        else if (name == 'sp_znxg_add') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curData.price += 0.01;
            this.mcjgLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        else if (name == 'sp_znxg_sub1') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }

            if (!this.curSellCount) {
                return;
            }
            this.curSellCount -= 100;
            this.mcslLabel.string = this.curSellCount + '';

        }

        else if (name == 'sp_znxg_add1') {

            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }

            if (this.curSellCount + 100 > this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '不能超出持仓数量!');
                return;
            }

            this.curSellCount += 100;
            this.mcslLabel.string = this.curSellCount + '';

        }
        //全仓
        else if (name == 'sp_znxg_qc') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curSellCount = this.curSl;
            this.mcslLabel.string = this.curSellCount + '';
        }
        //1/2
        else if (name == 'sp_znxg_fc1') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curSellCount = Math.ceil(this.curSl / 2 / 100) * 100;
            this.mcslLabel.string = this.curSellCount + '';

        }
        //1/3
        else if (name == 'sp_znxg_fc2') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curSellCount = Math.ceil(this.curSl / 3 / 100) * 100;
            this.mcslLabel.string = this.curSellCount + '';

        }
        //1/4
        else if (name == 'sp_znxg_fc3') {
            if (!this.curSl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有持仓数量!');
                return;
            }
            this.curSellCount = Math.ceil(this.curSl / 4 / 100) * 100;
            this.mcslLabel.string = this.curSellCount + '';

        }
        //卖出下单
        else if (name == 'sp_znxg_mrxd') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let id = 0;
            if (GameData.SpStockData && GameData.SpStockData.id) {
                id = GameData.SpStockData.id;
            }
            this.curData.price = ComUtils.changeTwoDecimal(this.curData.price);
            let info = {
                code: this.curData.code,
                type: pb.OrderType.BidLimit,
                price: this.curData.price,
                volume: this.curSellCount,
                uid: GameData.userID,
                amount: this.curData.price * this.curSellCount,
                id: id,
            }

            let CmdStockOrder = pb.CmdStockOrder;
            let message = CmdStockOrder.create(info);
            let buff = CmdStockOrder.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_Order, buff, (res) => {
                console.log('卖出下单应答:' + JSON.stringify(res));
                GlobalEvent.emit(EventCfg.LOADINGHIDE);

                if (res.orderId) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '卖出下单成功!');
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result.err);
                }
            })

        }

    }

}
