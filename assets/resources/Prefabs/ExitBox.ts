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

    version = 0;

    start() {
        this.id = GameCfgText.adConf.exit[0].id;
        let version = cc.sys.localStorage.getItem('LAUNCHAD');
        if (!version) {
            cc.sys.localStorage.setItem('LAUNCHAD', GameCfgText.adConf.launch[0].version);
            version = GameCfgText.adConf.launch[0].version;
        }
        this.version = version;
        LoadImg.downloadRemoteImageAndSave(GameCfgText.adConf.exit[0].img, (flag, sp) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.img.spriteFrame = sp;
        }, this.version == GameCfgText.adConf.launch[0].versionl)
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
