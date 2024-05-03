				import worker, * as OTHER_EXPORTS from "/Users/oscar/Code/resume_builder/backend/src/index.ts";
				import * as __MIDDLEWARE_0__ from "/Users/oscar/Code/resume_builder/node_modules/.pnpm/wrangler@3.53.1_@cloudflare+workers-types@4.20240502.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/Users/oscar/Code/resume_builder/node_modules/.pnpm/wrangler@3.53.1_@cloudflare+workers-types@4.20240502.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				
				worker.middleware = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
					...(worker.middleware ?? []),
				].filter(Boolean);
				
				export * from "/Users/oscar/Code/resume_builder/backend/src/index.ts";
				export default worker;