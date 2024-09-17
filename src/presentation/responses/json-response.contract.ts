export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
}

export type JsonResponse<PNameOrData, T = undefined> = {
  statusCode: number | string;
  message: string;
  data:
    | (PNameOrData extends string ? { [P in PNameOrData]: T } : never)
    | null;
  error: unknown | unknown[] | null;
};

export const createErrorResponse = (
  status: number | string,
  message: string,
): IJsonResponse<null> => ({
  statusCode: status,
  message: message,
  data: null,
});


