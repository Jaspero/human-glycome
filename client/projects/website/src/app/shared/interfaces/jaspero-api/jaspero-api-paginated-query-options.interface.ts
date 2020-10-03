import {JasperoApiQueryOptions} from './jaspero-api-query-options.interface';

export interface JasperoApiPaginatedQueryOptions
  extends JasperoApiQueryOptions {
  size?: number;
  current?: number;
}
