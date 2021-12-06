import GameCfgText from "../GameText";
import LoadImg from "../Utils/LoadImg";
import Game = cc.Game;

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    imgAd: cc.Sprite = null;

    id = null;

    version = 0;

    start() {

        if(!GameCfgText.adConf){
            return;
        }

        this.id = GameCfgText.adConf.main[0].id;

        let version = cc.sys.localStorage.getItem('LAUNCHAD');

        if (!version) {
            cc.sys.localStorage.setItem('LAUNCHAD', GameCfgText.adConf.launch[0].version);
            version = GameCfgText.adConf.launch[0].version;
        }

        this.version = version;
        LoadImg.downloadRemoteImageAndSave(GameCfgText.adConf.main[0].img, (flag, sp) => {
            this.imgAd.spriteFrame = sp;
        }, this.version == GameCfgText.adConf.launch[0].version)
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;

        if (name == 'imgAd') {
            let url = '';
            GameCfgText.adConf.ad.forEach(el => {
                if (el.id == this.id) {
                    url = el.url;
                }
            });
            cc.sys.openURL(url);
        }
    }


}
