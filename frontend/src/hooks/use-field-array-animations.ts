import { useRef } from 'react';
import { UseFieldArrayRemove } from 'react-hook-form';

type ListRefs = Record<string, HTMLElement | null>;

export const useFieldArrayAnimations = (removeCb: UseFieldArrayRemove) => {
	const listRefs = useRef<ListRefs>({});

	const onRemoveListElement = (index: number, id: string) => {
		const listElement = listRefs.current[id];
		if (listElement) {
			listElement.classList.remove('animate-fade-up');
			listElement.classList.add('animate-fade-down');
			setTimeout(() => {
				removeCb(index);
			}, 300);
		}
	};

	const asignRef = (el: HTMLElement | null, id: string) => {
		listRefs.current[id] = el;
	};

	return {
		onRemoveListElement,
		asignRef,
	};
};
