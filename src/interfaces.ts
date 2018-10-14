import Sprite from './sprite';

export interface Coord {
    x: number;
    y: number;
}

export interface SpriteBehavior {
    execute: (
        sprite: Sprite,
        context: CanvasRenderingContext2D,
        ellapseTime: number,
    ) => void;
}

export interface SpritePainter {
    paint: (sprite: Sprite, context: CanvasRenderingContext2D) => void;
    advance?: () => void;
}

export interface Paintable {
    paint: (context: CanvasRenderingContext2D) => void;
}
