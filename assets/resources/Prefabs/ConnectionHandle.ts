
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    callBack = null;

    protected onEnable(): void {
        this.loading.angle = 0;
        let index = 0;
        let arr = ['...', '..', '.'];
        this.callBack = setInterval(() => {
            this.loading.angle -= 10;
            if (index > 2) {
                index = 0;
            }
            this.label.string = '连接网络中' + arr[index++];
        }, 100);
    }

    protected onDisable(): void {
        this.callBack && (clearInterval(this.callBack));
        this.callBack = null;
    }
}
