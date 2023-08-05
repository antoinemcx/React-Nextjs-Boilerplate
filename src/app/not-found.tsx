import { buttonVariants } from '@/ui/Button';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import Link from 'next/link';
import { FC } from 'react';
import { ChevronLeft } from 'lucide-react';

import type { Metadata } from 'next';
import MiddleContainer from '@/ui/MiddleContainer';

export const metadata: Metadata = {
    title: 'Next.js Boilerplate | Page not found',
};

const PageNotFound: FC = () => {
    return (
        <MiddleContainer>
            <div className="max-w-7xl flex flex-col gap-5">
                <Link
                    className={`mb-5 ${buttonVariants({
                        variant: 'ghost',
                        className: 'w-fit',
                    })}`}
                    href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Link>

                <Heading>Not found...</Heading>
                <Paragraph>The page you&apos;re looking for does not exist.</Paragraph>
            </div>
        </MiddleContainer>
    );
};

export default PageNotFound;
