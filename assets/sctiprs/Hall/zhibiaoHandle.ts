import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import gameCfg from "../game/GameCfg";
import GameCfg from "../game/GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    boxs: cc.Node[] = [];

    @property([cc.Node])
    downBoxs: cc.Node[] = [];

    @property(cc.Toggle)
    toggle: cc.Toggle = null;



    setProId = 0;

    _tipsLa = null;

    tips = [
        ['股价穿越均线', '均线交叉', '组合训练'],
        ['MACD金叉', '0轴穿越', '柱最大值转向', 'MACD背离', '经典用法'],
        ['布林带中轨', '单边突破上轨', '上下轨间震荡', '金典用法'],
        ['超买超卖', 'KDJ金叉', 'KDJ背离', '金典用法'],
        ['EXPMA金叉', '经典用法'],
        ['RSI金叉', '超买超卖', '经典用法'],
        ['量柱和均量线']
    ]

    @property(cc.EditBox)
    edit: cc.EditBox = null;

    protected onLoad() {
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
        GlobalEvent.emit(EventCfg.SHOWOTHERNODE, this);
        this.boxs.forEach((el, index) => {
            let la = el.getChildByName('label').getComponent(cc.Label);
            if (index == 0) {
                la.string = cc.ext.gameData.ZBSet.select;
            } else if (index == 1) {
                la.string = cc.ext.gameData.ZBSet.strategy;
            } else if (index == 2) {
                la.string = cc.ext.gameData.ZBSet.search;
                if (cc.ext.gameData.ZBSet.search == '随机选股') {
                    this._tipsLa.active = true;
                } else {
                    this._tipsLa.active = false;
                }
            } else if (index == 3) {
                la.string = cc.ext.gameData.ZBSet.year;
            } else if (index == 4) {
                la.string = cc.ext.gameData.ZBSet.month;
            } else if (index == 5) {
                la.string = cc.ext.gameData.ZBSet.day;
            } else if (index == 6) {
                la.string = cc.ext.gameData.ZBSet.KLine;
            } else if (index == 7) {
                la.string = cc.ext.gameData.ZBSet.ZLine;
            }
        })
        this.toggle.isChecked = cc.ext.gameData.ZBSet.showSign;



    }

    onBtnBoxSelectClick(event, data) {
        //  let name=event.target.name;
        // if(name=='selectBtn'){
        let index = parseInt(data);
        let downBox = this.downBoxs[index];
        downBox.active = true;
        this.setProId = data;
        // }
        //当前年月的天数
        if (index == 5 || index == 4) {
            let year = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
            let month = this.boxs[4].getChildByName('label').getComponent(cc.Label).string;
            var temp = new Date(parseInt(year), parseInt(month), 0);
            let day = temp.getDate();
            let content = cc.find('New ScrollView/view/content', downBox);
            content.children.forEach(el => {
                let str = el.getComponent(cc.Label).string;
                if (parseInt(str) > day) {
                    if (index == 5) {
                        el.color = new cc.Color().fromHEX('#a0a0a0');
                        el.getComponent(cc.Button).interactable = false;
                        el.getComponent(cc.Button).enabledInHierarchy = true;
                    } else {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                } else {
                    if (index == 5) {
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

    onToggleBtnClick() {
        cc.ext.gameData.ZBSet.showSign = this.toggle.isChecked;
    }

    protected onDisable() {
        cc.ext.gameData.ZBSet = cc.ext.gameData.ZBSet;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'DCnode') {
            event.target.parent.active = false;
        } else if (name == 'item') {
            let str = event.target.getComponent(cc.Label).string;
            this.boxs[this.setProId].getChildByName('label').getComponent(cc.Label).string = str;
            this.downBoxs[this.setProId].active = false;
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
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    } else {
                        this.boxs[5].getChildByName('label').getComponent(cc.Label).string = day + '';
                    }
                })
            } else if (this.setProId == 0) {
                let downBox = this.downBoxs[1];
                let content = cc.find('New ScrollView/view/content', downBox);

                let nodes = content.children;
                let item = nodes[0];
                let tt = 0;
                if (str == '均线') {
                    tt = 0;
                } else if (str == 'MACD') {
                    tt = 1;
                } else if (str == 'BOLL') {
                    tt = 2
                } else if (str == 'KDJ') {
                    tt = 3;
                } else if (str == 'EXPMA') {
                    tt = 4
                } else if (str == 'RSI') {
                    tt = 5;
                } else if (str == '成交量') {
                    tt = 6;
                }
                this.boxs[1].getChildByName('label').getComponent(cc.Label).string = this.tips[tt][0];
                this.tips[tt].forEach((el, index) => {
                    if (!nodes[index]) {
                        let node = cc.instantiate(item);
                        content.addChild(node);
                    }
                    nodes[index].getComponent(cc.Label).string = el;
                })

                if (nodes.length > this.tips[tt].length) {
                    for (let i = nodes.length; i < this.tips[tt].length; i++) {
                        nodes[i].destroy();
                    }
                }
            } else if (this.setProId == 2) {
                if (str == '随机选股') {
                    this._tipsLa.active = true;
                } else {
                    this._tipsLa.active = false;
                }
            }

            if (this.setProId == 0) {
                cc.ext.gameData.ZBSet.select = str;
            } else if (this.setProId == 1) {
                cc.ext.gameData.ZBSet.strategy = str;
            } else if (this.setProId == 2) {
                cc.ext.gameData.ZBSet.search = str;
            } else if (this.setProId == 3) {
                cc.ext.gameData.ZBSet.year = str;
            } else if (this.setProId == 4) {
                cc.ext.gameData.ZBSet.month = str;
            } else if (this.setProId == 5) {
                cc.ext.gameData.ZBSet.day = str;
            } else if (this.setProId == 6) {
                cc.ext.gameData.ZBSet.KLine = str;
            } else if (this.setProId == 7) {
                cc.ext.gameData.ZBSet.ZLine = str;
            }
        } else if (name == 'startSMBtn') {

            // cc.ext.gameData.gameDatas=gameCfg.data;
            gameCfg.GameType = 2;
            GameCfg.GameSet = cc.ext.gameData.ZBSet;
            //  cc.director.loadScene('game');

            this.zhibiaoStartGameSet();



        } else if (name == 'setZBBtn') {
            GlobalEvent.emit('OPENSETLAYER', 'ZB');
        } else if (name == 'historyZBBtn') {
            GlobalEvent.emit("OPENHISTORYLAYER", 'ZB');
        }
    }

    zhibiaoStartGameSet() {
        let data = {
            ktype: 10,
            kstyle: 0,
            code: null,
            from: null,
            total: parseInt(cc.ext.gameData.ZBSet.KLine),
            to: 0,
        }
        let items
        if (cc.ext.gameData.ZBSet.search == '随机选股') {
            let le = parseInt(Math.random() * stocklist.length);
            items = stocklist[le].split('|');
            data.code = items[0];
            if (data.code < 600000) {
                this.sendMessageToSocket();
                return;
            }
        } else {
            let dex;
            let arrStr = cc.ext.gameData.ZBSet.search.split(' ');
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
                return;
            }
        }

        if (cc.ext.gameData.ZBSet.ZLine == '周线') {
            data.ktype = 11;
        } else if (cc.ext.gameData.ZBSet.ZLine == '日线') {
            data.ktype = 10;
        }

        if (cc.ext.gameData.ZBSet.year != '随机') {
            //时间
            let seletTime = cc.ext.gameData.ZBSet.year + '' + cc.ext.gameData.ZBSet.month + '' + cc.ext.gameData.ZBSet.day
            if (parseInt(seletTime) < parseInt(items[2])) {
                //时间不对
                console.log('时间不能早与股票创建时间');
            }

            else if (parseInt(seletTime) > parseInt(items[3])) {
                if (parseInt(items[3]) != 0) {
                    console.log('时间不能大与股票结束时间');
                    return;
                }
            }
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
            GameCfg.data[0].data = [];
            GameCfg.data[0].name = items[1];
            GameCfg.data[0].code = items[0];
            GameCfg.data[0].circulate = items[4];
        }
        GlobalEvent.emit('onCmdQuoteQuery', data);
    }

}
