import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GameData from '../../../sctiprs/GameData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property([cc.Node])
    layers: cc.Node[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    _page = 0;
    _index = 0;

    childs = null;



    protected onLoad() {
        GlobalEvent.on('ItemValue', (val) => {
            let lab = this.layers[this._page].children[this._index].getChildByName('label');
            lab.getComponent(cc.Label).string = val;
            this.childs.active = false;
        }, this);
    }


    start() {
        this.openLayer();
    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
        this.layers.forEach((el, index) => {
            let data;
            if (index == 0) {
                data = GameData.ZBSet.MA;
            } else if (index == 1) {
                data = GameData.ZBSet.VOL;
            } else if (index == 2) {
                data = GameData.ZBSet.MACD;
            } else if (index == 3) {
                data = GameData.ZBSet.BOLL;
            } else if (index == 4) {
                data = GameData.ZBSet.KDJ;
            } else if (index == 5) {
                data = GameData.ZBSet.RSI;
            } else if (index == 6) {
                data = GameData.ZBSet.EXPMA;
            }
            if (index < 7) {
                el.children.forEach((e, tt) => {
                    if (e.name == 'node') {
                        if (data[tt]) {
                            e.getChildByName('label').getComponent(cc.Label).string = data[tt];
                        }
                    }
                })
            } else {
                let toggle1 = cc.find('toggleContainer1/toggle1', el);
                let toggle2 = cc.find('toggleContainer1/toggle2', el)
                toggle1.getComponent(cc.Toggle).isChecked = GameData.ZBSet.isShowVol;
                toggle2.getComponent(cc.Toggle).isChecked = !GameData.ZBSet.isShowVol;
                let toggle3 = cc.find('toggleContainer2/toggle1', el);
                let toggle4 = cc.find('toggleContainer2/toggle2', el)
                toggle3.getComponent(cc.Toggle).isChecked = GameData.ZBSet.isBW;
                toggle4.getComponent(cc.Toggle).isChecked = !GameData.ZBSet.isBW;
            }
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeSetBtn') {
            this.node.active = false;
        } else if (name == 'saveSetBtn') {
            let datas = GameData.ZBSet;
            this.layers.forEach((el, index) => {
                if (index < 7) {
                    el.children.forEach((e, tt) => {
                        if (e.name == 'node') {
                            let val = parseInt(e.getChildByName('label').getComponent(cc.Label).string);
                            if (index == 0) {
                                datas.MA[tt] = val
                            } else if (index == 1) {
                                datas.VOL[tt] = val
                            } else if (index == 2) {
                                datas.MACD[tt] = val;
                            } else if (index == 3) {
                                datas.BOLL[tt] = val;
                            } else if (index == 4) {
                                datas.KDJ[tt] = val;
                            } else if (index == 5) {
                                datas.RSI[tt] = val;
                            } else if (index == 6) {
                                datas.EXPMA[tt] = val;
                            }
                        }
                    })
                } else {
                    let toggle1 = cc.find('toggleContainer1/toggle1', el);
                    datas.isShowVol = toggle1.getComponent(cc.Toggle).isChecked;
                    let toggle3 = cc.find('toggleContainer2/toggle1', el);
                    datas.isBW = toggle3.getComponent(cc.Toggle).isChecked;
                }
            })
            GameData.ZBSet = datas;
            this.node.active = false;
        } else if (name == 'selectBtn') {
            this._index = parseInt(data);
            this.childs = this.layers[this._page].getChildByName('box').children[this._index];
            this.childs.active = true;

            let start, end;
            if (this._page == 0) {
                if (this._index == 0) {
                    start = 1;
                    end = 30;
                } else if (this._index == 1) {
                    start = 5;
                    end = 120;
                } else if (this._index == 2) {
                    start = 10;
                    end = 250;
                } else if (this._index == 3) {
                    start = 4;
                    end = 20;
                }
            } else if (this._page == 1) {
                if (this._index == 0) {
                    start = 3;
                    end = 45;
                } else if (this._index == 1) {
                    start = 10;
                    end = 120;
                }
            } else if (this._page == 2) {
                if (this._index == 0) {
                    start = 3;
                    end = 90;
                } else if (this._index == 1) {
                    start = 3;
                    end = 90;
                } else if (this._index == 2) {
                    start = 3;
                    end = 90;
                }
            } else if (this._page == 3) {
                if (this._index == 0) {
                    start = 3;
                    end = 90;
                }
            } else if (this._page == 4) {
                if (this._index == 0) {
                    start = 3;
                    end = 90;
                }
            } else if (this._page == 5) {
                if (this._index == 0) {
                    start = 2;
                    end = 120;
                } else if (this._index == 1) {
                    start = 2;
                    end = 250;

                } else if (this._index == 2) {
                    start = 2;
                    end = 250;
                }
            } else if (this._page == 6) {
                if (this._index == 0) {
                    start = 2;
                    end = 250;
                } else if (this._index == 1) {
                    start = 2;
                    end = 250;
                }
            }
            let content = cc.find('New ScrollView/view/content', this.childs);
            if (content.children.length == 0) {
                for (let i = start; i <= end; i++) {
                    let node = cc.instantiate(this.item);
                    content.addChild(node);
                    if (this._page == 0 && this._index == 3) {
                        node.getComponent(cc.Label).string = '-' + i + '%';
                    } else {
                        node.getComponent(cc.Label).string = i;
                    }

                }
            }
        } else if (name == 'DCnode') {
            event.target.parent.active = false;
        }
    }

    openLayer() {
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.layers[index].active = true;
                this._page = index;
            } else {
                this.layers[index].active = false;
            }
        })
    }


    onToggleSetClick() {
        this.openLayer();
    }

    protected onDestroy() {
        GlobalEvent.off('ItemValue');
    }
}
