import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const user = cookies().has('authjs.session-token');
	const isSectionSelected = request.url.includes('selected');
	const isInfoRoute = request.url.includes('info');
	const isResumeCreated = request.url.includes('resume');

	const isNotAllowed = user && isSectionSelected && !isResumeCreated && !isInfoRoute;

	if (isNotAllowed) {
		return NextResponse.redirect(new URL('/builder', request.url));
	}
}

export const config = {
	matcher: '/builder',
};
