import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

cc.ext={};
cc.ext.gameData=new GameData();

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){

        cc.macro.ENABLE_MULTI_TOUCH = false;

        this.initData();
       let self=this;
       // //TODO  接DSK
        cc.ext.llwSDK=LLWSDK.getSDK()
        cc.ext.llwSDK.login(()=>{

            this.enterHall();
        })


      //  this.enterHall();

    },


    initData(){
        let SMSet=cc.sys.localStorage.getItem('SMSET');
        if(!SMSet){
            SMSet={
                isShowVol:true,
                isBW:true,
                isMA1:true,
                MA1Date:5,
                isMA2:true,
                MA2Date:10,
                isMA3:true,
                MA3Date:20,
                isMA4:true,
                MA4Date:30,
                isMA5:true,
                MA5Date:60,
                isMA6:true,
                MA6Date:120,
                isFC:false,
            }
            cc.ext.gameData.SMSet=SMSet;
        }else{
            cc.ext.gameData.SMSet=JSON.parse(SMSet);
        }
    },



    //进入大厅
    enterHall(){
        cc.director.loadScene('hall');
    }


});
