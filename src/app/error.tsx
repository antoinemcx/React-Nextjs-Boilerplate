'use client';

import Button, { buttonVariants } from '@/ui/Button';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import MiddleContainer from '@/ui/MiddleContainer';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <MiddleContainer>
            <div>
                <Heading size="md" className="mb-2">
                    There was a problem...
                </Heading>
                <Paragraph size="lg">{error.message || 'Something went wrong'}</Paragraph>

                <div className="flex sm:flex-row flex-col gap-5 mt-8">
                    <Link
                        className={buttonVariants({
                            variant: 'outline',
                            className: 'w-auto',
                        })}
                        href="/">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to home
                    </Link>
                    <Button onClick={reset}>Try again</Button>
                </div>
            </div>
        </MiddleContainer>
    );
};

export default Error;
