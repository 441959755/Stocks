

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property([cc.Label])
    lables: cc.Label[] = [];

    protected onLoad(): void {

    }


}
