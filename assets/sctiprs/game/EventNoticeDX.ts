import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';

import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import DrawData from './DrawData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    itemNotice: cc.Prefab = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    timeCall = null;

    _idd = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.content.getComponent(cc.Layout).verticalDirection = cc.Layout.VerticalDirection.BOTTOM_TO_TOP;
        GlobalEvent.on(EventCfg.SLGEVENTNOTICE, () => {
            if (GameCfg.GameSet.jx_notice) {
                if (DrawData.MaList && DrawData.MaList.length > 0) {
                    this.testMaEvent();
                }
            }

            if (GameCfg.GameSet.k_notice) {
                this.testKFrom();
            }

        }, this);

        GlobalEvent.on(EventCfg.UPDATERATE, (data) => {
            if (GameCfg.GameSet.StopCheck_notice) {
                this.testStopCheck(data[0]);
            }
        }, this);


        GlobalEvent.on('clickTipsInfoPos', (data) => {
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                return
            }
            let locPos = this.content.parent.parent.convertToNodeSpaceAR(data.pos);
            this.tipsLabel.node.parent.y = locPos.y;

            this.tipsLabel.string = data.str;
            this.tipsLabel.node.parent.active = true;
            if (this.timeCall) {
                clearTimeout(this.timeCall);
            }
            this.timeCall = setTimeout(() => {
                this.tipsLabel.node.parent.active = false;
                clearTimeout(this.timeCall);
                this.timeCall = null;
            }, 3000);

        }, this);

    }


    testKFrom() {

        let index = GameCfg.huizhidatas - 1;
        let data = GameCfg.data[0].data;
        if (index < 3) {
            return;
        }
        let rate = (data[index].close - data[index - 1].close) / data[index - 1].close;

        let rate1 = (data[index - 1].close - data[index - 2].close) / data[index - 2].close;

        let rate2 = (data[index - 2].close - data[index - 3].close) / data[index - 3].close;

        {
            //????????????XH??????
            if (rate > 0 && rate < 0.02) {
                if (data[index].low == data[index].open) {
                    if (data[index].high == data[index].close) {
                        //?????????????????????(GtGjXH)

                    } else if (data[index].high > data[index].close) {
                        //????????????????????????(SyXH)

                    }
                } else if (data[index].low < data[index].open) {
                    if (data[index].high == data[index].close) {
                        //???????????????????????????XyXH???

                    } else if (data[index].high > data[index].close) {
                        // ???????????????????????????SyXyXH???

                    }
                }
            }

        }

        {
            //????????????ZH??????
            if (rate >= 0.02 && rate < 0.055) {


                if (data[index].low == data[index].open) {
                    //?????????????????????(GtGjZH)
                    if (data[index].high == data[index].close) {

                        if (rate1 >= -0.105 && rate1 < -0.02) {

                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    //???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(1);

                                }

                            }

                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }

                        else if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (rate2 >= 0.02 && rate2 < 0.055) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {
                                        if (data[index - 1].open >= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close > data[index - 3].high) {
                                                this.onCreateTipsItem(3);
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }

                    else if (data[index].high > data[index].close) {

                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open >= data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }

                        else if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (rate2 >= 0.02 && rate2 < 0.055) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {
                                        //????????????
                                        //this.onCreateTipsItem('?????????');
                                        this.onCreateTipsItem(3);
                                    }
                                }
                            }
                        }
                    }

                }

                else if (data[index].low < data[index].open && data[index].high == data[index].close) {
                    if (rate1 >= -0.105 && rate1 < -0.02) {
                        if (data[index].open < data[index - 1].close) {
                            if (data[index - 1].open >= data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                ////????????????
                                // this.onCreateTipsItem('????????????');
                                this.onCreateTipsItem(1);
                            }

                        }

                        else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                            if (data[index].close > data[index - 1].open) {
                                ////???????????????
                                // this.onCreateTipsItem('????????????');
                                this.onCreateTipsItem(2);
                            }
                        }

                    }
                    else if (rate1 >= 0.02 && rate1 < 0.055) {
                        if (rate2 >= 0.02 && rate2 < 0.055) {
                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].high) {
                                    //????????????
                                    //  this.onCreateTipsItem('?????????');
                                    this.onCreateTipsItem(3);
                                }
                            }
                        }
                    }
                }

                else if (data[index].low < data[index].open && data[index].high > data[index].close) {
                    if (rate1 >= -0.105 && rate1 < -0.02) {
                        if (data[index].open < data[index - 1].close) {
                            if (data[index - 1].open >= data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                ////????????????
                                // this.onCreateTipsItem('????????????');
                                this.onCreateTipsItem(1);
                            }

                        }

                        else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                            if (data[index].close > data[index - 1].open) {
                                ////???????????????
                                // this.onCreateTipsItem('????????????');
                                this.onCreateTipsItem(2);
                            }
                        }

                    }
                    else if (rate1 >= 0.02 && rate1 < 0.055) {
                        if (rate2 >= 0.02 && rate2 < 0.055) {
                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].high) {
                                    //????????????
                                    // this.onCreateTipsItem('?????????');
                                    this.onCreateTipsItem(3);
                                }
                            }
                        }
                    }
                }
            }

        }

        {
            //?????????
            if (rate >= 0.055 && rate <= 0.105) {

                if (data[index].low == data[index].open) {
                    if (data[index].high == data[index].close) {
                        //?????????(GtGjDH)

                        if (rate1 >= -0.055 && rate1 < 0) {
                            if (data[index].close > data[index - 1].open) {
                                if (data[index].open < data[index - 1].close) {
                                    // ???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(4);


                                }
                            }
                        }
                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open >= data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////???????????????
                                    //  this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }

                        if (rate1 >= 0.055 && rate1 <= 0.105) {
                            if (rate2 >= 0.055 && rate2 <= 0.105) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {
                                        if (data[index - 1].open >= (data[index - 2].open + data[index - 1].close) / 2) {
                                            if (data[index - 1].close > data[index - 2].high) {
                                                //????????????
                                                //  this.onCreateTipsItem('?????????');
                                                this.onCreateTipsItem(3);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                else if (data[index].low < data[index].open) {
                    if (data[index].high == data[index].close) {
                        if (rate1 >= -0.055 && rate1 < 0) {
                            if (data[index].close > data[index - 1].open) {
                                if (data[index].open < data[index - 1].close) {
                                    // ???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(4);
                                }
                            }
                        }
                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open > data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }
                        if (rate1 >= 0.055 && rate1 <= 0.105) {
                            if (rate2 >= 0.055 && rate2 <= 0.105) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {

                                        //????????????
                                        //this.onCreateTipsItem('?????????');
                                        this.onCreateTipsItem(3);
                                    }
                                }
                            }
                        }

                    }
                }

                else if (data[index].low < data[index].open) {
                    if (data[index].high > data[index].close) {
                        if (rate1 >= -0.055 && rate1 < 0) {
                            if (data[index].close > data[index - 1].open) {
                                if (data[index].open < data[index - 1].close) {
                                    // ???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(4);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open > data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }

                        if (rate1 >= 0.055 && rate1 <= 0.105) {
                            if (rate2 >= 0.055 && rate2 <= 0.105) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {
                                        if (data[index - 1].open >= (data[index - 2].open + data[index - 1].close) / 2) {
                                            if (data[index - 1].close > data[index - 2].high) {
                                                //????????????
                                                // this.onCreateTipsItem('?????????');
                                                this.onCreateTipsItem(3);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }

        {
            //?????????
            if (rate > -0.02 && rate < 0) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {
                        //?????????????????????(GtGjXL)
                    }

                    else if (data[index].high > data[index].open) {
                        //????????????????????????(SyXL)
                    }
                }
                else if (data[index].low < data[index].close) {
                    if (data[index].high == data[index].open) {
                        //????????????????????????(XyXL)
                    }

                    else if (data[index].high > data[index].open) {
                        //????????????????????????(SyXyXL)
                    }
                }

            }

            //?????????
            else if (rate >= -0.055 && rate < -0.02) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {
                        //?????????????????????(GtGjXL)

                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                //  this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    else if (data[index].high > data[index].open) {
                        //????????????????????????(SyXL)
                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                //  this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                else if (data[index].low < data[index].close) {
                    if (data[index].high == data[index].open) {
                        //????????????????????????(XyXL)

                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                // this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    else if (data[index].high > data[index].open) {
                        //????????????????????????(SyXyXL)
                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                // this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            }

            //?????????
            else if (rate >= -0.105 && rate <= -0.055) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {

                        if (rate1 > 0 && rate1 < 0.055) {
                            if (data[index].open > data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(8);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 <= -0.055) {
                            if (rate2 >= -0.105 && rate2 <= -0.055) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                //  this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                    else if (data[index].high > data[index].open) {
                        if (rate1 > 0 && rate1 < 0.055) {
                            if (data[index].open > data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('???????????????');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //???????????????
                                    //  this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(8);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 <= -0.055) {
                            if (rate2 >= -0.105 && rate2 <= -0.055) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                //  this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }

                else if (data[index].low < data[index].close) {
                    if (data[index].high == data[index].open) {
                        if (rate1 > 0 && rate1 < 0.055) {
                            if (data[index].open > data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //???????????????
                                    //  this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    //  this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(8);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 <= -0.055) {
                            if (rate2 >= -0.105 && rate2 <= -0.055) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                // this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }

                    else if (data[index].high > data[index].open) {
                        if (rate1 > 0 && rate1 < 0.055) {
                            if (data[index].open > data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    //this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //???????????????
                                    // this.onCreateTipsItem('????????????');
                                    this.onCreateTipsItem(8);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 <= -0.055) {
                            if (rate2 >= -0.105 && rate2 <= -0.055) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //???????????????
                                                //  this.onCreateTipsItem('????????????');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }

            }
        }

        {
            //other
            if (data[index].close == data[index].open) {
                if (data[index].high > data[index].low) {
                    //?????????(SZX)???
                }

                else if (data[index].high == data[index].low) {
                    //?????????(YZX)???
                }

                if (data[index].close == data[index].high) {
                    if (data[index].close > data[index].low) {
                        //T??????(TZX)???
                    }
                }
                else if (data[index].close < data[index].high) {
                    if (data[index].close == data[index].low) {
                        //???T??????(DTZX)???
                    }
                }
            }
        }
    }

    testStopCheck(el) {

        if (el > 0.3 && this._idd != 31) {
            //????????????30%
            // this.onCreateTipsItem('????????????30%');
            this.onCreateTipsItem(31);
            this._idd = 31
            return;
        } else if ((el > 0.2 && el <= 0.3) && (this._idd != 32 && this._idd != 31)) {
            //????????????20%
            //   this.onCreateTipsItem('????????????20%');
            this.onCreateTipsItem(32);
            this._idd = 32;
            return;
        } else if ((el > 0.1 && el <= 0.2) && this._idd != 33 && this._idd != 32 && this._idd != 31) {
            //????????????10 %
            //  this.onCreateTipsItem('????????????10%');
            this.onCreateTipsItem(33);
            this._idd = 33;
            return;
        }

        else if (el < -0.2 && this._idd != 34) {
            // ????????????20%
            //this.onCreateTipsItem('????????????20%');
            this.onCreateTipsItem(34);
            this._idd = 34;
            return;
        } else if ((el < -0.15 && el >= -0.2) && this._idd != 35 && this._idd != 34) {
            // ????????????15%
            // this.onCreateTipsItem('????????????15%');
            this.onCreateTipsItem(35);
            this._idd = 35;
            return;
        } else if ((el < -0.1 && el >= -0.15) && this._idd != 36 && this._idd != 35 && this._idd != 34) {
            // ????????????10%
            //  this.onCreateTipsItem('????????????10%');
            this.onCreateTipsItem(36);
            this._idd = 36;
            return;
        } else {
            if (el < 0.1 && el >= 0) {
                this._idd = 0;
            } else if (el > -0.1 && el <= 0) {
                this._idd = 0;
            }
        }
    }

    onCreateTipsItem(id, index?) {
        if (!index) {
            index = GameCfg.huizhidatas - 1;
        }
        let str;
        if (id == 1) {
            str = '????????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 1);


        } else if (id == 2) {
            str = '????????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 2);

        } else if (id == 3) {
            str = '?????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 3);

        } else if (id == 4) {
            str = '????????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 4);

        } else if (id == 5) {
            str = '????????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 5);

        } else if (id == 6) {
            str = '????????????';

            GlobalEvent.emit(EventCfg.CREATEBLOCK, 6);

        } else if (id == 7) {
            str = '????????????';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 7);
        } else if (id == 8) {
            str = '????????????';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 8);
        }

        else if (id == 11) {
            str = 'MA5??????MA10';
        } else if (id == 12) {
            str = 'MA5??????MA20';
        } else if (id == 13) {
            str = 'MA10??????MA20';
        } else if (id == 14) {
            str = 'MA10??????MA30';
        } else if (id == 15) {
            str = 'MA30??????MA60';
        } else if (id == 16) {
            str = 'MA60??????MA120';
        }

        else if (id == 17) {
            str = 'MA5??????MA10';
        } else if (id == 18) {
            str = 'MA5??????MA20';
        } else if (id == 19) {
            str = 'MA10??????MA20';
        } else if (id == 20) {
            str = 'MA10??????MA30';
        } else if (id == 21) {
            str = 'MA30??????MA60';
        } else if (id == 22) {
            str = 'MA60??????MA120';
        }

        else if (id == 31) {
            str = '????????????30%';
        } else if (id == 32) {
            str = '????????????20%';
        } else if (id == 33) {
            str = '????????????10%';
        } else if (id == 34) {
            str = '????????????20%';
        } else if (id == 35) {
            str = '????????????15%';
        } else if (id == 36) {
            str = '????????????10%';
        }


        let node = cc.instantiate(this.itemNotice);
        this.content.addChild(node);

        let itemHandle = node.getComponent('ItemNotice')
        itemHandle.text = str;

        index && (itemHandle.Pindex = index)
        itemHandle.onShow();

        // if (!GameCfg.GAMEFUPAN && GameCfg.GameType != pb.GameType.ShuangMang) {
        //     GameCfg.notice.push([id, GameCfg.huizhidatas - 1]);
        // }
    }

    //??????????????????
    testMaEvent() {

        //let flag = false;

        let malist = DrawData.MaList;
        let index = GameCfg.huizhidatas - 1;
        if (index < 4) {
            return;
        }
        if (GameCfg.MAs.indexOf(60) != -1 && GameCfg.MAs.indexOf(120) != -1) {
            //  flag = true;
            //  if()
            let ma60 = GameCfg.MAs.indexOf(60);
            let ma120 = GameCfg.MAs.indexOf(120);
            if (index >= 120 - 1) {
                if (malist[index - 1][ma60] < malist[index - 1][ma120]) {
                    if (malist[index][ma60] >= malist[index][ma120]) {
                        //todo  ???????????????
                        //MA60??????MA120
                        //    this.onCreateTipsItem('MA60??????MA120');
                        this.onCreateTipsItem(16);

                    }
                } else if (malist[index - 1][ma60] > malist[index - 1][ma120]) {
                    if (malist[index][ma60] <= malist[index][ma120]) {
                        //MA60??????MA120
                        // this.onCreateTipsItem('MA60??????MA120');
                        this.onCreateTipsItem(22);
                    }
                }
            }


        }

        if (GameCfg.MAs.indexOf(30) != -1 && GameCfg.MAs.indexOf(60) != -1) {
            //   flag = true;
            let ma30 = GameCfg.MAs.indexOf(30);
            let ma60 = GameCfg.MAs.indexOf(60);

            if (index >= 60 - 1) {
                if (malist[index - 1][ma30] < malist[index - 1][ma60]) {
                    if (malist[index][ma30] >= malist[index][ma60]) {
                        //todo  ???????????????
                        //MA30??????MA60
                        //  this.onCreateTipsItem('MA30??????MA60');
                        this.onCreateTipsItem(15);

                    }
                } else if (malist[index - 1][ma30] > malist[index - 1][ma60]) {
                    if (malist[index][ma30] <= malist[index][ma60]) {
                        //MA30??????MA60
                        //  this.onCreateTipsItem('MA30??????MA60');
                        this.onCreateTipsItem(21);
                    }
                }
            }

        }

        if (GameCfg.MAs.indexOf(10) != -1 && GameCfg.MAs.indexOf(30) != -1) {
            let ma10 = GameCfg.MAs.indexOf(10);
            let ma30 = GameCfg.MAs.indexOf(30);
            if (index >= 30 - 1) {
                if (malist[index - 1][ma10] < malist[index - 1][ma30]) {
                    if (malist[index][ma10] >= malist[index][ma30]) {
                        //todo  ???????????????
                        //MA10??????MA30
                        //  this.onCreateTipsItem('MA10??????MA30');
                        this.onCreateTipsItem(14);

                    }
                } else if (malist[index - 1][ma10] > malist[index - 1][ma30]) {
                    if (malist[index][ma10] <= malist[index][ma30]) {
                        //MA10??????MA30
                        // this.onCreateTipsItem('MA10??????MA30');
                        this.onCreateTipsItem(20);
                    }
                }
            }

        }

        if (GameCfg.MAs.indexOf(10) != -1 && GameCfg.MAs.indexOf(20) != -1) {
            let ma10 = GameCfg.MAs.indexOf(10);
            let ma20 = GameCfg.MAs.indexOf(20);
            if (index >= 20 - 1) {
                if (malist[index - 1][ma10] < malist[index - 1][ma20]) {
                    if (malist[index][ma10] >= malist[index][ma20]) {
                        //todo  ???????????????
                        //MA10??????MA20
                        // this.onCreateTipsItem('MA10??????MA20');
                        this.onCreateTipsItem(13);

                    }
                } else if (malist[index - 1][ma10] > malist[index - 1][ma20]) {
                    if (malist[index][ma10] <= malist[index][ma20]) {
                        //todo  ???????????????
                        //MA10??????MA20
                        //  this.onCreateTipsItem('MA10??????MA20');
                        this.onCreateTipsItem(19);

                    }
                }
            }

        }

        if (GameCfg.MAs.indexOf(5) != -1 && GameCfg.MAs.indexOf(20) != -1) {
            let ma5 = GameCfg.MAs.indexOf(5);
            let ma20 = GameCfg.MAs.indexOf(20);
            if (index >= 20 - 1) {
                if (malist[index - 1][ma5] < malist[index - 1][ma20]) {
                    if (malist[index][ma5] >= malist[index][ma20]) {
                        //todo  ???????????????
                        //MA5??????MA20
                        // this.onCreateTipsItem('MA5??????MA20');
                        this.onCreateTipsItem(12);

                    }
                } else if (malist[index - 1][ma5] > malist[index - 1][ma20]) {
                    if (malist[index][ma5] <= malist[index][ma20]) {
                        //todo  ???????????????
                        //MA5??????MA20
                        // this.onCreateTipsItem('MA5??????MA20');
                        this.onCreateTipsItem(18);

                    }
                }
            }

        }


        if (GameCfg.MAs.indexOf(5) != -1 && GameCfg.MAs.indexOf(10) != -1) {
            let ma5 = GameCfg.MAs.indexOf(5);
            let ma10 = GameCfg.MAs.indexOf(10);
            if (index >= 10 - 1) {
                if (malist[index - 1][ma5] < malist[index - 1][ma10]) {
                    if (malist[index][ma5] >= malist[index][ma10]) {
                        //todo  ???????????????
                        //MA5??????MA10
                        //   this.onCreateTipsItem('MA5??????MA10');
                        this.onCreateTipsItem(11);

                    }
                } else if (malist[index - 1][ma5] > malist[index - 1][ma10]) {
                    if (malist[index][ma5] <= malist[index][ma10]) {
                        //todo  ???????????????
                        //MA5??????MA10
                        // this.onCreateTipsItem('MA5??????MA10');
                        this.onCreateTipsItem(17);

                    }
                }
            }

        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.SLGEVENTNOTICE);
        GlobalEvent.off(EventCfg.UPDATERATE);
        GlobalEvent.off('clickTipsInfoPos');
    }

}
