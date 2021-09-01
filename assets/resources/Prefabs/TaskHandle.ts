import PlatDefine from "../../sctiprs/common/config/PlatDefine";
import GameCfgText from "../../sctiprs/GameText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    scoll: cc.ScrollView = null;

    @property(cc.Node)
    item: cc.Node = null;

    taskConf = null;

    start() {
        this.taskConf = GameCfgText.gameTextCfg.task;
        console.log('任务配置：' + this.taskConf);

        for (var el in this.taskConf) {
            if (el != 'study') {

                this.taskConf[el].forEach(el => {

                    let node = cc.instantiate(this.item);
                    this.scoll.content.addChild(node);
                    node.getComponent('TaskItem').onShow(el);
                });
            }
        }



    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'leftBtn') {
            this.node.active = false;
        }
    }
}
