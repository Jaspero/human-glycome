export interface JasperoApiPaginatedResponse<T> {
  success: boolean;
  data: {
    current: number;
    total: number;
    totalItems: number;
    results: T[];
  };
}
