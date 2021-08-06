// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "../../../protos/proto";
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

                    this.editBox.string = items[0] + '        ' + items[1];
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

            if (GameData.selfStockList.indexOf(items) != -1) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已添加，请重新输入');
                this.editBox.string = '';
                return;
            }

            let info = {
                removed: false,
                code: items[0],
                id: 0,
                isAiStock: false,
            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_MncgEditStockList, buff, (res) => {

            })
            GameData.selfStockList.push(items[0]);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '添加成功');
            this.editBox.string = '';

            GlobalEvent.emit(EventCfg.ADDZXGP);

        }

    }

}
