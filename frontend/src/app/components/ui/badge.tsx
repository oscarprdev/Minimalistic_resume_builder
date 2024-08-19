import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80',
				success: 'border border-emerald-300 bg-emerald-100 text-emerald-700',
				working: 'border border-orange-300 bg-orange-100 text-orange-700',
				outline: 'text-slate-950 dark:text-slate-50',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
