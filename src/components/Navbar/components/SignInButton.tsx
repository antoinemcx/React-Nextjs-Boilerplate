import { FC } from 'react';
import { buttonVariants } from '@/ui/Button';
import Link from 'next/link';

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    return (
        <Link href="/login" className={buttonVariants()}>
            Sign in
        </Link>
    );
};

export default SignInButton;
