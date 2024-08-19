import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
	kind?: 'dynamic';
}

const inputVariants = cva(
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, kind, type, ...props }, ref) => {
	const [width, setWidth] = React.useState((props.value as string).length - (kind ? 0 : 3));

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		if (variant === 'resume' && kind === 'dynamic') {
			const target = e.target;

			if (target instanceof HTMLInputElement) {
				const length = target.value.length;

				setWidth(length - (kind ? 0 : 3));
			}
		}
	};
	return (
		<input
			style={{ width: `${kind === 'dynamic' && width && `${width}ch`}` }}
			onInput={handleInput}
			type={type}
			className={cn(inputVariants({ variant }), className)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export { Input };
