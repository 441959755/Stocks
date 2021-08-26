

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    zql: cc.Label = null;

    @property(cc.Label)
    zq: cc.Label = null;

    @property(cc.Label)
    cw: cc.Label = null;

    @property(cc.Label)
    ywc: cc.Label = null;

    @property(cc.Label)
    pic: cc.Label = null;

    @property([cc.Node])
    rightNode: cc.Node[] = [];

    listData = [];

    curCount = 0;

    daduiCount = 0;

    dacuoCount = 0;

    curNode: cc.Node = null;

    dui = [];
    cuo = [];

    asset = null;

    onShow(data?, Imgs?) {
        if (Imgs) {
            this.asset = Image;
        }

        if (data) {
            let list = data.list;

            let le = list.length;
            let arr = [];

            for (let i = 0; i < 10;) {
                let index = parseInt(Math.random() * le + '');
                if (arr.indexOf(index) == -1) {
                    arr.push(index);
                    this.listData.push(list[index]);
                    i++;
                }
            }
        }

        this.rightNode.forEach(el => {
            el.active = false;
        })

        let images = this.listData[this.curCount].contents.images;
        if (images.length == 4) {
            this.curNode = this.rightNode[0];
        }
        else if (images.length < 8) {
            this.curNode = this.rightNode[1];
        }
        else if (images.length == 8) {
            this.curNode = this.rightNode[2];
        }

        this.curNode.active = true;

        for (let i = 0; i < 4; i++) {
            this.dui[i] = this.curNode.getChildByName('item' + (i + 1)).getChildByName('study_dt_gou');

            this.cuo[i] = this.curNode.getChildByName('item' + (i + 1)).getChildByName('study_dt_gou2');

            this.dui[i].active = false;
            this.cuo[i].active = false;
        }

        this.onShowLabel();

        this.onShowPic();

        this.onShowImg();
    }

    onShowLabel() {

        if (this.daduiCount == 0) {
            this.zql.string = '0 ';
        }
        else {
            let zql = parseInt(this.dacuoCount / this.curCount * 100 + '');
            this.zql.string = zql + '';
        }

        this.zq.string = this.daduiCount + '';
        this.cw.string = this.dacuoCount + '';
        this.ywc.string = this.curCount + '';

    }

    onShowPic() {
        let texts = this.listData[this.curCount].contents.texts;

        if (texts.length > 0) {
            texts.forEach((e, i) => {
                if (i == 0) {
                    this.pic.string = e.text;
                }
                else {
                    this.curNode.getChildByName('item' + (i)).getChildByName('label1').getComponent(cc.Label).string = e.text;
                }
            });
        }

    }

    onShowImg() {
        let images = this.listData[this.curCount].contents.images;

        if (images.length > 4 && images < 8) {
            images.forEach(el => {
                if (el.fileName != 'study_dt_a' ||
                    el.fileName != 'study_dt_b' ||
                    el.fileName != 'study_dt_c' ||
                    el.fileName != 'study_dt_d') {
                    let sp = this.curNode.getChildByName('sp');
                    let img = new cc.Node('sprite');
                    let im = img.addComponent(cc.Sprite);
                    sp.addChild(img);
                    im.spriteFrame = this.asset.get(el.fileName);
                }
            });
        }
        else if (images.length == 8) {
            images.forEach((el, i) => {
                if (el.fileName != 'study_dt_a' ||
                    el.fileName != 'study_dt_b' ||
                    el.fileName != 'study_dt_c' ||
                    el.fileName != 'study_dt_d') {
                    let sp = this.curNode.getChildByName('sp' + (i + 1));
                    //    let img = new cc.Node('sprite');
                    // let im = img.addComponent(cc.Sprite);
                    // sp.addChild(img);
                    let im = sp.getComponent(cc.Sprite);
                    im.spriteFrame = this.asset.get(el.fileName);
                }
            });
        }
        else {

        }

    }


    onDisable() {
        this.dacuoCount = 0;
        this.daduiCount = 0;
    }



    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'btn_black') {
            this.node.active = false;
        }
        else if (name == 'item1') {
            let rightIndex = 0;

            this.pdChange(rightIndex);

        }

        else if (name == 'item2') {
            let rightIndex = 1;
            this.pdChange(rightIndex);
        }

        else if (name == 'item3') {
            let rightIndex = 2;
            this.pdChange(rightIndex);
        }

        else if (name == 'item4') {
            let rightIndex = 3;
            this.pdChange(rightIndex);

        }
    }

    pdChange(rightIndex) {

        let r = this.listData[this.curCount].rightIndex;
        if (r == rightIndex) {
            this.daduiCount += 1;
            this.curCount += 1;
        }
        else {
            this.dacuoCount += 1;
            this.curCount += 1;
        }

        this.onShow();
    }
}
