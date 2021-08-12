
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	loading: cc.Node = null;

	@property(cc.Label)
	label: cc.Label = null;

	callBack = null;

	callBack1 = null;

	protected onEnable() {

		this.callBack = setTimeout(() => {
			this.node.active = false;
		}, 4000);

		let index = 0;
		let arr = ['...', '..', '.'];
		this.callBack1 = setInterval(() => {
			this.loading.angle += 10;
			if (index > 2) {
				index = 0;
			}
			this.label.string = '正在加载中' + arr[index++];
		}, 300);

	}

	protected onDisable() {
		this.callBack && clearTimeout(this.callBack);
		this.callBack = null;

		this.callBack1 && (clearInterval(this.callBack1))
		this.callBack1 = null;
	}
}
