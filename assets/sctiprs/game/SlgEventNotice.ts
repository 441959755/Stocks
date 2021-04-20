import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';

import GameCfg from '../game/GameCfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        GlobalEvent.on(EventCfg.SLGEVENTNOTICE, () => {
            if (GameCfg.GameSet.jx_notice) {
                if (GameCfg.MaList && GameCfg.MaList.length > 0) {
                    this.testMaEvent();
                }
            }

            if (GameCfg.GameSet.k_notice) {
                this.testKFrom();
            }

            if (GameCfg.GameSet.StopCheck_notice) {

            }


        }, this);
    }


    testKFrom() {

        let index = GameCfg.huizhidatas - 1;
        let data = GameCfg.data[0].data;
        let rate = (data[index].close - data[index].open) / data[index].open;

        let rate1 = (data[index - 1].close - data[index - 1].open) / data[index - 1].open;

        let rate2 = (data[index - 2].close - data[index - 2].open) / data[index - 2].open;

        {
            //小阳线（XH）：
            if (rate > 0 && rate < 0.03) {
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
            if (rate >= 0.03 && rate < 0.06) {

                //光头光脚中阳线(GtGjZH)
                if (data[index].low == data[index].open) {
                    if (data[index].high == data[index].close) {

                        //   if (rate1)



                    }

                }
            }

        }

    }

    //检测均线策略
    testMaEvent() {

        //let flag = false;

        let malist = GameCfg.MaList;
        let index = GameCfg.huizhidatas - 1;
        if (GameCfg.MAs.indexOf(60) != -1 && GameCfg.MAs.indexOf(120) != -1) {
            //  flag = true;
            //  if()
            let ma60 = GameCfg.MAs.indexOf(60);
            let ma120 = GameCfg.MAs.indexOf(120);

            if (malist[index - 1][ma60] < malist[index - 1][ma120]) {
                if (malist[index][ma60] >= malist[index][ma120]) {
                    //todo  生成事件栏
                    //MA60上穿MA120

                }
            } else if (malist[index - 1][ma60] > malist[index - 1][ma120]) {
                if (malist[index][ma60] <= malist[index][ma120]) {
                    //MA60下穿MA120
                }
            }
        }

        if (GameCfg.MAs.indexOf(30) != -1 && GameCfg.MAs.indexOf(60) != -1) {
            //   flag = true;
            let ma30 = GameCfg.MAs.indexOf(30);
            let ma60 = GameCfg.MAs.indexOf(60);

            if (malist[index - 1][ma30] < malist[index - 1][ma60]) {
                if (malist[index][ma30] >= malist[index][ma60]) {
                    //todo  生成事件栏
                    //MA30上穿MA60

                }
            } else if (malist[index - 1][ma30] > malist[index - 1][ma60]) {
                if (malist[index][ma30] <= malist[index][ma60]) {
                    //MA30下穿MA60
                }
            }
        }

        if (GameCfg.MAs.indexOf(10) != -1 && GameCfg.MAs.indexOf(30) != -1) {
            let ma10 = GameCfg.MAs.indexOf(10);
            let ma30 = GameCfg.MAs.indexOf(30);

            if (malist[index - 1][ma10] < malist[index - 1][ma30]) {
                if (malist[index][ma10] >= malist[index][ma30]) {
                    //todo  生成事件栏
                    //MA10上穿MA30

                }
            } else if (malist[index - 1][ma10] > malist[index - 1][ma30]) {
                if (malist[index][ma10] <= malist[index][ma30]) {
                    //MA10下穿MA30
                }
            }
        }

        if (GameCfg.MAs.indexOf(10) != -1 && GameCfg.MAs.indexOf(20) != -1) {
            let ma10 = GameCfg.MAs.indexOf(10);
            let ma20 = GameCfg.MAs.indexOf(20);

            if (malist[index - 1][ma10] < malist[index - 1][ma20]) {
                if (malist[index][ma10] >= malist[index][ma20]) {
                    //todo  生成事件栏
                    //MA10上穿MA20

                }
            } else if (malist[index - 1][ma10] > malist[index - 1][ma20]) {
                if (malist[index][ma10] <= malist[index][ma20]) {
                    //todo  生成事件栏
                    //MA10下穿MA20

                }
            }
        }

        if (GameCfg.MAs.indexOf(5) != -1 && GameCfg.MAs.indexOf(20) != -1) {
            let ma5 = GameCfg.MAs.indexOf(5);
            let ma20 = GameCfg.MAs.indexOf(20);

            if (malist[index - 1][ma5] < malist[index - 1][ma20]) {
                if (malist[index][ma5] >= malist[index][ma20]) {
                    //todo  生成事件栏
                    //MA5上穿MA20

                }
            } else if (malist[index - 1][ma5] > malist[index - 1][ma20]) {
                if (malist[index][ma5] <= malist[index][ma20]) {
                    //todo  生成事件栏
                    //MA5下穿MA20

                }
            }
        }


        if (GameCfg.MAs.indexOf(5) != -1 && GameCfg.MAs.indexOf(10) != -1) {
            let ma5 = GameCfg.MAs.indexOf(5);
            let ma10 = GameCfg.MAs.indexOf(10);

            if (malist[index - 1][ma5] < malist[index - 1][ma10]) {
                if (malist[index][ma5] >= malist[index][ma10]) {
                    //todo  生成事件栏
                    //MA5上穿MA10

                }
            } else if (malist[index - 1][ma5] > malist[index - 1][ma10]) {
                if (malist[index][ma5] <= malist[index][ma10]) {
                    //todo  生成事件栏
                    //MA5下穿MA10

                }
            }
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.SLGEVENTNOTICE);
    }

}
