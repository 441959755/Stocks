import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onLoad() {
        PopupManager.init();

        GlobalEvent.on(EventCfg.OPENHELPLAYER, this.openHelpLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDPGUESSHIS, this.openDpGuessHis.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDPGUESSRANK, this.openDpGuessRank.bind(this), this);

    }

    openHelpLayer() {

    }

    openDpGuessHis() {

    }

    openDpGuessRank() {

    }


    start() {

    }


    onDestroy() {
        PopupManager.delPopupNode();
        GlobalEvent.off(EventCfg.OPENHELPLAYER);
        GlobalEvent.off(EventCfg.OPENDPGUESSHIS);
        GlobalEvent.off(EventCfg.OPENDPGUESSRANK);
    }

}
