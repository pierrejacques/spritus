import { Animator, Sprite, ProgressRate } from '../../src';

const pointPainter = {
    paint(sprite, context) {
        context.beginPath();
        context.arc(
            sprite.left + sprite.width / 2,
            sprite.top + sprite.height / 2,
            1, 0, Math.PI * 2, false,
        );
        context.fillStyle = 'rgb(100, 100, 195)';
        context.fill();
    },
};

function createCircularMotion(options) {
    const duration = options.duration || 3000;
    const key = options.key || 'left';
    const timeWarper = new ProgressRate()
        .to('offset', options.phase || 0)
        .to('repeat', options.cycle || 1)
        .to('circular');
    const distance = options.distance || 80;
    return {
        execute(sprite, context, t) {
            const percent = timeWarper.map((t % duration) / duration);
            sprite[key] = sprite.initialState[key] + distance * percent;
        },
    };
}

function createGrids(xmax, ymax) {
    const grids = [];
    for (let i = 0; i < xmax; i++) {
        for (let j = 0; j < ymax; j++) {
            grids.push({
                x: i,
                y: j,
            });
        }
    }
    return grids;
}

const sprites = createGrids(4, 4).map(({ x, y }) => {
    const SIZE = 80;
    const GAP = 80;

    return new Sprite({
        left: 50 + x * (SIZE + GAP),
        top: 50 + y * (SIZE + GAP),
        painter: pointPainter,
        behaviors: [
            createCircularMotion({
                key: 'left',
                cycle: x,
                phase: 0.25,
            }),
            createCircularMotion({
                key: 'top',
                cycle: y,
            }),
        ],
    });
});

export default (context: CanvasRenderingContext2D) => {
    const animator = new Animator(sprites, context);
    animator.start(false);
    window.setTimeout(() => {
        animator.stop();
    }, 10000);
}
