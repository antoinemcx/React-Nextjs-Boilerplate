import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

const MiddleContainer: FC<Props> = ({ children, className, ...props }) => {
    return (
        <div
            {...props}
            className={cn(
                `absolute mt-16 md:mt-0 inset-0 mx-auto container flex h-screen flex-col items-center justify-center ${className}`
            )}>
            {children}
        </div>
    );
};

export default MiddleContainer;
