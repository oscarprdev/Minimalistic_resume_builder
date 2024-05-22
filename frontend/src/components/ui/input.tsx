import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export type InputKind = 'default' | 'label' | 'text' | 'subtitle' | 'sectionTitle' | 'title' | undefined;

const inputVariants = cva(
	'flex caret-purple_200 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'border-none shadow-none focus-visible:outline-none',
				common: 'border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-slate-950',
			},
			kind: {
				default: 'text-[1em] text-gray-800',
				label: 'text-[0.85em] text-gray-500',
				text: 'text-[0.9em] text-gray-800',
				subtitle: 'text-[1.1em] text-gray-900',
				sectionTitle: 'text-[1.5em] text-gray-900',
				title: 'text-[2em] text-black',
			},
		},
		defaultVariants: {
			variant: 'default',
			kind: 'default',
		},
	}
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, kind, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(inputVariants({ variant, kind, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export { Input };
