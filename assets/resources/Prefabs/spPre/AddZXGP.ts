
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    code = null;

    onLoad() {
        this.editBox.node.on(
            'editing-did-ended',
            edit => {

                let str = edit.string;
                if (str == '') {
                    return;
                } else {

                    let items = GameCfgText.getGPPKItemInfo(this.editBox.string);

                    if (!items) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入正确的股票代码或股票名称！');
                        edit.string = '';
                        return;
                    }
                    let code = items[0] + '';
                    if (code.length >= 7) {
                        code = code.slice(1);
                    }

                    this.editBox.string = code + '        ' + items[1];
                    this.code = items[0];
                }

            },
            this
        );
    }

    onEnable() {
        this.editBox.string = ''
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
        //添加到自选股
        else if (name == 'sp_mncg_tjdzxg') {
            if (this.editBox.string == '') {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '查找的自选股不能为空！');
                return;
            }

            let items = GameCfgText.getGPPKItemInfo(this.code);

            if (!items) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入正确的股票代码或股票名称！');
                return;
            }

            let code = items[0];
            if ((code + '').length >= 7) {
                code = (code + '').slice(1);
            }
            let info;
            if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
                if (GameData.selfStockList.indexOf(items[0]) != -1) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已添加，请重新输入');
                    this.editBox.string = '';
                    return;
                }

                info = {
                    removed: false,
                    code: items[0],
                    id: 0,
                    isAiStock: false,
                }
            }
            else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
                let arr = [];
                GameData.cgdsStockList.forEach(el => {
                    if (el.id == GameData.SpStockData.id) {
                        arr = el.stockList;
                    }
                })
                if (arr.indexOf(parseInt(items[0])) != -1) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已添加，请重新输入');
                    this.editBox.string = '';
                    return;
                }

                info = {
                    removed: false,
                    code: items[0],
                    id: GameData.SpStockData.id || 0,
                    isAiStock: false,
                }

            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_MncgEditStockList, buff, (res) => {

            })

            if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
                GameData.selfStockList.push(parseInt(items[0]));
            }
            else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
                // GameData.cgdsStockList.forEach(el => {
                //     if (el.id == GameData.SpStockData.id) {
                //         el.stockList.push(parseInt(items[0]));
                //     }
                // })

                for (let i = 0; i < GameData.cgdsStockList.length; i++) {
                    if (GameData.cgdsStockList[i].id == GameData.SpStockData.id) {
                        GameData.cgdsStockList[i].stockList.push(parseInt(items[0]));
                    }
                }
            }

            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '添加成功');
            this.editBox.string = '';

            GlobalEvent.emit(EventCfg.ADDZXGP);

        }

    }

}
