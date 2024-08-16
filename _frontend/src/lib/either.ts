export type Either<E, A> = Left<E> | Right<A>;

export interface Left<E> {
	readonly _tag: 'Left';
	readonly left: E;
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
	_tag: 'Left',
	left: e,
});

export interface Right<A> {
	readonly _tag: 'Right';
	readonly right: A;
}

export const right = <A, E = never>(a: A): Either<E, A> => ({
	_tag: 'Right',
	right: a,
});

export const isLeft = <E, A>(a: Either<E, A>): a is Left<E> => a._tag === 'Left';
