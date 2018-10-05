const builtIns = {
    'linear': () => (value) => value,

    'offset': (phase: number) => v => (v + phase) % 1,

    'reverse': () => v => 1 - v,

    'repeat': (n: number = 2) => v => (v % (1 / n) * n),

    'bin': (n: number = 1) => v => Math.floor(v * n * 2) % 2 === 1 ? 1 : 0,

    'wave': (n: number = 1) => v => {
        const value = v % (1 / 2 / n) * 2 * n;
        return Math.floor(v * n * 2) % 2 === 1 ? value : 1 - value;
    },

    'circular': () => (value) => (0.5 - 0.5 * Math.cos(value * 2 * Math.PI)),

    'ease-in': (strength = 1) => (value) => value ** (strength * 2),

    'ease-out': (strength = 1) => (value) => 1 - (1 - value) ** (strength * 2),

    'ease': () => (value) => (0.5 - 0.5 * Math.cos(value * Math.PI)), // TODO: 用三次曲线替换他

    'elastic': (passes = 3) => (value) => 1 - Math.cos(value * Math.PI * passes) * (1 - value) + value,

    'bounce': (bounces = 3) => (value) => {
        const result = 1 - Math.cos(value * Math.PI * bounces) * (1 - value) + value;
        return result <= 1 ? result : 2 - result;
    },
    
    'bezier': () => () => {

    },
};

interface ProgressMapper {
    (input: number): number;
}

export default class ProgressRate {
    constructor(
        public mappers: ProgressMapper[] = []
    ) {}

    map(value: number): number {
        let result = value;
        this.mappers.forEach((mapper) => {
            result = mapper(result);
        });
        return result;
    }

    to(type = 'linear', ...params): ProgressRate {
        this.mappers.push((builtIns[type] || builtIns['linear'])(...params));
        return this;
    }
}


