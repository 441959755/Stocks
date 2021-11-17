import GameCfgText from "../GameText";
import LoadImg from "../Utils/LoadImg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    imgAd: cc.Sprite = null;

    id = null;

    start() {
        this.id = GameCfgText.adConf.main[0].id;
        LoadImg.downloadRemoteImageAndSave(GameCfgText.adConf.main[0].img, (flag, sp) => {
            this.imgAd.spriteFrame = sp;
        }, null)
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
