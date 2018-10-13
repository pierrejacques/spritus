const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export default (width = 500, height = 500, ratio = 2) => {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.clearRect(0, 0, width, height);
    return context;
};
