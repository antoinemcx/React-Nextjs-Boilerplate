import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
    'text-highlight text-left font-extrabold leading-tight tracking-tighter',
    {
        variants: {
            size: {
                default: 'text-4xl md:text-5xl lg:text-6xl',
                lg: 'text-5xl md:text-6xl lg:text-7xl',
                md: 'text-3xl md:text-4xl lg:text-5xl',
                sm: 'text-2xl md:text-3xl lg:text-4xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

interface HeadingProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <h1 ref={ref} {...props} className={cn(headingVariants({ size, className }))}>
                {children}
            </h1>
        );
    }
);

Heading.displayName = 'Heading';

export default Heading;
