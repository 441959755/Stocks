// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

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

            let items = GameCfgText.getGPPKItemInfo(this.editBox.string);

            if (!items) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入正确的股票代码或股票名称！');
                return;
            }

            let code = items[0];
            if ((code + '').length >= 7) {
                code = (code + '').slice(1);
            }


        }

    }


}
