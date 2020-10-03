import {JasperoApiProjection} from './jaspero-api-projection.interface';
import {JasperoApiSort} from './jaspero-api-sort.interface';

export interface JasperoApiQueryOptions {
  query?: Object;
  populate?: boolean;
  projection?: JasperoApiProjection;
  sort?: JasperoApiSort;
}
