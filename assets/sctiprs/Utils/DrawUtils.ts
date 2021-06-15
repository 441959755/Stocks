

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
}