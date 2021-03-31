const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    boxs: cc.Node[] = [];

    setProId = 0;

    setPro=[];
    start() {


    }

    onBtnBoxSelectClick(event, data) {
        //  let name=event.target.name;
        // if(name=='selectBtn'){
        let index = parseInt(data);
        this.boxs[index].getChildByName('downBox').active = true;
        this.setProId = data;
        // }
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'DCnode') {
            event.target.parent.active = false;
        } else if (name == 'item') {
            let str=event.target.getComponent(cc.Label).string;
            this.boxs[this.setProId].getChildByName('label').getComponent(cc.Label).string='str';
            this.boxs[this.setProId].getChildByName('downBox').active = false;
            this.setPro[this.setProId]=str;
        }

    }

}
