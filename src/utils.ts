let offscreenContext: CanvasRenderingContext2D = null;

export const getOffscreenContext = () => {
    if (!offscreenContext) {
        offscreenContext = document.createElement('canvas').getContext('2d');
    }
    return offscreenContext;
}
