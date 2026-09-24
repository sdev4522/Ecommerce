import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors focus:outline-none select-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-950 text-white shadow-xs',
        secondary:
          'border-neutral-200 bg-neutral-100 text-neutral-900',
        outline:
          'border-neutral-300 text-neutral-900 bg-white',
        white:
          'border-transparent bg-white text-neutral-950 shadow-xs font-bold',
        dark:
          'border-neutral-800 bg-neutral-900 text-neutral-200',
        subtle:
          'border-transparent bg-neutral-100 text-neutral-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
