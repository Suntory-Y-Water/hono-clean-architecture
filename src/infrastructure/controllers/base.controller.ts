import type { Context } from 'hono';

export type Route = {
  /** ルート名 */
  name: string;
  /** サービス名 */
  serviceName: symbol;
  /** 受け入れるメソッド */
  methods: Method[];
  /** ルートのパス */
  path: string;
};

type Method = 'get' | 'post';

export interface BaseController {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  main(c: Context): Promise<any>;
}
