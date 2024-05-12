import { RouterType } from 'itty-router';
import { Env } from '../../../..';

export type RequestParams = Request & { params: Record<string, string> };

export interface RouterInput {
	env?: Env;
}

export interface RouterStrategy {
	handle(request: Request): Promise<Response>;
	router(input?: RouterInput): RouterType;
}
