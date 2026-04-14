'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './Button';

const bannerVariants = cva(
	'relative overflow-hidden rounded-xl border shadow-lg text-sm transition-all duration-300',
	{
		variants: {
			variant: {
				default: 'bg-zinc-900/50 border-white/10 text-white backdrop-blur-md',
				success:
					'bg-green-500/10 border-green-500/20 text-green-400',
				warning:
					'bg-amber-500/10 border-amber-500/20 text-amber-400',
				info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
				premium:
					'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400',
				gradient:
					'bg-zinc-900/80 border-white/10 text-white',
			},
			size: {
				default: 'py-4 px-6',
				sm: 'text-xs py-2 px-4',
				lg: 'text-lg py-6 px-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type BannerProps = React.ComponentProps<'div'> &
	VariantProps<typeof bannerVariants> & {
		title: string;
		description?: string;
		icon?: React.ReactNode;
		showShade?: boolean;
		show?: boolean;
		onHide?: () => void;
		action?: React.ReactNode;
		closable?: boolean;
		autoHide?: number;
	};

export function Banner({
	variant = 'default',
	size = 'default',
	title,
	description,
	icon,
	showShade = false,
	show,
	onHide,
	action,
	closable = false,
	className,
	autoHide,
	...props
}: BannerProps) {
	React.useEffect(() => {
		if (autoHide && show) {
			const timer = setTimeout(() => {
				onHide?.();
			}, autoHide);
			return () => clearTimeout(timer);
		}
	}, [autoHide, onHide, show]);

	if (!show) return null;

	return (
		<div
			className={cn(bannerVariants({ variant, size }), "premium-banner-root", className)}
			role={variant === 'warning' || variant === 'default' ? 'alert' : 'status'}
			{...props}
		>
			{showShade && (
				<div className="premium-banner-shade absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
			)}

			<div className="premium-banner-content-wrap flex flex-col lg:flex-row items-center lg:justify-between gap-6 text-center lg:text-left">
				<div className="flex min-w-0 flex-1 items-center gap-4">
					{icon && <div className="flex-shrink-0 text-cyan-400">{icon}</div>}

					<div className="premium-banner-text-area min-w-0 flex-1">
						<div className="flex flex-wrap items-center justify-center lg:justify-start">
							<p className="font-bold text-white text-base leading-tight">{title}</p>
						</div>
						{description && <p className="text-zinc-400 text-sm mt-1">{description}</p>}
					</div>
				</div>

				<div className="premium-banner-action-area flex flex-shrink-0 items-center gap-3">
					{action && action}

					{closable && (
						<Button onClick={onHide} size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white">
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
