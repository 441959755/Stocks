
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GameData from '../../../sctiprs/GameData';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    showVol: cc.Toggle[] = [];

    @property([cc.Toggle])
    BW: cc.Toggle[] = [];

    @property([cc.Toggle])
    MAs: cc.Toggle[] = [];

    @property([cc.Label])
    MaDates: cc.Label[] = [];

    @property(cc.Node)
    scroll: cc.Node = null;

    @property(cc.Prefab)
    preNode: cc.Prefab = null;

    @property([cc.Node])
    content: cc.Node[] = [];

    _Lid = 0;

    protected onLoad() {
        // GlobalEvent.on('ItemValue', (data) => {
        //     this.MaDates[this._Lid].string = data;
        //     this.scroll.active = false;
        // }, this);

        this.content.forEach(el => {
            el.removeAllChildren();
        })

        // 

        //  if (this.content[this._Lid].children.length <= 0) {
        for (let i = 1; i <= 240; i++) {
            let node = cc.instantiate(this.preNode);
            this.content[0].addChild(node);
            node.getComponent(cc.Label).string = i + '';
        }
        //   }


    }

    protected onDisable() {
        GlobalEvent.off('ItemValue');
    }

    start() {
        this.scroll.active = false;

    }

    protected onEnable() {
        GlobalEvent.on('ItemValue', (data) => {
            this.MaDates[this._Lid].string = data;
            this.scroll.active = false;
        }, this);
        this.initToggle();
        ActionUtils.openLayer(this.node);

    }

    //默认的选项
    initToggle() {
        let data = GameData.SMSet;
        this.showVol[0].isChecked = data.isShowVol;
        this.showVol[1].isChecked = !data.isShowVol;
        this.BW[0].isChecked = data.isBW;
        this.BW[1].isChecked = !data.isBW;
        this.MAs[0].isChecked = data.isMA1;
        this.MAs[1].isChecked = data.isMA2;
        this.MAs[2].isChecked = data.isMA3;
        this.MAs[3].isChecked = data.isMA4;
        this.MAs[4].isChecked = data.isMA5;
        this.MAs[5].isChecked = data.isMA6;

        this.MaDates[0].string = data.MA1Date;
        this.MaDates[1].string = data.MA2Date;
        this.MaDates[2].string = data.MA3Date;
        this.MaDates[3].string = data.MA4Date;
        this.MaDates[4].string = data.MA5Date;
        this.MaDates[5].string = data.MA6Date;

    }

    //保存设置的数据
    SaveToggle() {
        let data = GameData.SMSet;
        data.isShowVol = this.showVol[0].isChecked ? true : false;
        data.isBW = this.BW[0].isChecked ? true : false;

        data.isMA1 = this.MAs[0].isChecked ? true : false;

        data.isMA2 = this.MAs[1].isChecked ? true : false;
        data.isMA3 = this.MAs[2].isChecked ? true : false;
        data.isMA4 = this.MAs[3].isChecked ? true : false;
        data.isMA5 = this.MAs[4].isChecked ? true : false;
        data.isMA6 = this.MAs[5].isChecked ? true : false;

        data.MA1Date = parseInt(this.MaDates[0].string);
        data.MA2Date = parseInt(this.MaDates[1].string);
        data.MA3Date = parseInt(this.MaDates[2].string);
        data.MA4Date = parseInt(this.MaDates[3].string);
        data.MA5Date = parseInt(this.MaDates[4].string);
        data.MA6Date = parseInt(this.MaDates[5].string);

        GameData.SMSet = data;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeSetBtn') {
            this.node.active = false;
        } else if (name == 'saveSetBtn') {
            //保存选择的数据

            this.SaveToggle();
            this.node.active = false;

        } else if (name == 'lx_srk_1') {
            this._Lid = parseInt(data);
            this.scroll.active = true;
            let parnet = event.target.parent.parent;
            if (parseInt(data) < 3) {
                this.scroll.y = (parnet.y - parnet.height / 2);
            } else {
                this.scroll.y = parnet.y + parnet.height / 2 + this.scroll.height;
            }
            let index = 1, max = 30;
            if (this._Lid == 0) {
                index = 1;
                max = 30;
            } else if (this._Lid == 1) {
                index = 2; max = 60;
            } else if (this._Lid == 2) {
                index = 3; max = 90;
            } else if (this._Lid == 3) {
                index = 5; max = 120;
            } else if (this._Lid == 4) {
                index = 10; max = 240;
            } else if (this._Lid == 5) {
                index = 120; max = 240;
            }

            this.scroll.getComponent(cc.ScrollView).content = this.content[0];
            this.content[0].active = true;

            this.content[0].children.forEach((el, t) => {
                if (t >= (index - 1) && t <= (max - 1)) {
                    el.active = true;
                } else {
                    el.active = false;
                }
            })

        } else if (name == 'viewMask') {
            this.scroll.active = false;
            this.content.forEach(el => {
                el.active = false;
            })
        }
    }

}
