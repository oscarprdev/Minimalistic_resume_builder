'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {
	kind?: 'header';
}

const textareaVariants = cva(
	'flex h-10 w-full rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium ',
	{
		variants: {
			variant: {
				default:
					'border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
				resume: 'bg-transparent text-zinc-800 focus:outline-none',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, kind, variant, ...props }, ref) => {
	const [height, setHeight] = React.useState(30);

	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const target = e.target;

		if (target instanceof HTMLTextAreaElement) {
			const length = target.value.length;

			if (length > 65) {
				setHeight(60);
			} else {
				setHeight(30);
			}
		}
	};

	return (
		<textarea
			onInput={handleInput}
			style={{ height: `${kind ? `${height}px` : 'auto'}` }}
			className={cn(textareaVariants({ variant }), className)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = 'Textarea';

export { Textarea };
