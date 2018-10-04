import { Painter, Behavior } from './interfaces';

interface SpriteState {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    velocityX?: number;
    velocityY?: number;
}

interface SpriteOptions extends SpriteState {
    behaviors?: Behavior[];
    painter?: Painter;
}

export default class Sprite {
    top = 0;
    left = 0;
    width = 20;
    height = 20;
    velocityX = 20;
    velocityY = 20;

    behaviors: Behavior[] = [];
    painter: Painter;

    visible = true;
    animating = false;
    initialState: SpriteState = {};
    
    constructor(options: SpriteOptions = {}) {
        Object.assign(this, options);
        'top left width height velocityX velocityY'.split(' ').forEach((key) => {
            Reflect.set(this.initialState, key, this[key]);
        });
    }
    
    paint(context: CanvasRenderingContext2D) {
        if (this.painter && this.visible) {
            context.save();
            this.painter.paint(this, context);
            context.restore();
        }
    }
    
    update(context: CanvasRenderingContext2D, elapsedTime: number) {
        context.save();
        this.behaviors.forEach(behavior => behavior.execute(this, context, elapsedTime));
        context.restore();
    }
    
    reset() {
        Object.assign(this, this.initialState);
    }
}
