const builtIns = {
    'linear': () => (value) => value,
    'circular': () => (value) => (0.5 - 0.5 * Math.cos(value * 2 * Math.PI)),
    'ease-in': (strength = 1) => (value) => value ** (strength * 2),
    'ease-out': (strength = 1) => (value) => 1 - (1 - value) ** (strength * 2),
    'ease': () => (value) => (0.5 - 0.5 * Math.cos(value * Math.PI)),
    'elastic': (passes = 3) => (value) => 1 - Math.cos(value * Math.PI * passes) * (1 - value) + value,
    'bounce': (bounces = 3) => (value) => {
        const result = 1 - Math.cos(value * Math.PI * bounces) * (1 - value) + value;
        return result <= 1 ? result : 2 - result;
    },
    'bezier': () => () => {

    },
};

interface ProgressMapper {
    (value: number): number;
}

export default class ProgressRate {
    static warp = (...params) => {
        const instance = new ProgressRate();
        return instance.warp(...params);
    }

    static reverse = () => {
        const instance = new ProgressRate();
        return instance.reverse();
    }

    static offset = (phase: number) => {
        const instance = new ProgressRate();
        return instance.offset(phase);
    }

    private mappers: ProgressMapper[] = [];

    map(value: number): number {
        let result = value;
        this.mappers.forEach((mapper) => {
            result = mapper(result);
        });
        return result;
    }

    warp(type = 'linear', ...params): ProgressRate {
        this.mappers.push((builtIns[type] || builtIns['linear'])(...params));
        return this;
    }

    reverse(): ProgressRate {
        this.mappers.push(v => 1 - v);
        return this;
    }

    offset(phase: number): ProgressRate {
        this.mappers.push(v => (v + phase) % 1);
        return this;
    }
}
