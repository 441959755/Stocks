import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';

import GameCfg from '../game/GameCfg';
import GameData from '../GameData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    boxs: cc.Node[] = [];

    @property([cc.Node])
    downBoxs: cc.Node[] = [];

    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    @property(cc.EditBox)
    edit: cc.EditBox = null;

    _tipsLa = null;

    setProId = 0;

    onLoad() {
        this._tipsLa = this.edit.node.getChildByName('tipslabel');
        this.edit.node.on('editing-did-ended', (edit) => {
            let str = edit.string;
            if (str == '') {
                return;
            } else {
                let datas = stocklist;
                let flag = false, tt;
                for (let i = 0; i < datas.length; i++) {
                    if (datas[i].indexOf(str) != -1) {
                        tt = datas[i];
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    this._tipsLa.color = cc.Color.RED
                } else {
                    this._tipsLa.color = new cc.Color().fromHEX('#BBBBBB');
                    this._tipsLa.active = false;
                    let arr = tt.split('|');
                    this.boxs[2].getChildByName('label').getComponent(cc.Label).string = arr[0] + '  ' + arr[1];
                    edit.string = '';
                }
            }
        }, this);
    }

    onEnable() {
        if (!gameData.DXSet) { return }
        GlobalEvent.emit(EventCfg.SHOWOTHERNODE, this);

        this.boxs.forEach((el, index) => {
            let la = el.getChildByName('label').getComponent(cc.Label);
            if (index == 0) {
                la.string = gameData.DXSet.market;
            } else if (index == 1) {
                la.string = gameData.DXSet.search;
            } else if (index == 2) {
                la.string = gameData.DXSet.year;
            } else if (index == 3) {
                la.string = gameData.DXSet.month;
            } else if (index == 4) {
                la.string = gameData.DXSet.day;
            } else if (index == 5) {
                la.string = gameData.DXSet.line;
            } else if (index == 6) {
                la.string = gameData.DXSet.KLine;
            } else if (index == 7) {
                la.string = gameData.DXSet.ZLine;
            }
        })
        this.toggle.isChecked = gameData.DXSet.isFC;
    }

    onBoxSelectClick(event, data) {
        let index = parseInt(data);
        let downBox = this.downBoxs[index];
        downBox.active = true;
        this.setProId = data;
        //当前年月的天数
        if (index == 3 || index == 4) {
            let year = this.boxs[2].getChildByName('label').getComponent(cc.Label).string;
            let month = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
            var temp = new Date(parseInt(year), parseInt(month), 0);
            let day = temp.getDate();
            let content = cc.find('New ScrollView/view/content', downBox);
            content.children.forEach(el => {
                let str = el.getComponent(cc.Label).string;
                if (parseInt(str) > day) {
                    if (index == 4) {
                        el.color = new cc.Color().fromHEX('#a0a0a0');
                        el.getComponent(cc.Button).interactable = false;
                        el.getComponent(cc.Button).enabledInHierarchy = true;
                    } else {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                } else {
                    if (index == 4) {
                        el.color = cc.Color.WHITE;
                        el.getComponent(cc.Button).interactable = true;
                        el.getComponent(cc.Button).enableAutoGrayEffect = false;
                    } else {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                }
            })
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'DCnode') {
            event.target.parent.active = false;
        } else if (name == 'item') {
            let str = event.target.getComponent(cc.Label).string;
            this.boxs[this.setProId].getChildByName('label').getComponent(cc.Label).string = str;
            this.downBoxs[this.setProId].active = false;
            if (this.setProId == 3) {
                let downBox = this.downBoxs[this.setProId];
                let year = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
                let month = this.boxs[4].getChildByName('label').getComponent(cc.Label).string;
                var temp = new Date(parseInt(year), parseInt(month), 0);
                let day = temp.getDate();
                let content = cc.find('New ScrollView/view/content', downBox);

                content.children.forEach(el => {
                    let str = el.getComponent(cc.Label).string;
                    if (parseInt(str) > day) {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    } else {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                })
            }

            else if (this.setProId == 1) {
                if (str == '随机选股') {
                    this._tipsLa.active = true;
                } else {
                    this._tipsLa.active = false;
                }
            }

            if (this.setProId == 0) {
                gameData.DXSet.market = str;
            } else if (this.setProId == 1) {
                gameData.DXSet.search = str;
            } else if (this.setProId == 2) {
                gameData.DXSet.year = str;
            } else if (this.setProId == 3) {
                gameData.DXSet.month = str;
            } else if (this.setProId == 4) {
                gameData.DXSet.day = str;
            } else if (this.setProId == 5) {
                gameData.DXSet.line = str;
            } else if (this.setProId == 6) {
                gameData.DXSet.KLine = str;
            } else if (this.setProId == 7) {
                gameData.DXSet.ZLine = str;
            }

        } else if (name == 'setDXBtnDX') {
            GlobalEvent.emit('OPENSETLAYER', 'DX');
        } else if (name == 'historyDXBtn') {
            GlobalEvent.emit("OPENHISTORYLAYER", 'DX');
        } else if (name == 'startDXBtn') {
            GameCfg.GameType = 2;
            GameCfg.GameSet = cc.ext.gameData.DXSet;
            this.DXStartGameSet();
        }
    }

    onToggleClick() {
        gameData.DXSet.isFC = this.toggle.isChecked;
    }


    onDisable() {
        gameData.DXSet = gameData.DXSet;
    }

    DXStartGameSet() {
        let data = {
            ktype: null,
            kstyle: null,
            code: null,
            from: null,
            total: parseInt(gameData.DXSet.KLine) + 150,
            to: 0,
        }
        let items
        if (gameData.DXSet.search == '随机选股') {
            let le = parseInt(Math.random() * stocklist.length);
            items = stocklist[le].split('|');
            data.code = items[0];
            // if (data.code < 600000) {
            //     this.DXStartGameSet();
            //     return;
            // }
        } else {
            let dex;
            let arrStr = gameData.DXSet.search.split(' ');
            for (let i = 0; i < stocklist.length; i++) {

                if (stocklist[i].indexOf(arrStr[0]) != -1) {
                    dex = i;
                    break;
                }

                if (stocklist[i].indexOf(arrStr[1]) != -1) {
                    dex = i;
                    break;
                }
            }
            if (dex) {
                items = stocklist[dex].split('|');
                data.code = items[0];
            } else {
                console.log('输入的股票代码不正确');
                //  this.DXStartGameSet();
                return;
            }
        }

        if (gameData.DXSet.market == '随机行情') {
            data.kstyle = 0;
        } else if (gameData.DXSet.market == '震荡行情') {
            data.kstyle = 1;
        } else if (gameData.DXSet.market == '单边向上行情') {
            data.kstyle = 2;
        } else if (gameData.DXSet.market == '单边向下行情') {
            data.kstyle = 3;
        }

        if (gameData.DXSet.ZLine == '日线') {
            data.ktype = 10;
        } else if (gameData.DXSet.ZLine == '周线') {
            data.ktype = 11;
        } else if (gameData.DXSet.ZLine == '30分钟K') {
            data.ktype = 4;
        } else if (gameData.DXSet.ZLine == '60分钟K') {
            data.ktype = 5;
        }

        if (gameData.DXSet.year != '随机') {
            let seletTime = gameData.DXSet.year + '' + gameData.DXSet.month + '' + gameData.DXSet.day;
            if (parseInt(seletTime) < parseInt(items[2])) {
                console.log('时间不能早与股票创建时间');
                // if (gameData.DXSet.search == '随机选股') {
                this.DXStartGameSet();
                //  }
                return;
            } else if (parseInt(seletTime) > parseInt(items[3])) {
                if (parseInt(items[3]) != 0) {
                    console.log('时间不能大与股票结束时间');
                    //  if (gameData.DXSet.search == '随机选股') {
                    this.DXStartGameSet();
                    //  }
                    return;
                }
            }
            data.from = seletTime;
        } else {
            let start = items[2], end = items[3], sc;
            if (end == 0) {
                sc = new Date().getTime();
            } else {
                let year = end.slice(0, 4);
                let month = end.slice(4, 6);
                let day = end.slice(6);

                let d = new Date(year + '-' + month + '-' + day);

                sc = d.getTime();
            }
            let year = start.slice(0, 4);
            let month = start.slice(4, 6);
            let day = start.slice(6);


            let d = new Date(year + '-' + month + '-' + day);
            ///console.log(d); 
            let t = d.getTime();

            let s = Math.random() * (sc - t) + t;

            let f = new Date(s);

            {
                let ye = f.getFullYear();
                let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

                let da = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

                data.from = ye + '' + mon + '' + da;
            }
        }
        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].code = items[0];
        GameCfg.data[0].circulate = items[4];
        GlobalEvent.emit('onCmdQuoteQuery', data, 2);
    }


}
