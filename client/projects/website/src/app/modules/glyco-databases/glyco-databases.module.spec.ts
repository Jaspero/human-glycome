import {GlycoDatabasesModule} from './glyco-databases.module';

describe('GlycoDatabasesModule', () => {
  let glycoDatabasesModule: GlycoDatabasesModule;

  beforeEach(() => {
    glycoDatabasesModule = new GlycoDatabasesModule();
  });

  it('should create an instance', () => {
    expect(glycoDatabasesModule).toBeTruthy();
  });
});
