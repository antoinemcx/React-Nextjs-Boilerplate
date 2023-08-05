import Link from 'next/link';
import { FC } from 'react';

const Logo: FC = () => {
    return (
        <div className="active:scale-95 inline-flex items-center justify-center">
            <Link href="/" className="text-lg font-semibold h-10 py-2 px-4">
                Next.js Boilerplate
            </Link>
        </div>
    );
};

export default Logo;
