import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from '../game/GameCfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    shuangmangLayer: cc.Node = null;

    @property(cc.Node)
    zhibiaoLayer: cc.Node = null;

    @property(cc.Node)
    DXLayer: cc.Node = null;

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Prefab)
    historyPre: cc.Prefab = null;

    historyLayer: cc.Node = null;

    @property(cc.Prefab)
    ZBSetPre: cc.Prefab = null;

    ZBSetLayer: cc.Node = null;

    @property(cc.Prefab)
    SMSetPre: cc.Prefab = null;

    SMSetLayer: cc.Node = null;

    @property(cc.Prefab)
    DXSetPre: cc.Prefab = null;

    DXSetLayer: cc.Node = null;

    @property(cc.Prefab)
    SMYieldPre: cc.Prefab = null;

    SMYieldLayer: cc.Node = null

    @property(cc.Prefab)
    SMMothlyPre: cc.Prefab = null;

    SMMonthlyLayer: cc.Node = null;

    @property(cc.Prefab)
    helpPre: cc.Prefab = null;

    helpLayer: cc.Node = null;


    onLoad() {

        GlobalEvent.on(EventCfg.LOADINGSHOW, () => {
            this.loading.active = true;
        }, this);

        GlobalEvent.on(EventCfg.LOADINGHIDE, () => {
            this.loading.active = false;
        }, this);

        GlobalEvent.on('OPENSMLAYER', () => {
            this.shuangmangLayer.active = true;
        }, this);

        GlobalEvent.on('OPENZBLAYER', () => {
            this.zhibiaoLayer.active = true;
        }, this);

        GlobalEvent.on('OPENDXLAYER', () => {
            this.DXLayer.active = true;
        }, this);

        GlobalEvent.on('OPENHISTORYLAYER', (str, data) => {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            if (str == 'SM') {
                if (data) {
                    this.openHistoryLayer && (this.openHistoryLayer(data));
                } else {
                    //SM的要获取服务器消息
                    this.acquireSMhistoryInfo(() => {
                        this.openHistoryLayer && (this.openHistoryLayer(null));
                    });
                }
            } else {
                //其他在本地缓存取
                this.openHistoryLayer && (this.openHistoryLayer(null));
            }

        }, this);

        GlobalEvent.on('OPENSETLAYER', (str) => {
            if (str == 'ZB') {
                if (!this.ZBSetLayer) {
                    this.ZBSetLayer = cc.instantiate(this.ZBSetPre);
                    this.node.addChild(this.ZBSetLayer);
                }
                this.ZBSetLayer.active = true;
            } else if (str == 'SM') {
                if (!this.SMSetLayer) {
                    this.SMSetLayer = cc.instantiate(this.SMSetPre);
                    this.node.addChild(this.SMSetLayer);
                }
                this.SMSetLayer.active = true;
            } else if (str == 'DX') {
                if (!this.DXSetLayer) {
                    this.DXSetLayer = cc.instantiate(this.DXSetPre);
                    this.node.addChild(this.DXSetLayer);
                }
                this.DXSetLayer.active = true;

            }
        }, this);

        GlobalEvent.on('OPENMONTHLAYER', (str) => {
            //  if (str == 'SM') {
            if (socket) {
                socket.send(4009, null, (info) => {
                    console.log('OPENMONTHLAYER' + JSON.stringify(info));

                    if (!this.SMMonthlyLayer) {
                        this.SMMonthlyLayer = cc.instantiate(this.SMMothlyPre);
                        this.node.addChild(this.SMMonthlyLayer);
                    }
                    this.SMMonthlyLayer.active = true;

                    this.SMMonthlyLayer.getComponent('SMMonthly').monthlyInfo = info;
                    this.SMMonthlyLayer.getComponent('SMMonthly').onShow();
                })
            }

            //  }
        }, this);

        GlobalEvent.on('OPENYIELDLAYER', (str) => {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            this.acquireSMhistoryInfo((info) => {
                this.openYieldLaye && (this.openYieldLaye(info));
            });
        }, this);

        GlobalEvent.on('OPENHELPLAYER', (str) => {
            if (!this.helpLayer) {
                this.helpLayer = cc.instantiate(this.helpPre);
                this.node.addChild(this.helpLayer);
            }
            this.helpLayer.active = true;
        }, this);

        GlobalEvent.on('onCmdQuoteQuery', this.onCmdQuoteQuery.bind(this), this);
    }

    openYieldLaye(info) {
        if (!this.SMYieldLayer) {
            this.SMYieldLayer = cc.instantiate(this.SMYieldPre);
            this.node.addChild(this.SMYieldLayer);
        }
        this.SMYieldLayer.active = true;
        this.SMYieldLayer.getComponent('SMYieldCurve').yieldInfo = info;
        this.SMYieldLayer.getComponent('SMYieldCurve').onShow();
    }


    openHistoryLayer(info) {
        let str;
        if (info) {
            str = 'SM';
        }
        if (!this.historyLayer) {
            //   this.historyLayer = cc.instantiate(this.historyPre)
            this.historyLayer = cc.instantiate(this.historyPre);
            this.node.addChild(this.historyLayer);
        }
        this.historyLayer.active = true;
        this.historyLayer.getComponent('SMHistory').historyType = str;
        this.historyLayer.getComponent('SMHistory').historyInfo = info;
        this.historyLayer.getComponent('SMHistory').onShow();
    }


    protected onDestroy() {
        GlobalEvent.off(EventCfg.LOADINGSHOW);
        GlobalEvent.off(EventCfg.LOADINGHIDE);
        GlobalEvent.off('OPENSMLAYER')
        GlobalEvent.off('OPENZBLAYER');
        GlobalEvent.off('OPENZBHISTORYLAYER');
        GlobalEvent.off('OPENZBSETLAYER');
        GlobalEvent.off('OPENMONTHLAYER');
        GlobalEvent.off('OPENYIELDLAYER');
        GlobalEvent.off('OPENHELPLAYER');
        GlobalEvent.off('onCmdQuoteQuery');
        GlobalEvent.off('OPENDXKAYER');
    }

    onCmdGameStart(data, info1) {
        GlobalEvent.emit('EventCfg.LOADINGSHOW');
        if (socket) {
            console.log(JSON.stringify(data));
            socket.send(4003, PB.onCmdGameStartConvertToBuff(data), (info) => {

                console.log('onCmdGameStart' + JSON.stringify(info));
                if (socket) {
                    socket.send(2003, PB.onCmdQuoteQueryConvertToBuff(info1), (info) => {
                        console.log('onCmdQuoteQuery' + JSON.stringify(info));
                        info.items.forEach(el => {
                            let date = new Date(el.timestamp);
                            let ye = date.getFullYear();
                            let mon = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
                            let da = date.getDate() >= 10 ? date.getDate() : '0' + (date.getDate());
                            let fromDate = ye + '-' + mon + '-' + da;
                            let data = {
                                day: fromDate,
                                open: el.open,
                                close: el.price,
                                high: el.high,
                                low: el.low,
                                price: el.amount,
                                value: el.volume,
                                Rate: el.volume / GameCfg.data[0].circulate * 100,
                            }
                            GameCfg.data[0].data.push(data);
                        });
                        console.log(GameCfg.data);
                        cc.ext.gameData.gameDatas = GameCfg.data;
                        cc.director.loadScene('game');
                    })

                } else {
                    console.log('socket err');
                }
            })
        }
    }

    onCmdQuoteQuery(data) {
        this.onCmdGameStart({ game: GameCfg.GameType }, data);
    }

    acquireSMhistoryInfo(callBack) {
        let data = new Date();
        data.setDate(1);
        data.setHours(0);
        data.setSeconds(0);
        data.setMinutes(0);

        if (socket) {
            let data1 = {
                g_type: 1,
                from: data.getTime(),
                to: new Date().getTime(),
                page_size: 100,
            }

            socket.send(4007, PB.onCmdQueryGameResultConvertToBuff(data1), (info) => {
                console.log('acquireSMhistoryInfo' + JSON.stringify(info));

                callBack && (callBack(info));
            });
        }

    }

    resetSize(cav) {
        let frameSize = cc.view.getFrameSize();
        let designSize = cc.view.getDesignResolutionSize();

        if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
            cav.width = designSize.height * frameSize.width / frameSize.height;
            cav.height = designSize.height;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        } else {
            cav.width = designSize.width;
            cav.height = designSize.width * frameSize.height / frameSize.width;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        }
        this.fitScreen(cav, designSize);
    }
    /**
     * 背景适配
     * @param canvasnode
     * @param designSize
     */
    fitScreen(canvasnode, designSize) {
        let scaleW = canvasnode.width / designSize.width;
        let scaleH = canvasnode.height / designSize.height;

        let bgNode = canvasnode.getChildByName('bg');
        let bgScale = canvasnode.height / bgNode.height;
        bgNode.width *= bgScale;
        bgNode.height *= bgScale;
        if (scaleW > scaleH) {
            bgScale = canvasnode.width / bgNode.width;
            bgNode.width *= bgScale;
            bgNode.height *= bgScale;
        }
    }

}
