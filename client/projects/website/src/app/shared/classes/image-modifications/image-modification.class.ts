export class ImageModification {
  constructor(name: string, args?: any[]) {
    const argsName =
      args && args.length
        ? args.reduce(
            (acc, cur, index) =>
              cur ? `${acc}${index === 0 ? '' : 'x'}${cur}` : acc,
            '_'
          )
        : '';
    this.modification = `-${name}` + argsName;
  }

  modification: string;
}
