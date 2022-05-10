import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuessControl extends cc.Component {


    onLoad() {
        PopupManager.init();

        GlobalEvent.on(EventCfg.OPENDPGUESSHIS, this.openDpGuessHis.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDPGUESSRANK, this.openDpGuessRank.bind(this), this);

    }



    openDpGuessHis() {

    }

    openDpGuessRank() {

    }


    start() {

    }


    onDestroy() {
        PopupManager.delPopupNode();
        GlobalEvent.off(EventCfg.OPENDPGUESSHIS);
        GlobalEvent.off(EventCfg.OPENDPGUESSRANK);
    }

}
