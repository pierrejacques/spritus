import Sprite from './sprite';

export interface Behavior {
    execute: (
        sprite: Sprite,
        context: CanvasRenderingContext2D,
        ellapseTime: number,
    ) => void;
}

export interface Painter {
    paint: (sprite: Sprite, context: CanvasRenderingContext2D) => void;
    advance?: () => void;
}
