import { FC } from 'react';
import UserRegisterForm from './_components/UserRegisterForm';
import Link from 'next/link';
import MiddleContainer from '@/ui/MiddleContainer';
import { buttonVariants } from '@/ui/Button';
import { ChevronLeft } from 'lucide-react';

const RegisterPage: FC = () => {
    return (
        <MiddleContainer className="lg:max-w-5xl">
            <Link
                className={buttonVariants({
                    variant: 'ghost',
                    className: 'w-auto self-start mb-4',
                })}
                href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to home
            </Link>

            <div className="border rounded-lg container relative h-[550px] flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-highlight dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-accent bg-opacity-5" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        Boilerplate
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                You already have an account ?
                                <Link
                                    className={buttonVariants({
                                        variant: 'link',
                                        className: '!text-lg',
                                    })}
                                    href="/login">
                                    Sign in
                                </Link>
                            </p>
                        </blockquote>
                    </div>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign up an account
                            </h1>
                            <p className="lg:hidden text-sm text-paragraph">
                                You already have an account ?{' '}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4 hover:text-highlight">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <UserRegisterForm />

                        <p className="pt-4 text-center text-sm text-paragraph">
                            By clicking sign up, you agree to our{' '}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-highlight">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </MiddleContainer>
    );
};

export default RegisterPage;
