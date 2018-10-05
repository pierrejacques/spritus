import { Animator, Sprite, ProgressRate } from '../src';
import createContext from './create-context';

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
    const key = options.key || 'left';
    const timeWarper = ProgressRate.offset(options.phase || 0).warp('circular');
    const duration = options.duration || 1000;
    const distance = options.distance || 80;
    return {
        execute(sprite, context, t) {
            const percent = timeWarper.map((t % duration) / duration);
            sprite[key] = sprite.initialState[key] + distance * percent;
        },
    };
}

const sprites = Array(20).fill(null).map((_, index) => {
    const SIZE = 80;
    const GAP = 80;
    const LIMIT = 6;

    const rowIndex = Math.floor((SIZE + GAP) * index / LIMIT); // FIXME:
    return new Sprite({
        left: (rowIndex % 6) * (SIZE + GAP) + 50, // FIXME: 被除数错误
        top: rowIndex * (SIZE + GAP) + 50,
        painter: pointPainter,
        behaviors: [
            createCircularMotion({
                key: 'left',
                duration: 900,
                phase: index * 0.25,
            }),
            createCircularMotion({
                key: 'top',
                duration: 250 * (1 + index),
            }),
        ],
    });
});

const animator = new Animator(sprites, createContext(1000, 400));

animator.start(false);
setTimeout(() => {
    animator.stop();
}, 40000);
