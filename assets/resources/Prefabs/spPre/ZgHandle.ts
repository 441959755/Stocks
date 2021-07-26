import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    zgHisData = [];

    start() {
        let zgHisData = cc.sys.localStorage.getItem('ZGHISDATA');
        if (zgHisData) {
            this.zgHisData = JSON.parse(zgHisData);

            this.zgHisData.forEach(el => {
                let node = cc.instantiate(this.item);
                this.content.addChild(node);

                let codeInfo = GameCfgText.getGPPKItemInfo(el);

                let label = node.getComponent(cc.Label);

                label.string = codeInfo[0] + ' ' + codeInfo[1];
            });
        }

        // this.editBox.node.on('editing-did-ended', (edit) => {
        //     let str = edit.string;
        //     if (str == '') { return }
        //     else {
        //         let datas = GameCfgText.stockList;
        //         let flag = false, tt = [];
        //         for (let i = 0; i < datas.length; i++) {
        //             let arr1 = datas[i].split('|');
        //             let str1 = arr1[0];
        //             if (arr1[0].length >= 7) {
        //                 str1 = arr1[0].slice(1);
        //             }
        //             if (tt.length >= 100) {
        //                 break;
        //             }
        //             if (str1.indexOf(str) != -1) {
        //                 tt.push(datas[i]);
        //                 flag = true;
        //             } else if (arr1[1].indexOf(str) != -1) {
        //                 tt.push(datas[i]);
        //                 flag = true;
        //             }
        //         }
        //         if (!flag) {
        //             GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有找查到您要的股票.');
        //         }
        //         else {

        //         }
        //     }
        // })

    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }

        else if (name == 'xl_xzb_xialaarr') {
            //this.node.active = true;
            this.scrollView.active = true;
        }

        else if (name == 'nodeBtn') {
            this.scrollView.active = false;
        }

        else if (name == 'item') {
            let info = event.target.getComponent(cc.Label).string;
            this.editBox.string = info;
        }

        else if (name == 'sp_znxg_zhengu') {

            let code = this.editBox.string.split(' ');

            let info = GameCfgText.getGPPKItemInfo(code[0]);

            if (info) {
                if (this.zgHisData.indexOf(info[0]) == -1) {
                    this.zgHisData.push(info[0]);
                    cc.sys.localStorage.setItem('ZGHISDATA', JSON.stringify(this.zgHisData));

                    let node = cc.instantiate(this.item);
                    this.content.addChild(node);
                    let label = node.getComponent(cc.Label);
                    label.string = info[0] + ' ' + info[1];
                }
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的股票有误');
            }

        }

    }
}
