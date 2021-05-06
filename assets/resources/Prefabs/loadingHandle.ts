
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	loading: cc.Node = null;

	callBack = null;

	// LIFE-CYCLE CALLBACKS:

	protected onEnable() {	
		cc.tween(this.loading)
			.by(0.1, { angle: 10 })
			.repeatForever()
			.start();

		this.callBack = setTimeout(() => {
			this.node.active = false;
			this.callBack && clearTimeout(this.callBack);
			this.callBack = null;
		}, 3000);
	}

	protected onDisable() {
		this.loading.stopAllActions();
		this.callBack && clearTimeout(this.callBack);
		this.callBack = null;
	}
}
