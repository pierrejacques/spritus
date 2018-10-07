import Sprite from './sprite';

export default class Animator {
    public refresh = true;

    private animation = null;
    private startStamp = 0;
    
    constructor(
        public sprites: Sprite[],
        public context: CanvasRenderingContext2D,
    ) {}
    
    private animate() {
        const currentStamp = Date.now();
        this.refresh && this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.sprites.forEach(sprite => sprite.update(this.context, currentStamp - this.startStamp));
        this.sprites.forEach(sprite => sprite.paint(this.context));
        this.animation = requestAnimationFrame(() => this.animate());
    }
    
    start(refresh = true) {
        this.refresh = refresh;
        this.stop();
        this.startStamp = Date.now();
        this.animate();
    }
    
    stop() {
        window.cancelAnimationFrame(this.animation);
        this.startStamp = 0;
    }
    
    appendTo(element: HTMLElement) {
        element.appendChild(this.context.canvas);
    }
}
