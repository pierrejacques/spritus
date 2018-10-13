import createContext from './utils/create-context';

import circularSprite from './executables/circular-sprite';
import warpVisualizer from './executables/warp-visualizer';
import randomDots from './executables/random-dots';

const targetEl = document.getElementById('canvas');
const context = createContext(1200, 500, 2);
targetEl.append(context.canvas);

circularSprite(context);
// randomDots(context);
