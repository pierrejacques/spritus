import { Animator, Sprite, ProgressRate } from '../src';
import createContext from './create-context';

const ballPainter = {
    RADIUS: 5,
    paint(sprite, context) {
        context.beginPath();
        context.arc(
            sprite.left + sprite.width / 2,
            sprite.top + sprite.height / 2,
            this.RADIUS, 0, Math.PI * 2, false,
        );
        context.clip();
        context.shadowColor = '#aaa';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100, 100, 195)';
        context.fillStyle = 'rgba(0, 144, 255, 0.5)';
        context.fill();
        context.stroke();
    },
};

const horizontalMover = {
    DISTANCE: 800,
    DURATION: 1100,
    timeWarper: ProgressRate.warp('circular'),
    execute(sprite, context, t) {
        const percent = this.timeWarper.map((t % this.DURATION) / this.DURATION);
        sprite.left = sprite.initialState.left + this.DISTANCE * percent;
    },
};

const verticalMover = {
    DISTANCE: 300,
    DURATION: 1200,
    timeWarper: ProgressRate.warp('circular'),
    execute(sprite, context, t) {
        const percent = this.timeWarper.map((t % this.DURATION) / this.DURATION);
        sprite.top = sprite.initialState.top + this.DISTANCE * percent;
    },
};

const animator = new Animator([
    new Sprite({
        left: 50,
        top: 50,
        painter: ballPainter,
        behaviors: [
            horizontalMover,
            verticalMover,
        ],
    }),
], createContext(1000, 400));

animator.start(false);
