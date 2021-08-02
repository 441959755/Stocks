
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    // onLoad () {}

    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

        //记录
        else if (name == 'sp_topbtn_jyjl') {

        }

        //添加自选
        else if (name == 'sp_topbtn_tianjia') {

        }
        //帮组
        else if (name == 'sp_topbtn_help') {

        }

        else if (name == 'sp_mncg_arrqh') {

        }

        //越换资产
        else if (name == 'sp_mncg_dhzc') {

        }



    }


    onToggleClick(event, data) {
        let name = event.node.name;

        if (name == 'toggle1') {

        }
        else if (name == 'toggle2') {

        }
    }
}
