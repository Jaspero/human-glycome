import {JasperoApiQueryOptions} from './jaspero-api-query-options.interface';

export interface JasperoApiGetQueryOptions extends JasperoApiQueryOptions {
  limit?: number;
  skip?: number;
  query?: any;
}
