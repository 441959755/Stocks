import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';

import GameCfg from '../game/GameCfg';
import GameData from '../GameData';
import { pb } from '../../protos/proto';

import GameCfgText from '../GameText';
import HttpUtils from '../common/net/HttpUtils';

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

    @property([cc.Toggle])
    hangqingToggle: cc.Toggle[] = [];

    _tipsLa = null;

    setProId = 0;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    onLoad() {
        this._tipsLa = this.edit.node.getChildByName('tipslabel');
        this.edit.node.on('editing-did-ended', (edit) => {
            if (!this.onTipsInfo()) {
                edit.string = '';
                GameData.DXSet.search = '随机选股';
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, GameData.DXSet.market + '不支持自定义当前选项')
                return;
            }
            let str = edit.string;
            if (str == '') {
                return;
            } else {
                let datas = GameCfgText.stockList;
                let flag = false, tt = [];
                for (let i = 0; i < datas.length; i++) {
                    let arr1 = datas[i].split('|');
                    let str1 = arr1[0];
                    if (arr1[0].length >= 7) {
                        str1 = arr1[0].slice(1);
                    }
                    if (tt.length >= 100) {
                        break;
                    }
                    if (str1.indexOf(str) != -1) {
                        tt.push(datas[i]);
                        flag = true;
                        //  break;
                    }

                    else if (arr1[1].indexOf(str) != -1) {
                        tt.push(datas[i]);
                        flag = true;
                        //  break;
                    }
                }
                if (!flag) {
                    this._tipsLa.color = cc.Color.RED;
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有找查到您要的股票.');
                    edit.string = '';
                } else {
                    this.content.removeAllChildren();
                    this.downBoxs[8].active = true;
                    this.setProId = 1;
                    this._tipsLa.color = new cc.Color().fromHEX('#BBBBBB');
                    this._tipsLa.active = false;
                    // let item = cc.find('downBox/New ScrollView/view/content/item', this.downBoxs[1]);
                    // let content = cc.find('downBox/New ScrollView/view/content', this.downBoxs[1]);
                    for (let i = 0; i < tt.length; i++) {
                        let arr = tt[i].split('|');
                        let str = arr[0];
                        if (arr[0].length >= 7) {
                            str = arr[0].slice(1);
                        }
                        if (i == 0) {

                            this.boxs[1].getChildByName('label').getComponent(cc.Label).string = str + '  ' + arr[1];
                            GameData.DXSet.search = arr[0];
                        }
                        let node = cc.instantiate(this.item);
                        this.content.addChild(node);
                        node.getComponent(cc.Label).string = str + '  ' + arr[1];
                    }

                    edit.string = '';
                }
            }
        }, this);
    }

    onEnable() {
        this.onShow();
    }

    onShow() {
        if (!GameData.DXSet) { return }
        GlobalEvent.emit(EventCfg.SHOWOTHERNODE, this);

        this.boxs.forEach((el, index) => {
            let la;
            if (index != 0) {
                la = el.getChildByName('label').getComponent(cc.Label);
            }

            if (index == 0) {
                // la.string = GameData.DXSet.market;
                if (GameData.DXSet.market == '随机行情') {
                    this.hangqingToggle[0].isChecked = true;
                } else if (GameData.DXSet.market == '单边上涨') {
                    this.hangqingToggle[1].isChecked = true;
                } else if (GameData.DXSet.market == '单边下跌') {
                    this.hangqingToggle[2].isChecked = true;
                } else if (GameData.DXSet.market == '震荡行情') {
                    this.hangqingToggle[3].isChecked = true;
                }
            } else if (index == 1) {
                la.string = GameData.DXSet.search;
            } else if (index == 2) {
                la.string = GameData.DXSet.year;
            } else if (index == 3) {
                la.string = GameData.DXSet.month;
            } else if (index == 4) {
                la.string = GameData.DXSet.day;
            } else if (index == 5) {
                la.string = GameData.DXSet.line;
            } else if (index == 6) {
                la.string = GameData.DXSet.KLine;
            } else if (index == 7) {
                la.string = GameData.DXSet.ZLine;
            }
        })
        this.toggle.isChecked = GameData.DXSet.isFC;
    }

    onTipsInfo() {
        if (GameData.DXSet.market != '随机行情') {
            return false;
        }
        return true;
    }

    onBoxSelectClick(event, data) {
        let index = parseInt(data);
        if (data == 1 || data == 2 || data == 3 || data == 4 || data == 6 || data == 7) {
            if (!this.onTipsInfo()) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, GameData.DXSet.market + '不支持自定义当前选项')
                return;
            }
        }
        let downBox = this.downBoxs[index];
        downBox.active = true;
        this.setProId = data;


        //当前年月的天数
        if (/*index == 3 ||*/ index == 4) {
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
                        el.getComponent(cc.Button).enableAutoGrayEffect = true;
                    } else {
                        this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                } else {
                    if (index == 4) {
                        el.color = cc.Color.WHITE;
                        el.getComponent(cc.Button).interactable = true;
                        el.getComponent(cc.Button).enableAutoGrayEffect = false;
                    } else {
                        this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
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
            //  this.downBoxs[this.setProId].active = false;
            this.downBoxs.forEach(el => {
                el.active = false;
            })
            if (this.setProId == 4) {
                let downBox = this.downBoxs[this.setProId];
                let year = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
                let month = this.boxs[4].getChildByName('label').getComponent(cc.Label).string;
                var temp = new Date(parseInt(year), parseInt(month), 0);
                let day = temp.getDate();
                let content = cc.find('New ScrollView/view/content', downBox);

                content.children.forEach(el => {
                    let str = el.getComponent(cc.Label).string;
                    if (parseInt(str) > day) {
                        this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
                    } else {
                        this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
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
                GameData.DXSet.market = str;
            } else if (this.setProId == 1) {
                GameData.DXSet.search = str;
            } else if (this.setProId == 2) {
                GameData.DXSet.year = str;

                if (GameData.DXSet.year == '随机') {
                    this.boxs[3].getChildByName('label').getComponent(cc.Label).string = '--';
                    this.boxs[4].getChildByName('label').getComponent(cc.Label).string = '--';
                }

            } else if (this.setProId == 3) {

                GameData.DXSet.month = str;
            } else if (this.setProId == 4) {
                GameData.DXSet.day = str;
            } else if (this.setProId == 5) {
                GameData.DXSet.line = str;
            } else if (this.setProId == 6) {
                GameData.DXSet.KLine = str;
            } else if (this.setProId == 7) {
                GameData.DXSet.ZLine = str;

                //   if(GameData.DXSet.ZLine!='')
            }

        } else if (name == 'setDXBtnDX') {
            GlobalEvent.emit('OPENSETLAYER', 'DX');
        } else if (name == 'historyDXBtn') {

            GameCfg.GameType = pb.GameType.DingXiang;
            GlobalEvent.emit("OPENHISTORYLAYER", 'DX');

        } else if (name == 'startDXBtn') {
            GameCfg.GAMEFUPAN = false;
            GameCfg.GameType = pb.GameType.DingXiang;
            GameCfg.GameSet = GameData.DXSet;
            this.DXStartGameSet();
        } else if (name == 'blackbtn') {
            this.node.active = false;
            GameCfg.GameType = null;
        }
    }

    onToggleClick() {
        GameData.DXSet.isFC = this.toggle.isChecked;
    }

    onHangQingToggleClick(event, data) {
        if (data == 0) {
            GameData.DXSet.market = '随机行情';
        } else if (data == 1) {

            GameData.DXSet.market = '单边上涨'


        } else if (data == 2) {
            GameData.DXSet.market = '单边下跌'
        } else if (data == 3) {
            GameData.DXSet.market = '震荡行情'
        }

        if (data != 0) {
            GameData.DXSet.search = '随机选股';
            GameData.DXSet.year = '随机';
            GameData.DXSet.month = '--';
            GameData.DXSet.day = '--';
            GameData.DXSet.KLine = '100';
            GameData.DXSet.ZLine = '日线';

            this.onShow();
        }

    }


    onDisable() {
        GameData.DXSet = GameData.DXSet;
    }

    DXStartGameSet() {
        let data = {
            ktype: null,
            kstyle: null,
            code: null,
            from: null,
            total: parseInt(GameData.DXSet.KLine) + 100,
            to: 0,
        }
        let items
        //   console.log(JSON.stringify(GameCfgText.stockList));
        if (GameData.DXSet.search == '随机选股' || GameData.DXSet.search == '') {
            let le = parseInt(Math.random() * GameCfgText.stockList.length + '');
            console.log('le' + le);
            items = GameCfgText.stockList[le].split('|');
            data.code = items[0];
            // if (data.code < 600000) {
            //     this.DXStartGameSet();
            //     return;
            // }
        } else {
            let dex = -1;
            let arrStr = GameData.DXSet.search.split(' ');
            arrStr[0] && (arrStr[0] = arrStr[0].replace(/ /g, ''))
            arrStr[1] && (arrStr[1] = arrStr[1].replace(/ /g, ''))
            for (let i = 0; i < GameCfgText.stockList.length; i++) {

                if (arrStr[0]) {
                    if (GameCfgText.stockList[i].indexOf(arrStr[0]) != -1) {
                        dex = i;
                        break;
                    }
                }

                if (arrStr[1]) {
                    if (GameCfgText.stockList[i].indexOf(arrStr[1]) != -1) {
                        dex = i;
                        break;
                    }
                }

            }
            if (dex != -1) {
                items = GameCfgText.stockList[dex].split('|');
                data.code = items[0];
            } else {
                // console.log(arrStr[0]);
                // console.log(arrStr[1]);
                console.log('输入的股票代码不正确');
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的股票代码不正确');
                return;
            }
        }

        if (GameData.DXSet.market == '随机行情') {
            data.kstyle = pb.KStyle.Random;
        } else if (GameData.DXSet.market == '震荡行情') {
            data.kstyle = pb.KStyle.Wave;
        } else if (GameData.DXSet.market == '单边向上行情') {
            data.kstyle = pb.KStyle.Up;
        } else if (GameData.DXSet.market == '单边向下行情') {
            data.kstyle = pb.KStyle.Down;
        }



        if (GameData.DXSet.year != '随机') {
            if (GameData.DXSet.month == '--') {
                GameData.DXSet.month = '01';
            }
            if (GameData.DXSet.day == '--') {
                GameData.DXSet.day = '01';
            }
            if (GameData.DXSet.month.length == 1) {
                GameData.DXSet.month = '0' + GameData.DXSet.month;
            }
            if (GameData.DXSet.day.length == 1) {
                GameData.DXSet.day = '0' + GameData.DXSet.day;
            }

            let seletTime = GameData.DXSet.year + '' + GameData.DXSet.month + '' + GameData.DXSet.day;
            if (parseInt(seletTime) < parseInt(items[2])) {

                if (GameData.DXSet.search == '随机选股') {
                    this.DXStartGameSet();

                } else {

                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能早与股票创建时间');
                }
                console.log('时间不能早与股票创建时间');
                return;
            } else if (parseInt(seletTime) > parseInt(items[3])) {
                if (parseInt(items[3]) != 0) {

                    if (GameData.DXSet.search == '随机选股') {
                        this.DXStartGameSet();
                    } else {

                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能大与股票结束时间');
                    }
                    console.log('时间不能大与股票结束时间');
                    return;
                }
            }
            data.from = seletTime;
        } else {
            let start = items[2], end = items[3], sc;
            if (end == 0) {
                sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;
            } else {
                let year = end.slice(0, 4);
                let month = end.slice(4, 6);
                let day = end.slice(6);

                let d = new Date(year + '-' + month + '-' + day);

                if (GameData.DXSet.ZLine == '周线') {
                    sc = d.getTime() - data.total * 24 * 60 * 60 * 1000 * 7;
                } else {
                    sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;
                }

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

        GameCfg.data[0].code = items[0];

        // if (items[0].length >= 7) {
        //     GameCfg.data[0].code = items[0].slice(1);
        // }

        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];

        GameCfg.data[0].circulate = items[4];

        console.log('给的数据:' + JSON.stringify(data));

        if (GameData.DXSet.ZLine == '日线') {
            data.ktype = pb.KType.Day;
            GlobalEvent.emit('onCmdQuoteQuery', data);
        } else if (GameData.DXSet.ZLine == '周线') {
            data.ktype = pb.KType.Day;
        } else if (GameData.DXSet.ZLine == '30分钟K') {
            data.ktype = pb.KType.Min;
        } else if (GameData.DXSet.ZLine == '60分钟K') {
            data.ktype = pb.KType.Min;
        }

    }

    //http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js?TYPE=m30k&rtntype=5&authorityType=fa&id=3008032

    // //获取周K

    // getWkData() {
    //     let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';

    //     let code = GameCfg.data[0].code[0] == '6' ? GameCfg.data[0].code + '1' : GameCfg.data[0].code + '2';

    //     let TYPE;
    //     if (GameData.DXSet.ZLine == '周线') {
    //         TYPE = 'wk'
    //     } else if (GameData.DXSet.ZLine == '30分钟K') {
    //         TYPE = 'm30k';
    //     } else if (GameData.DXSet.ZLine == '60分钟K') {
    //         TYPE = 'm60k';
    //     }

    // }



}
