import { ProgressRate } from '../src/index';

const MARGIN = 50;

export default (warp: ProgressRate, context: CanvasRenderingContext2D) => {
    const width = context.canvas.width;
    const height = context.canvas.height;
    const size = Math.min(width, height) - MARGIN * 2;
    context.strokeStyle = '#eee';
    context.strokeRect(MARGIN, MARGIN, size, size);
    for (let x = 0; x <= 1; x += 0.005) {
        const y = warp.map(x);
        context.beginPath();
        context.arc(
            MARGIN + x * size,
            MARGIN + size - y * size,
            1, 0, Math.PI * 2, false,
        );
        context.fillStyle = 'black';
        context.fill();
    }
};
