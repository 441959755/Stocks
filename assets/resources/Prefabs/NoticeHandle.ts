import LLWConfig from "../../sctiprs/common/config/LLWConfig";
import PlatDefine from "../../sctiprs/common/config/PlatDefine";
import GameCfgText from "../../sctiprs/GameText";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Label)
    inscribe: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;

    notice = null;

    onEnable() {

        if (GameCfgText.appConf) {
            // console.log('游戏公告：' + GameCfgText.appConf.maintain);
            if (LLWConfig.PLATTYPE == PlatDefine.PLAT_IOS) {
                this.notice = GameCfgText.appConf.maintain.noticeIos;
            }
            else {
                this.notice = GameCfgText.appConf.maintain.notice;
            }
        }

        if (!this.notice) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '配置未成功加载，请联系客服');
            this.node.active = false;
            return;
        }

        this.title.string = this.notice.title;

        this.content.string = this.notice.content;

        this.inscribe.string = this.notice.Inscribe;

        this.time.string = this.notice.publishtime;

    }


    onBtnClick(event, curData) {

        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }

    }
}
