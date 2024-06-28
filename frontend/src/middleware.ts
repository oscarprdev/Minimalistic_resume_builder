import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const isSectionSelected = request.url.includes('selected');
	const isInfoRoute = request.url.includes('info');
	const isResumeCreated = request.url.includes('resume');

	const isNotAllowed = isSectionSelected && !isResumeCreated && !isInfoRoute;

	if (isNotAllowed) {
		return NextResponse.redirect(new URL('/builder', request.url));
	}
}

export const config = {
	matcher: '/builder',
};
