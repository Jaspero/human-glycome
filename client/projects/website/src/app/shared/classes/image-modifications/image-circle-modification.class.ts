import {ImageModification} from './image-modification.class';

export class ImageCircleModification extends ImageModification {
  constructor(
    width: number,
    height: number,
    borderRadiusX?: number,
    borderRadiusY?: number
  ) {
    super('CIRCLE', [width, height, borderRadiusX, borderRadiusY]);
  }
}
