import { RouterType } from 'itty-router';

export type RequestParams = Request & { params: Record<string, string> };

export interface RouterStrategy {
	handle(request: Request): Promise<Response>;
	router(): RouterType;
}
