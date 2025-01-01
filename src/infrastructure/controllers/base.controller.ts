import type { Context } from 'hono';

export interface BaseController {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  main(c: Context): Promise<any>;
}
