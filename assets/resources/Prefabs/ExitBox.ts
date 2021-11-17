import GameCfgText from "../../sctiprs/GameText";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import LoadImg from "../../sctiprs/Utils/LoadImg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    img: cc.Sprite = null;

    id = null;


    start() {
        this.id = GameCfgText.adConf.exit[0].id;
        LoadImg.downloadRemoteImageAndSave(GameCfgText.adConf.exit[0].img, (flag, sp) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.img.spriteFrame = sp;
        }, null)
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'imgAD') {
            let url = '';
            GameCfgText.adConf.ad.forEach(el => {
                if (el.id == this.id) {
                    url = el.url;
                }
            });
            cc.sys.openURL(url);
        }

        else if (name == 'sys_tck_qd') {
            cc.game.end();
        }

        else if (name == 'sys_tck_qx') {
            this.node.active = false;
        }
    }
}
