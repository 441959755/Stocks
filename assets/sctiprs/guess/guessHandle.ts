import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuessHandle extends cc.Component {

    onToggleClick(event, data) {
        let name = event.node.name;
        //上证指据
        if (name == 'toggle1') {

        }
        //深证成指
        else if (name == 'toggle2') {

        }
        //创业扳指
        else if (name == 'toggle3') {

        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'sys_back') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            cc.director.loadScene('hall');
        }
        //点击历史记录
        else if (name == 'xl_topbtn_lsjl') {

        }
        //点击排行
        else if (name == 'sp_topbtn_phb') {

        }
        //点击帮助
        else if (name == 'sp_topbtn_help') {

        }
        //休息数据
        else if (name == 'sp_dpjc_xxsj') {

        }
    }
}
