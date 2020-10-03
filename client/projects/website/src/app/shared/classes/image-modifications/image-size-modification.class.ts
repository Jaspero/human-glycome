import {ImageModification} from './image-modification.class';

export class ImageSizeModification extends ImageModification {
  constructor(width: number, height?: number) {
    super('SIZE', [width, height || width]);
  }
}
