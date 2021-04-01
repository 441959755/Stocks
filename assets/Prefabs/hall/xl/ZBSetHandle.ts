const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property([cc.Node])
    layers: cc.Node[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];


    start() {
        this.openLayer();
    }

    protected onEnable() {
        this.layers.forEach((el, index) => {
            let data;
            if (index == 0) {
                data = cc.ext.gameData.ZBSet.MA;
            } else if (index == 1) {
                data = cc.ext.gameData.ZBSet.VOL;
            } else if (index == 2) {
                data = cc.ext.gameData.ZBSet.MACD;
            } else if (index == 3) {
                data = cc.ext.gameData.ZBSet.BOLL;
            } else if (index == 4) {
                data = cc.ext.gameData.ZBSet.KDJ;
            } else if (index == 5) {
                data = cc.ext.gameData.ZBSet.RSI;
            } else if (index == 6) {
                data = cc.ext.gameData.ZBSet.EXPMA;
            }
            if (index < 7) {
                el.children.forEach((e, tt) => {
                    if (e.name == 'node') {
                        if(data[tt]){
                            e.getChildByName('label').getComponent(cc.Label).string = data[tt];
                        }

                    }
                })
            } else {
                let toggle1 = cc.find('toggleContainer1/toggle1', el);
                 let toggle2 = cc.find('toggleContainer1/toggle2', el)
                toggle1.getComponent(cc.Toggle).isChecked = cc.ext.gameData.ZBSet.isShowVol;
                  toggle2.getComponent(cc.Toggle).isChecked = !cc.ext.gameData.ZBSet.isShowVol;
                let toggle3= cc.find('toggleContainer2/toggle1', el);
               let toggle4 = cc.find('toggleContainer2/toggle2', el)
                toggle3.getComponent(cc.Toggle).isChecked = cc.ext.gameData.ZBSet.isBW;
              toggle4.getComponent(cc.Toggle).isChecked = !cc.ext.gameData.ZBSet.isBW;
            }

        })
    }

    onBtnClick(event,data){
        let name=event.target.name;
        if(name=='closeSetBtn'){
            this.node.active=false;
        }else if(name=='saveSetBtn'){
            let datas=cc.ext.gameData.ZBSet;
            this.layers.forEach((el,index)=>{
                if(index<7){
                    el.children.forEach((e,tt)=>{
                        if(e.name=='node'){
                            let val=parseInt(e.getChildByName('label').getComponent(cc.Label).string);
                            if(index==0){
                                datas.MA[tt]=val
                            }else if(index==1){
                                datas.VOL[tt]=val
                            }else if(index==2){
                                datas.MACD[tt]=val;
                            }else if(index==3){
                                datas.BOLL[tt]=val;
                            }else if(index==4){
                                datas.KDJ[tt]=val;
                            }else if(index==5){
                                datas.RSI[tt]=val;
                            }else if(index==6){
                                datas.EXPMA[tt]=val;
                            }
                        }
                    })
                }else{
                    let toggle1 = cc.find('toggleContainer1/toggle1', el);
                    datas.isShowVol=toggle1.getComponent(cc.Toggle).isChecked;
                    let toggle3= cc.find('toggleContainer2/toggle1', el);
                    datas.isBW=toggle3.getComponent(cc.Toggle).isChecked;
                }
            })

            cc.ext.gameData.ZBSet=datas;

        }
    }

    openLayer(){
        this.toggles.forEach((el,index)=>{
            if(el.isChecked){
                this.layers[index].active=true;
            }else{
                this.layers[index].active=false;
            }
        })
    }


    onToggleSetClick() {
        this.openLayer();
    }

    // update (dt) {}
}
