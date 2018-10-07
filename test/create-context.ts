const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export default (width = 500, height = 500) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.clearRect(0, 0, width, height);
    return context;
};
