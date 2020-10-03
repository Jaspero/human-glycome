import {ImageModification} from './image-modification.class';

export class ImageTintModification extends ImageModification {
  constructor(rgb: string) {
    super('TINT', [rgb]);
  }
}
