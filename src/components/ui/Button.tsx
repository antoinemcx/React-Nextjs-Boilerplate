import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus-ring-2 focus:ring-muted focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-muted disabled:pointer-events-none dark:focus:ring-offset-slate-900',
    {
        variants: {
            variant: {
                default: 'bg-button text-background hover:bg-buttonHover',
                outline: 'hover:bg-accent border border-button/95',
                ghost: 'bg-transparent hover:bg-accent text-muted data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
                link: 'bg-transparent hover:text-foreground text-muted data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
                navbarLink:
                    '!text-lg md:!text-sm bg-transparent hover:text-foreground text-muted data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2 rounded-md',
                lg: 'h11 px-8 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant, isLoading, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading}
                {...props}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
