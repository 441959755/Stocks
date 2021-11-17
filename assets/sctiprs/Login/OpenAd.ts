import GameCfgText from "../GameText";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadImg from "../Utils/LoadImg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    img: cc.Sprite = null;

    @property(cc.Label)
    timeLa: cc.Label = null;

    call = null;

    id = 0;

    onLoad() {
        GlobalEvent.on('OPENADSHOW', this.initAD.bind(this), this);
        GlobalEvent.on('OPENADHIDE', () => {
            this.node.active = false;
        }, this);
    }

    initAD() {
        this.id = GameCfgText.adConf.launch[0].id;
        LoadImg.downloadRemoteImageAndSave(GameCfgText.adConf.launch[0].img, (flag, sp) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.img.spriteFrame = sp;
            let count = 3;

            this.timeLa.string = '跳过' + count;

            this.call = setInterval(() => {
                count--;
                this.timeLa.string = '跳过' + count;
                if (count < 0) {
                    this.node.active = false;
                    clearInterval(this.call);
                    this.call = null;
                }

            }, 1000);

        }, null)
    }

    start() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'ADimg') {
            let url = '';
            GameCfgText.adConf.ad.forEach(el => {
                if (el.id == this.id) {
                    url = el.url;
                }
            });
            cc.sys.openURL(url);
        }
    }

    onDestroy() {
        GlobalEvent.off('OPENADSHOW');
        this.call && (clearInterval(this.call));
        this.call = null;
    }


}
