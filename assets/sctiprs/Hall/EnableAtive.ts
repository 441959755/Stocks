import delayTime = cc.delayTime;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    timer=null;

    points=[];

    protected onLoad() {
        let nodes=this.node.children;
        nodes.forEach((el,index)=>{
            this.points[index]=el.position;
        })
    }

    protected onEnable() {
        let nodes=this.node.children;
        let i=0;
        let points=[];
        nodes.forEach((el,index)=>{
            el.x=999;
        })
        this.timer=setInterval(()=>{
            cc.tween(nodes[i])
                .to(0.1,{position:this.points[i]})
                .start()
            i+=1;
            if(i>=nodes.length){
                clearInterval( this.timer);
                this.timer=null;
            }
        },150)
    }

    protected onDisable() {
          this.timer&&(clearInterval(this.timer));
    }
}
