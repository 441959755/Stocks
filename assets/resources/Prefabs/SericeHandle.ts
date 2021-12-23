import LLWSDK from "../../sctiprs/common/sdk/LLWSDK";
import GameCfgText from "../../sctiprs/GameText";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SericeHandle extends cc.Component {
    @property(cc.Label)
    qqLabel: cc.Label = null;

    @property(cc.Label)
    wxLabel: cc.Label = null;

    @property(cc.Label)
    gzhLabel: cc.Label = null;

    @property(cc.Label)
    qunLabel: cc.Label = null;



    start() {
        this.qqLabel.string = GameCfgText.appConf.QQ;
        this.wxLabel.string = GameCfgText.appConf.wechat;
        this.gzhLabel.string = GameCfgText.appConf.wechatGZH;
        this.qunLabel.string = GameCfgText.appConf.QQ_Group;

    }


    onBtnClick(event, curData) {
        let name = event.target.name;
        switch (name) {
            case 'closeBtn':
                this.node.active = false;
                break;

            case "main_kf_tj":
                let str;
                if (curData == 1) {
                    str = GameCfgText.appConf.QQ;
                }
                else if (curData == 2) {
                    str = GameCfgText.appConf.wechat;
                }
                else if (curData == 3) {
                    str = GameCfgText.appConf.wechatGZH;
                }
                else if (curData == 4) {
                    str = GameCfgText.appConf.QQ_Group;
                }
                LLWSDK.getSDK().copyborad(str);
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已复制到剪贴板');
                break;

            default:
                break;
        }

    }

}
