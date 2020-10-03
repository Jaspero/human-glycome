import {ImageModification} from './image-modification.class';

export enum ImageSimpleModificationType {
  Greyscale = 'GREYSCALE',
  Median = 'MEDIAN',
  Blur = 'BLUR',
  Gamma = 'GAMMA',
  Negate = 'NEGATE',
  Linear = 'LINEAR'
}

export class ImageSimpleModification extends ImageModification {
  constructor(type: ImageSimpleModificationType) {
    super(type);
  }
}
