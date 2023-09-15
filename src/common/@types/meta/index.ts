
export const META_CONTROLLER = 'ROUTE_PREFIX';

export const META_METHOD = 'ROUTE_METHOD';

export const META_MIDDLEWARE = 'ROUTE_MIDDLEWARE';

export const META_PARAMETER = 'METHOD_PARAMETER';

/**
 * Limits for file uploads
 */
export interface FileLimits {
  /** Max field name size (Default: 100 bytes) */
  fieldNameSize?: number;
  /** Max field value size (Default: 1MB) */
  fieldSize?: number;
  /** Max number of non- file fields (Default: Infinity) */
  fields?: number;
  /** For multipart forms, the max file size (in bytes)(Default: Infinity) */
  fileSize?: number;
  /** For multipart forms, the max number of file fields (Default: Infinity) */
  files?: number;
  /** For multipart forms, the max number of parts (fields + files)(Default: Infinity) */
  parts?: number;
  /** For multipart forms, the max number of header key=> value pairs to parse Default: 2000(same as node's http). */
  headerPairs?: number;
}

/**
 * Enumeration of accepted parameter types
 */
export enum ParamType {
  path = 'path',
  query = 'query',
  header = 'header',
  cookie = 'cookie',
  form = 'form',
  body = 'body',
  param = 'param',
  file = 'file',
  files = 'files',
  context = 'context',
  context_request = 'context_request',
  context_response = 'context_response',
  context_next = 'context_next',
  context_accept = 'context_accept',
  context_accept_language = 'context_accept_language'
}