

export default class DrawUtils {

    public static drawLine(ctx, sX, sY, eX, eY, falg?) {
        ctx.moveTo(sX, sY);
        ctx.lineTo(eX, eY);
        ctx.stroke();
    }

    public static drawRect(ctx, x, y, w, h, col?) {
        col && (ctx.fillColor = col);
        ctx.rect(x, y, w, h);

        col && (ctx.fill())
        ctx.stroke();
    }

    public static drawClear(ctx) {
        ctx && (ctx.clear())
    }

    public static drawRectFill(ctx, x, y, w, h, color?) {
        ctx.rect(x, y, w, h);
        if (color) {
            ctx.fillColor = color;
            ctx.fill();
        }
        ctx.stroke();
    }

    //其他 分时的
    public static drawMinLineFill(ctx, x, y, tx, ty) {
        ctx.strokeColor = new cc.Color().fromHEX('#64C8FF11');
        ctx.moveTo(x, 0);
        ctx.lineTo(x, y);
        ctx.lineTo(tx, ty);
        ctx.lineTo(tx, 0);
        ctx.lineTo(x, 0);
        ctx.fillColor = new cc.Color().fromHEX('#64C8FF11');
        ctx.stroke();
    }
}