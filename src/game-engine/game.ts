import Sprite from '../sprite';

abstract class Game {
    sprites: Sprite[] = [];
    startTime = 0;
    lastTime = 0;
    gameTime = 0;
    fps = 0;
    STARTING_FPS = 60;

    paused = false;
    startedPauseAt = 0;
    PAUSE_TIMEOUT = 100;

    constructor(
        public name: string,
        public context: CanvasRenderingContext2D,
    ) {}

    abstract start(): void;
    abstract animate(time: number): void;
    abstract tick(time: number): void;
    abstract updateFrameRate(time: number): void;
    abstract cleanScreen(): void;
    abstract updateSprites(time: number): void;
    abstract paintSprites(time: number): void;
    abstract startAnimate(): void;
    abstract paintUnderSprites(time: number): void;
    abstract paintOverSprites(time: number): void;
    abstract endAnimate(): void;
}
