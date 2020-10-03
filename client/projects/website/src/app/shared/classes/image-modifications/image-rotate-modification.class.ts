import {ImageModification} from './image-modification.class';

export class ImageRotateModification extends ImageModification {
  constructor(rotate: 90 | 180) {
    super('ROTATE', [rotate]);
  }
}
