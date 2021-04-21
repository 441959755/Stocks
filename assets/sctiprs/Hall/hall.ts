import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from '../game/GameCfg';
import LoadUtils from '../Utils/LoadUtils';
import { pb } from '../../protos/proto';

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

    @property(cc.Prefab)
    playerInfo: cc.Prefab = null;

    playerInfoLayer: cc.Node = null;


    tipsTextNode: cc.Node = null


    onLoad() {

        GlobalEvent.on(EventCfg.LOADINGSHOW, () => {
            this.loading.active = true;
        }, this);

        GlobalEvent.on(EventCfg.LOADINGHIDE, () => {
            this.loading.active = false;
        }, this);

        GlobalEvent.on(EventCfg.TIPSTEXTSHOW, this.onTipsTextShow.bind(this), this);


        GlobalEvent.on('OPENSMLAYER', () => {
            this.shuangmangLayer.active = true;
        }, this);

        GlobalEvent.on('OPENZBLAYER', () => {
            this.zhibiaoLayer.active = true;
        }, this);

        GlobalEvent.on('OPENDXLAYER', () => {
            this.DXLayer.active = true;
        }, this);

        GlobalEvent.on('OPENHISTORYLAYER', (str) => {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            //SM的要获取服务器消息
            this.acquireSMhistoryInfo((info) => {

                this.openHistoryLayer && (this.openHistoryLayer(info, str));
            });


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

        //打开个人中心
        GlobalEvent.on('OPENPLAYERINFO', () => {
            if (!this.playerInfoLayer) {
                this.playerInfoLayer = cc.instantiate(this.playerInfo);
                this.node.addChild(this.playerInfoLayer);
            }
            this.playerInfoLayer.active = true;
        }, this);
    }

    onTipsTextShow(content) {
        if (!this.tipsTextNode) {
            LoadUtils.loadRes('Prefabs/tipsText', (pre) => {
                this.tipsTextNode = cc.instantiate(pre);
                this.node.addChild(this.tipsTextNode, 99);
                this.tipsTextNode.getComponent('TipsTextHandle').textData = content;

                this.tipsTextNode.active = true;
                this.tipsTextNode.getComponent('TipsTextHandle').onShow();
            })
        } else {
            this.tipsTextNode.active = true;
            this.tipsTextNode.getComponent('TipsTextHandle').textData = content;
            this.tipsTextNode.getComponent('TipsTextHandle').onShow();
        }

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


    openHistoryLayer(info, type?) {
        if (!this.historyLayer) {
            //   this.historyLayer = cc.instantiate(this.historyPre)
            this.historyLayer = cc.instantiate(this.historyPre);
            this.node.addChild(this.historyLayer);
        }
        this.historyLayer.active = true;
        //  this.historyLayer.getComponent('SMHistory').historyType = type;
        this.historyLayer.getComponent('History').historyInfo = info;
        this.historyLayer.getComponent('History').onShow();
        if (this.SMYieldLayer) {
            this.historyLayer.zIndex = this.SMYieldLayer.zIndex + 1;
        }
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
        GlobalEvent.off('OPENPLAYERINFO');
        LoadUtils.releaseRes('Prefabs/tipsText');
    }

    onCmdGameStart(data, info1) {
        GlobalEvent.emit('EventCfg.LOADINGSHOW');
        //  if (socket) {
        GameCfg.info = info1;

        socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(data), (res) => {
            //console.log('onCmdGameStart' + JSON.stringify(res));
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), (info) => {
                //   console.log('onCmdQuoteQuery' + JSON.stringify(info));
                info.items.forEach(el => {
                    //  let date = new Date(el.timestamp);
                    let ye = (el.timestamp + '').slice(0, 4);
                    let mon = (el.timestamp + '').slice(4, 6);
                    let da = (el.timestamp + '').slice(6);
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

                cc.director.loadScene('game');
            })

        })
        //  }
    }

    onCmdQuoteQuery(data) {
        // console.log(JSON.stringify(data));
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
                g_type: GameCfg.GameType,
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
