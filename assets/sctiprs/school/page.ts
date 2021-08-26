

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onShowUI(data, asset) {

        let content = this.node.getChildByName('node');

        if (data.images.length > 0) {

            data.images.forEach((e, i) => {
                let img = new cc.Node('sprite' + i);
                let sp = img.addComponent(cc.Sprite);
                content.addChild(img);
                img.setPosition(e.x, e.y);
                sp.spriteFrame = asset.get(e.fileName);
            });
        }

        if (data.texts.length > 0) {
            data.texts.forEach((e, i) => {
                let text = new cc.Node('text' + i);
                let la = text.addComponent(cc.Label);

                content.addChild(text);
                text.setPosition(e.x, e.y);
                la.string = e.text;
                text.setContentSize(e.contentW, e.contentH);
                la.fontSize = e.fontSize;
                la.overflow = cc.Label.Overflow.SHRINK;
            });
        }

    }
}
