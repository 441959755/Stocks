
import AudioUtils from "../../../sctiprs/Utils/AudioUtils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Toggle)
    toggle2: cc.Toggle = null;


    onEnable() {
        let effectVolume = AudioUtils.getEffectsVolume();

        if (effectVolume == 0) {
            this.toggle1.isChecked = false;
            this.toggle2.isChecked = true;
        } else {
            this.toggle2.isChecked = false;
            this.toggle1.isChecked = true;
        }
    }

    onEffectBtnClick(event, data) {
        let flag = parseInt(data);

        AudioUtils.setEffectsVolume(flag);

    }
}
