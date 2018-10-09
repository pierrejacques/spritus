import Shape from './shape';
import { Paintable } from '../interfaces';
import { Projection, Vector } from '../geo-base';

export default class SpriteShape extends Shape implements Paintable {
    paint() {

    }

    contains() {
        return true;
    }

    project() {
        return new Projection(0, 1);
    }

    getAxes() {
        return [];
    }
}