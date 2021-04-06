import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";

const {ccclass, property} = cc._decorator;

@ccclass

export default class NewClass extends cc.Component {

    @property(cc.Node)
    finalLayer: cc.Node = null;  //结算界面

    @property(cc.Node)
    helpLayer: cc.Node = null;   //帮助界面

    onLoad() {
        //游戏结算
        GlobalEvent.on(EventCfg.GAMEOVEER, (flag) => {
            setTimeout(()=>{
                this.finalLayer.active = flag;
            },100)

        }, this)

        //打开帮组
        GlobalEvent.on(EventCfg.HELPSHOW, () => {
            this.helpLayer.active = true;
        }, this);

        this.initData();

        this.setColor();
    }




    protected onDestroy() {
        GlobalEvent.off(EventCfg.GAMEOVEER);
        GlobalEvent.off(EventCfg.HELPSHOW);
    }

    setColor(){
        if (GameCfg.GameSet.isBW) {
            GameCfg.MAColor[0] = new cc.Color().fromHEX('#ffffff');
            GameCfg.MAColor[1] = new cc.Color().fromHEX('#ebeb12');

            GameCfg.MAColor[2] = new cc.Color().fromHEX('#e814ed');
            GameCfg.MAColor[3] = new cc.Color().fromHEX('#14ed14');
            GameCfg.MAColor[4] = new cc.Color().fromHEX('#1c9ce6');
            GameCfg.MAColor[5] = new cc.Color().fromHEX('#d47026');

            GameCfg.BOLLColor[0] = cc.Color.WHITE;
            GameCfg.BOLLColor[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.BOLLColor[2] = new cc.Color().fromHEX('#d85cfc');

            GameCfg.VOLColor[0] = new cc.Color().fromHEX('#ffffff');
            GameCfg.VOLColor[1] = new cc.Color().fromHEX('#ebeb12');

            GameCfg.tipsDealColor[0] = new cc.Color().fromHEX('#02230c');
            GameCfg.tipsDealColor[1] = new cc.Color().fromHEX('#2d0202');

            GameCfg.K_D_J_Line[0] = cc.Color.WHITE;
            GameCfg.K_D_J_Line[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.K_D_J_Line[2] = new cc.Color().fromHEX('#d85cfc');

            GameCfg.DIF_LINE_COL = cc.Color.WHITE;
            GameCfg.DEA_LINE_COL = new cc.Color().fromHEX('#f0dc05');
            //  GameCfg.MACD_COL[0] = cc.Color.WHITE;
            GameCfg.MACD_COL[0] = new cc.Color().fromHEX('#f11111');
            GameCfg.MACD_COL[1] = new cc.Color().fromHEX('#0fee1e');

            GameCfg.RSI_COLOR[0] = cc.Color.WHITE;
            GameCfg.RSI_COLOR[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.RSI_COLOR[2] = new cc.Color().fromHEX('#d85cfc');

        } else {
            GameCfg.MAColor[0] = new cc.Color().fromHEX('#03004c');
            GameCfg.MAColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.MAColor[2] = new cc.Color().fromHEX('#cc33cc');
            GameCfg.MAColor[3] = new cc.Color().fromHEX('#097c25');
            GameCfg.MAColor[4] = new cc.Color().fromHEX('#00a0e9');
            GameCfg.MAColor[5] = new cc.Color().fromHEX('#a0a0a0');

            GameCfg.BOLLColor[0] = cc.Color.BLACK;
            GameCfg.BOLLColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.BOLLColor[2] = new cc.Color().fromHEX('#cc33cc');

            GameCfg.VOLColor[0] = new cc.Color().fromHEX('#03004c');
            GameCfg.VOLColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.tipsDealColor[0] = new cc.Color().fromHEX('#D6F2D0');
            GameCfg.tipsDealColor[1] = new cc.Color().fromHEX('#FDD9DD');

            GameCfg.K_D_J_Line[0] = cc.Color.BLACK;
            GameCfg.K_D_J_Line[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.K_D_J_Line[2] = new cc.Color().fromHEX('#cc33cc');

            GameCfg.DIF_LINE_COL = cc.Color.BLACK;
            GameCfg.DEA_LINE_COL = new cc.Color().fromHEX('#f39800');

            //   GameCfg.MACD_COL[0] = cc.Color.BLACK;
            GameCfg.MACD_COL[0] = new cc.Color().fromHEX('#e2233e');
            GameCfg.MACD_COL[1] = new cc.Color().fromHEX('#00ba50');

            GameCfg.RSI_COLOR[0] = cc.Color.BLACK;
            GameCfg.RSI_COLOR[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.RSI_COLOR[2] = new cc.Color().fromHEX('#cc33cc');
        }

    }

    initData(){
        GameCfg.MAs=[];
        let j = 0;
        if (GameCfg.GameType == 1) {

            for (let i = 1; i <= 6; i++) {
                if (GameCfg.GameSet['isMA' + i]) {
                    GameCfg.MAs[j++] = GameCfg.GameSet['MA' + i + 'Date'];
                }
            }
        }else if(GameCfg.GameType==2){
            GameCfg.VOLGraph=[];

            if(GameCfg.GameSet.select=='均线'){
                if(GameCfg.GameSet.strategy=='股价穿越均线'){
                    GameCfg.MAs.push(GameCfg.GameSet.MA[0]);
                }else if(GameCfg.GameSet.strategy=='均线交叉'){
                    GameCfg.MAs.push(Math.min(GameCfg.GameSet.MA[1],GameCfg.GameSet.MA[2]));
                    GameCfg.MAs.push(Math.max(GameCfg.GameSet.MA[1],GameCfg.GameSet.MA[2]));
                }else if(GameCfg.GameSet.strategy=='组合训练'){
                    let ma=[];
                    ma.push(GameCfg.GameSet.MA[0],GameCfg.GameSet.MA[1],GameCfg.GameSet.MA[2])
                    ma.sort((a,b)=>{return a - b;})
                    GameCfg.MAs=ma;
                }
            }else if(GameCfg.GameSet.select=='MACD'){
                if(GameCfg.GameSet.strategy=='MACD金叉'){

                }else if(GameCfg.GameSet.strategy=='0轴穿越'){

                }else if(GameCfg.GameSet.strategy=='柱最大值转向'){

                }else if(GameCfg.GameSet.strategy=='MACD背离'){

                }else if(GameCfg.GameSet.strategy=='经典用法'){

                }
           }else if(GameCfg.GameSet.select=='BOLL'){
                if(GameCfg.GameSet.strategy=='布林带中轨'){

                }else if(GameCfg.GameSet.strategy=='单边突破上轨'){

                }else if(GameCfg.GameSet.strategy=='上下轨间震荡'){

                }else if(GameCfg.GameSet.strategy=='金典用法'){

                }
            }else if(GameCfg.GameSet.select=='KDJ'){
                if(GameCfg.GameSet.strategy=='超买超卖'){

                }else if(GameCfg.GameSet.strategy=='KDJ金叉'){

                }else if(GameCfg.GameSet.strategy=='KDJ背离'){

                }else if(GameCfg.GameSet.strategy=='金典用法'){

                }
            }else if(GameCfg.GameSet.select=='EXPMA'){
                if(GameCfg.GameSet.strategy=='EXPMA金叉'){

                }else if(GameCfg.GameSet.strategy=='经典用法'){

                }
            }else if(GameCfg.GameSet.select=='RSI'){
                if(GameCfg.GameSet.strategy=='RSI金叉'){

                }else if(GameCfg.GameSet.strategy=='超买超卖'){

                }else if(GameCfg.GameSet.strategy=='经典用法'){

                }
            }else if(GameCfg.GameSet.select=='成交量'){
                if(GameCfg.GameSet.strategy=='量柱和均量线'){
                    GameCfg.VOLGraph=GameCfg.GameSet.VOL;
                }
            }

        }
    }

}
