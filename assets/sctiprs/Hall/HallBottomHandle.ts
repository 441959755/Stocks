
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start() {

    }


    onClick(event, data) {
        let name = event.target.name;
        //公告
        if (name == 'main_smbt_gg1') {

        }
        //好友
        else if (name == 'main_smbt_hy1') {

        }
        //反馈
        else if (name == 'main_smbt_fk1') {

        }
        //任务
        else if (name == 'main_smbt_rw1') {

        }
        //排行
        else if (name == 'main_smbt_ph1') {

        }
        //商城
        else if (name == 'main_smbt_sc1') {

        }
    }

    // update (dt) {}
}
