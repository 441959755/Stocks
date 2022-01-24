import LLWConfig from "../../../sctiprs/common/config/LLWConfig";
import GameCfgText from "../../../sctiprs/GameText";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import LoadUtils from "../../../sctiprs/Utils/LoadUtils";
import PopupManager from "../../../sctiprs/Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    btn: cc.Sprite = null;

    @property(cc.Label)
    tips: cc.Label = null;

    bgSp: cc.SpriteFrame = null;

    btnSp: cc.SpriteFrame = null;


    protected start(): void {

        let bgurl = LLWConfig.LOADIMGURL + '/img/activity/cgds_bg.png';
        let btnUrl = LLWConfig.LOADIMGURL + '/img/activity/cgds_btn.png'
        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        LoadUtils.load(bgurl, (sp) => {
            console.log(bgurl);
            this.bgSp = new cc.SpriteFrame(sp);
            //   if (this.bgSp && this.btnSp) {
            this.onShow();
            // }
            // else {
            //     this.node.active = false;
            // }

        })

        LoadUtils.load(btnUrl, (sp) => {
            console.log(btnUrl);
            this.btnSp = new cc.SpriteFrame(sp);
            //  if (this.bgSp && this.btnSp) {
            this.onShow();
            //  }
            // else {
            //     this.node.active = false;
            // }
        })
    }


    onShow() {
        this.bg.spriteFrame = this.bgSp;
        this.btn.spriteFrame = this.btnSp;
        this.tips.string = GameCfgText.appConf.pop[2].text;
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        switch (name) {
            case 'mask':
                this.node.active = false;
                break;
            case 'btnActive':
                this.node.active = false;
                // GlobalEvent.emit(EventCfg.OPENCGDS);
                PopupManager.openNode(this.node.parent, null, 'Prefabs/sericeBox1', 11, (node) => {
                    let handle = node.getComponent('SericeBox1');
                    handle.onShow('下载完整版，参与比赛获取奖金');
                    ActionUtils.openBox(node);
                })
                break;
            default:
                break;
        }
    }

    onDisable() {
        PopupManager.arrPop.remove(3);
    }


}
