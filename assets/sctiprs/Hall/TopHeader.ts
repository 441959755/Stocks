import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    UserName: cc.Label = null;

    @property(cc.Label)
    userLevel: cc.Label = null;

    @property(cc.Label)
    userExp: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    brick: cc.Label = null;

   @property(cc.Node)
   helpNode:cc.Node=null;

   @property(cc.Node)
   blackNode:cc.Node=null;

   preNode=null;

   onLoad () {
       GlobalEvent.on('otherShow',(data)=>{
            this.helpNode.active=true;
            this.blackNode.active=true;
            this.preNode=data;

       },this);

       GlobalEvent.on('otherHide',(data)=>{
            this.helpNode.active=false;
           this.blackNode.active=false;
           this.preNode=data;
       },this);

       //砖石
       GlobalEvent.on(EventCfg.BIRCKCHANGE, () => {
           this.brick.string = cc.ext.gameData.brick;
       }, this);

       //金币
       GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
           this.gold.string = cc.ext.gameData.gold;
       }, this);

       //等级
       GlobalEvent.on(EventCfg.LEVELCHANGE, () => {
           this.userLevel.string = cc.ext.gameData.level;
       }, this);

       //经验
       GlobalEvent.on(EventCfg.EXPCHANGE, () => {
           this.userExp.string = cc.ext.gameData.exp;
       }, this);

       //设置用户信息
       this.setUserInfo();

   }

    setUserInfo(){
        this.userExp.string = cc.ext.gameData.exp;
        this.userLevel.string = cc.ext.gameData.level;
        this.gold.string = cc.ext.gameData.gold;
        this.brick.string = cc.ext.gameData.brick;
        this.UserName.string=cc.ext.gameData.name||cc.ext.gameData.userID;
    }

    start () {
       this.helpNode.active=false;
       this.blackNode.active=false;
    }

    onClick(event,data){
       let name=event.target.name;
       //点击加金币
       if(name=='addGoldBtn'){

       }
       //点击加砖石
        else if(name=='addBrickBtn'){

       }
        //点击帮助
        else if(name=='helpBtn'){

       }
        //点击返回
        else if(name=='blackBtn'){
            this.preNode.node.active=false;
            this.blackNode.active=false;
            this.helpNode.active=false;
       }
    }

    // update (dt) {}
}
