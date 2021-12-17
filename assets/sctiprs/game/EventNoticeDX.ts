import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';

import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import DrawData from './DrawData';
import List from "../Utils/List";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    _idd = 0;

    arr=[];

    @property(List)
    listV: List = null;

    onLoad() {
        GlobalEvent.on(EventCfg.SLGEVENTNOTICE, () => {
            if(GameCfg.GameType==pb.GameType.DingXiang){
                if (GameCfg.GameSet.jx_notice) {
                    if (DrawData.MaList && DrawData.MaList.length > 0) {
                        this.testMaEvent();
                    }
                }

                if (GameCfg.GameSet.k_notice) {
                    this.testKFrom();
                }
            }
        }, this);

        GlobalEvent.on(EventCfg.UPDATERATE, (data) => {
            if(GameCfg.GameType==pb.GameType.DingXiang) {
                if (GameCfg.GameSet.StopCheck_notice) {
                    this.testStopCheck(data[0]);
                }
            }
        }, this);

        GlobalEvent.on(EventCfg.LEAVEGAME,()=>{
            if(GameCfg.GameType==pb.GameType.DingXiang) {
                this.arr.length = 0;
                this.listV.numItems = this.arr.length;
                this._idd = 0;
            }
        },this);
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
            //小阳线（XH）：
            if (rate > 0 && rate < 0.02) {
                if (data[index].low == data[index].open) {
                    if (data[index].high == data[index].close) {
                        //光头光脚小阳线(GtGjXH)

                    } else if (data[index].high > data[index].close) {
                        //只带上影线小阳线(SyXH)

                    }
                } else if (data[index].low < data[index].open) {
                    if (data[index].high == data[index].close) {
                        //只带下影线小阳线（XyXH）

                    } else if (data[index].high > data[index].close) {
                        // 带上下影线小阳线（SyXyXH）

                    }
                }
            }

        }

        {
            //中阳线（ZH）：
            if (rate >= 0.02 && rate < 0.055) {


                if (data[index].low == data[index].open) {
                    //光头光脚中阳线(GtGjZH)
                    if (data[index].high == data[index].close) {

                        if (rate1 >= -0.105 && rate1 < -0.02) {

                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    //曙光初现：
                                    //this.onCreateTipsItem('曙光初现');
                                    this.onCreateTipsItem(1);

                                }

                            }

                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    //旭日东升：
                                    // this.onCreateTipsItem('旭日东升');
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
                                    ////曙光初现
                                    //this.onCreateTipsItem('曙光初现');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////旭日东升：
                                    //this.onCreateTipsItem('旭日东升');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }

                        else if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (rate2 >= 0.02 && rate2 < 0.055) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {
                                        //红三兵：
                                        //this.onCreateTipsItem('红三兵');
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
                                ////曙光初现
                                // this.onCreateTipsItem('曙光初现');
                                this.onCreateTipsItem(1);
                            }

                        }

                        else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                            if (data[index].close > data[index - 1].open) {
                                ////旭日东升：
                                // this.onCreateTipsItem('旭日东升');
                                this.onCreateTipsItem(2);
                            }
                        }

                    }
                    else if (rate1 >= 0.02 && rate1 < 0.055) {
                        if (rate2 >= 0.02 && rate2 < 0.055) {
                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].high) {
                                    //红三兵：
                                    //  this.onCreateTipsItem('红三兵');
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
                                ////曙光初现
                                // this.onCreateTipsItem('曙光初现');
                                this.onCreateTipsItem(1);
                            }

                        }

                        else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                            if (data[index].close > data[index - 1].open) {
                                ////旭日东升：
                                // this.onCreateTipsItem('旭日东升');
                                this.onCreateTipsItem(2);
                            }
                        }

                    }
                    else if (rate1 >= 0.02 && rate1 < 0.055) {
                        if (rate2 >= 0.02 && rate2 < 0.055) {
                            if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].high) {
                                    //红三兵：
                                    // this.onCreateTipsItem('红三兵');
                                    this.onCreateTipsItem(3);
                                }
                            }
                        }
                    }
                }
            }

        }

        {
            //大阳线
            if (rate >= 0.055 && rate <= 0.105) {

                if (data[index].low == data[index].open) {
                    if (data[index].high == data[index].close) {
                        //涨停板(GtGjDH)

                        if (rate1 >= -0.055 && rate1 < 0) {
                            if (data[index].close > data[index - 1].open) {
                                if (data[index].open < data[index - 1].close) {
                                    // 看涨吞没：
                                    //this.onCreateTipsItem('看涨吞没');
                                    this.onCreateTipsItem(4);


                                }
                            }
                        }
                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open >= data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////曙光初现
                                    // this.onCreateTipsItem('曙光初现');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////旭日东升：
                                    //  this.onCreateTipsItem('旭日东升');
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
                                                //红三兵：
                                                //  this.onCreateTipsItem('红三兵');
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
                                    // 看涨吞没：
                                    // this.onCreateTipsItem('看涨吞没');
                                    this.onCreateTipsItem(4);
                                }
                            }
                        }
                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open > data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////曙光初现
                                    // this.onCreateTipsItem('曙光初现');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////旭日东升：
                                    // this.onCreateTipsItem('旭日东升');
                                    this.onCreateTipsItem(2);
                                }
                            }

                        }
                        if (rate1 >= 0.055 && rate1 <= 0.105) {
                            if (rate2 >= 0.055 && rate2 <= 0.105) {
                                if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close > data[index - 1].high) {

                                        //红三兵：
                                        //this.onCreateTipsItem('红三兵');
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
                                    // 看涨吞没：
                                    //this.onCreateTipsItem('看涨吞没');
                                    this.onCreateTipsItem(4);
                                }
                            }
                        }

                        if (rate1 >= -0.105 && rate1 < -0.02) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index - 1].open > data[index].close && data[index].close >= (data[index - 1].open + data[index - 1].close) / 2) {
                                    ////曙光初现
                                    //this.onCreateTipsItem('曙光初现');
                                    this.onCreateTipsItem(1);
                                }

                            }

                            else if (data[index].open >= (data[index - 1].open + data[index - 1].close) / 2) {
                                if (data[index].close > data[index - 1].open) {
                                    ////旭日东升：
                                    //this.onCreateTipsItem('旭日东升');
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
                                                //红三兵：
                                                // this.onCreateTipsItem('红三兵');
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
            //小阴线
            if (rate > -0.02 && rate < 0) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {
                        //光头光脚小阴线(GtGjXL)
                    }

                    else if (data[index].high > data[index].open) {
                        //只带上影线小阴线(SyXL)
                    }
                }
                else if (data[index].low < data[index].close) {
                    if (data[index].high == data[index].open) {
                        //只带下影线小阴线(XyXL)
                    }

                    else if (data[index].high > data[index].open) {
                        //带上下影线小阴线(SyXyXL)
                    }
                }

            }

            //中阴线
            else if (rate >= -0.055 && rate < -0.02) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {
                        //光头光脚小阴线(GtGjXL)

                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //三只乌鸦：
                                                //  this.onCreateTipsItem('三只乌鸦');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    else if (data[index].high > data[index].open) {
                        //只带上影线小阴线(SyXL)
                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //三只乌鸦：
                                                //  this.onCreateTipsItem('三只乌鸦');
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
                        //只带下影线小阴线(XyXL)

                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //三只乌鸦：
                                                // this.onCreateTipsItem('三只乌鸦');
                                                this.onCreateTipsItem(5);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    else if (data[index].high > data[index].open) {
                        //带上下影线小阴线(SyXyXL)
                        if (rate1 >= -0.055 && rate1 < -0.02) {
                            if (rate2 >= -0.055 && rate2 < -0.02) {
                                if (data[index].open <= (data[index - 1].open + data[index - 1].close) / 2) {
                                    if (data[index].close < data[index - 1].low) {
                                        if (data[index - 1].open <= (data[index - 2].open + data[index - 2].close) / 2) {
                                            if (data[index - 1].close < data[index - 2].low) {
                                                //三只乌鸦：
                                                // this.onCreateTipsItem('三只乌鸦');
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

            //大阴线
            else if (rate >= -0.105 && rate <= -0.055) {

                if (data[index].low == data[index].close) {
                    if (data[index].high == data[index].open) {

                        if (rate1 > 0 && rate1 < 0.055) {
                            if (data[index].open > data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //看跌吞没：
                                    // this.onCreateTipsItem('看跌吞没');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //乌云盖顶：
                                    // this.onCreateTipsItem('乌云盖顶');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //倾盆大雨：
                                    //this.onCreateTipsItem('倾盆大雨');
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
                                                //三只乌鸦：
                                                //  this.onCreateTipsItem('三只乌鸦');
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
                                    //看跌吞没：
                                    // this.onCreateTipsItem('乌看跌吞没');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //乌云盖顶：
                                    //  this.onCreateTipsItem('乌云盖顶');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //倾盆大雨：
                                    // this.onCreateTipsItem('倾盆大雨');
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
                                                //三只乌鸦：
                                                //  this.onCreateTipsItem('三只乌鸦');
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
                                    //看跌吞没：
                                    // this.onCreateTipsItem('看跌吞没');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //乌云盖顶：
                                    //  this.onCreateTipsItem('乌云盖顶');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //倾盆大雨：
                                    //  this.onCreateTipsItem('倾盆大雨');
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
                                                //三只乌鸦：
                                                // this.onCreateTipsItem('三只乌鸦');
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
                                    //看跌吞没：
                                    //this.onCreateTipsItem('看跌吞没');
                                    this.onCreateTipsItem(6);
                                }
                            }
                        }

                        if (rate1 > 0.02 && rate1 <= 0.105) {
                            if (data[index].open > data[index - 1].high) {
                                if (data[index - 1].open <= data[index].close && data[index].close < (data[index - 1].close + data[index - 1].open) / 2) {
                                    //乌云盖顶：
                                    // this.onCreateTipsItem('乌云盖顶');
                                    this.onCreateTipsItem(7);
                                }
                            }
                        }

                        if (rate1 >= 0.02 && rate1 < 0.055) {
                            if (data[index].open < data[index - 1].close) {
                                if (data[index].close < data[index - 1].open) {
                                    //倾盆大雨：
                                    // this.onCreateTipsItem('倾盆大雨');
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
                                                //三只乌鸦：
                                                //  this.onCreateTipsItem('三只乌鸦');
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
                    //十字线(SZX)：
                }

                else if (data[index].high == data[index].low) {
                    //一字线(YZX)：
                }

                if (data[index].close == data[index].high) {
                    if (data[index].close > data[index].low) {
                        //T字线(TZX)：
                    }
                }
                else if (data[index].close < data[index].high) {
                    if (data[index].close == data[index].low) {
                        //倒T字线(DTZX)：
                    }
                }
            }
        }
    }

    testStopCheck(el) {

        if (el > 0.3 && this._idd != 31) {
            //收益大于30%
            // this.onCreateTipsItem('收益大于30%');
            this.onCreateTipsItem(31);
            this._idd = 31
            return;
        } else if ((el > 0.2 && el <= 0.3) && (this._idd != 32 && this._idd != 31)) {
            //收益大于20%
            //   this.onCreateTipsItem('收益大于20%');
            this.onCreateTipsItem(32);
            this._idd = 32;
            return;
        } else if ((el > 0.1 && el <= 0.2) && this._idd != 33 && this._idd != 32 && this._idd != 31) {
            //收益大于10 %
            //  this.onCreateTipsItem('收益大于10%');
            this.onCreateTipsItem(33);
            this._idd = 33;
            return;
        }

        else if (el < -0.2 && this._idd != 34) {
            // 亏损大于20%
            //this.onCreateTipsItem('亏损大于20%');
            this.onCreateTipsItem(34);
            this._idd = 34;
            return;
        } else if ((el < -0.15 && el >= -0.2) && this._idd != 35 && this._idd != 34) {
            // 亏损大于15%
            // this.onCreateTipsItem('亏损大于15%');
            this.onCreateTipsItem(35);
            this._idd = 35;
            return;
        } else if ((el < -0.1 && el >= -0.15) && this._idd != 36 && this._idd != 35 && this._idd != 34) {
            // 亏损大于10%
            //  this.onCreateTipsItem('亏损大于10%');
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

            str = '曙光初现';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 1);

        } else if (id == 2) {

            str = '旭日东升';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 2);

        } else if (id == 3) {

            str = '红三兵';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 3);

        } else if (id == 4) {

            str = '看涨吞没';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 4);

        } else if (id == 5) {

            str = '三只乌鸦';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 5);

        } else if (id == 6) {

            str = '看跌吞没';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 6);

        } else if (id == 7) {

            str = '乌云盖顶';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 7);
        } else if (id == 8) {

            str = '倾盆大雨';
            GlobalEvent.emit(EventCfg.CREATEBLOCK, 8);
        }

        else if (id == 11) {
            str = 'MA5上穿MA10';
        } else if (id == 12) {
            str = 'MA5上穿MA20';
        } else if (id == 13) {
            str = 'MA10上穿MA20';
        } else if (id == 14) {
            str = 'MA10上穿MA30';
        } else if (id == 15) {
            str = 'MA30上穿MA60';
        } else if (id == 16) {
            str = 'MA60上穿MA120';
        }

        else if (id == 17) {
            str = 'MA5下穿MA10';
        } else if (id == 18) {
            str = 'MA5下穿MA20';
        } else if (id == 19) {
            str = 'MA10下穿MA20';
        } else if (id == 20) {
            str = 'MA10下穿MA30';
        } else if (id == 21) {
            str = 'MA30下穿MA60';
        } else if (id == 22) {
            str = 'MA60下穿MA120';
        }

        else if (id == 31) {
            str = '收益大于30%';
        } else if (id == 32) {
            str = '收益大于20%';
        } else if (id == 33) {
            str = '收益大于10%';
        } else if (id == 34) {
            str = '亏损大于20%';
        } else if (id == 35) {
            str = '亏损大于15%';
        } else if (id == 36) {
            str = '亏损大于10%';
        }

        let obj={
            str:str,
            index:index,
        }

        this.arr.push(obj);
        this.listV.numItems=this.arr.length;
    }

    onListRender(item: cc.Node, idx: number) {
        let itemHandle = item.getComponent('ItemNotice')
        itemHandle.text = this.arr[idx].str;
        itemHandle.Pindex = this.arr[idx].index;
        itemHandle.onShow();
    }

    //检测均线策略
    testMaEvent() {

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
                        //todo  生成事件栏
                        //MA60上穿MA120
                        this.onCreateTipsItem(16);

                    }
                } else if (malist[index - 1][ma60] > malist[index - 1][ma120]) {
                    if (malist[index][ma60] <= malist[index][ma120]) {
                        //MA60下穿MA120
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
                        //todo  生成事件栏
                        //MA30上穿MA60
                        this.onCreateTipsItem(15);

                    }
                } else if (malist[index - 1][ma30] > malist[index - 1][ma60]) {
                    if (malist[index][ma30] <= malist[index][ma60]) {
                        //MA30下穿MA60
                        //  this.onCreateTipsItem('MA30下穿MA60');
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
                        //todo  生成事件栏
                        //MA10上穿MA30
                        this.onCreateTipsItem(14);

                    }
                } else if (malist[index - 1][ma10] > malist[index - 1][ma30]) {
                    if (malist[index][ma10] <= malist[index][ma30]) {
                        //MA10下穿MA30
                        // this.onCreateTipsItem('MA10下穿MA30');
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
                        //todo  生成事件栏
                        //MA10上穿MA20
                        this.onCreateTipsItem(13);

                    }
                } else if (malist[index - 1][ma10] > malist[index - 1][ma20]) {
                    if (malist[index][ma10] <= malist[index][ma20]) {
                        //todo  生成事件栏
                        //MA10下穿MA20
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
                        //todo  生成事件栏
                        //MA5上穿MA20
                        this.onCreateTipsItem(12);

                    }
                } else if (malist[index - 1][ma5] > malist[index - 1][ma20]) {
                    if (malist[index][ma5] <= malist[index][ma20]) {
                        //todo  生成事件栏
                        //MA5下穿MA20
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
                        //todo  生成事件栏
                        //MA5上穿MA10
                        this.onCreateTipsItem(11);

                    }
                } else if (malist[index - 1][ma5] > malist[index - 1][ma10]) {
                    if (malist[index][ma5] <= malist[index][ma10]) {
                        //todo  生成事件栏
                        //MA5下穿MA10
                        this.onCreateTipsItem(17);

                    }
                }
            }

        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.SLGEVENTNOTICE);
        GlobalEvent.off(EventCfg.UPDATERATE);
        GlobalEvent.off(EventCfg.LEAVEGAME);
    }

}
