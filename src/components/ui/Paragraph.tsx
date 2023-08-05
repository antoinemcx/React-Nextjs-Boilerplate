import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const paragraphVariants = cva('max-w-prose text-paragraph mb-2', {
    variants: {
        size: {
            default: 'text-base sm:text-lg',
            sm: 'text-sm, sm:text-base',
            lg: 'text-2xl',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

interface ParagraphProps
    extends HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                {...props}
                className={cn(paragraphVariants({ size, className }))}>
                {children}
            </p>
        );
    }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
