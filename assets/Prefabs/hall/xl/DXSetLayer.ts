import GlobalEvent from '../../../sctiprs/Utils/GlobalEvent';
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameData from '../../../sctiprs/GameData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    toggles1: cc.Toggle[] = [];

    @property([cc.Toggle])
    toggles2: cc.Toggle[] = [];

    @property([cc.Toggle])
    toggles3: cc.Toggle[] = [];

    @property([cc.Toggle])
    toggles4: cc.Toggle[] = [];

    @property([cc.Toggle])
    toggles5: cc.Toggle[] = [];

    @property([cc.Label])
    labels: cc.Label[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    _Lid = 0;

    @property([cc.Node])
    content: cc.Node[] = [];

    @property(cc.Node)
    scroll: cc.Node = null;

    @property(cc.Prefab)
    preNode: cc.Prefab = null;


    protected onLoad() {

        this.content.forEach(el => {
            el.removeAllChildren();
        })
    }

    onEnable() {
        // this.toggles[0].isChecked=GameData.

        this.toggles1[0].isChecked = GameData.DXSet.k_notice;
        this.toggles2[0].isChecked = GameData.DXSet.jx_notice;
        this.toggles3[0].isChecked = GameData.DXSet.StopCheck_notice;
        this.toggles4[0].isChecked = GameData.DXSet.isShowVol;
        this.toggles5[0].isChecked = GameData.DXSet.isBW;

        this.toggles1[1].isChecked = !GameData.DXSet.k_notice;
        this.toggles2[1].isChecked = !GameData.DXSet.jx_notice;
        this.toggles3[1].isChecked = !GameData.DXSet.StopCheck_notice;
        this.toggles4[1].isChecked = !GameData.DXSet.isShowVol;
        this.toggles5[1].isChecked = !GameData.DXSet.isBW;

        this.labels[0].string = GameData.DXSet.MA1Date;
        this.labels[1].string = GameData.DXSet.MA2Date;
        this.labels[2].string = GameData.DXSet.MA3Date;
        this.labels[3].string = GameData.DXSet.MA4Date;
        this.labels[4].string = GameData.DXSet.MA5Date;
        this.labels[5].string = GameData.DXSet.MA6Date;

        this.toggles[0].isChecked = GameData.DXSet.isMA1;
        this.toggles[1].isChecked = GameData.DXSet.isMA2;
        this.toggles[2].isChecked = GameData.DXSet.isMA3;
        this.toggles[3].isChecked = GameData.DXSet.isMA4;
        this.toggles[4].isChecked = GameData.DXSet.isMA5;
        this.toggles[5].isChecked = GameData.DXSet.isMA6;

        GlobalEvent.on('ItemValue', (data) => {
            this.labels[this._Lid].string = data;
            this.scroll.active = false;
        }, this);
    }

    protected onDisable() {
        GlobalEvent.off('ItemValue');
    }

    onSaveToggle() {
        GameData.DXSet.k_notice = this.toggles1[0].isChecked;
        GameData.DXSet.jx_notice = this.toggles2[0].isChecked;
        GameData.DXSet.StopCheck_notice = this.toggles3[0].isChecked;
        GameData.DXSet.isShowVol = this.toggles4[0].isChecked;

        GameData.DXSet.isBW = this.toggles5[0].isChecked;

        GameData.DXSet.MA1Date = this.labels[0].string;
        GameData.DXSet.MA2Date = this.labels[1].string;
        GameData.DXSet.MA3Date = this.labels[2].string;

        GameData.DXSet.MA4Date = this.labels[3].string;

        GameData.DXSet.MA5Date = this.labels[4].string;
        GameData.DXSet.MA6Date = this.labels[5].string;

        GameData.DXSet.isMA1 = this.toggles[0].isChecked;
        GameData.DXSet.isMA2 = this.toggles[1].isChecked;

        GameData.DXSet.isMA3 = this.toggles[2].isChecked;

        GameData.DXSet.isMA4 = this.toggles[3].isChecked;
        GameData.DXSet.isMA5 = this.toggles[4].isChecked;
        GameData.DXSet.isMA6 = this.toggles[5].isChecked;

        GameData.DXSet = GameData.DXSet;
        console.log(JSON.stringify(GameData.DXSet));

    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeSetBtn') {
            this.node.active = false;
        }
        else if (name == 'lx_srk_1') {

            this.scroll.active = true;
            let parnet = event.target.parent.parent;
            if (parseInt(data) < 3) {
                this.scroll.y = (parnet.y - parnet.height / 2);
            } else {
                this.scroll.y = parnet.y + parnet.height / 2 + this.scroll.height;
            }

            let index = 1, max = 30;
            if (data == 0) {
                index = 1;
                max = 30;
                this._Lid = 0;
            } else if (data == 1) {
                index = 2; max = 60;
                this._Lid = 1;
            } else if (data == 2) {
                index = 3; max = 90;
                this._Lid = 2;
            } else if (data == 3) {
                index = 5; max = 120;
                this._Lid = 3;
            } else if (data == 4) {
                index = 10; max = 240;
                this._Lid = 4;
            } else if (data == 5) {
                index = 120; max = 240;
                this._Lid = 5;
            }
            this.content.forEach(el => {
                el.active = false;
            })
            this.content[this._Lid].active = true;

            if (this.content[this._Lid].children.length <= 0) {
                for (let i = index; i <= max; i++) {
                    let node = cc.instantiate(this.preNode);
                    this.content[this._Lid].addChild(node);
                    node.getComponent(cc.Label).string = i + '';
                }
            }
            this.scroll.getComponent(cc.ScrollView).content = this.content[this._Lid];
        } else if (name == 'saveSetBtn') {

            this.onSaveToggle();
            this.node.active = false;

        } else if (name == 'viewMask') {
            this.scroll.active = false;
            this.content.forEach(el => {
                el.active = false;
            })
        }
    }

}
