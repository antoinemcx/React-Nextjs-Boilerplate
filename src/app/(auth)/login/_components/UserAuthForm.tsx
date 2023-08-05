'use client';

import { FC, useState } from 'react';
import Button from '@/ui/Button';
import { cn } from '@/lib/utils';
import { Input } from '@/ui/Input';
import useGoogleSignIn from '@/hooks/auth/useGoogleSignIn';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({
    className,
    ...props
}: UserAuthFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') ?? '/';

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const signInUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Error logging in',
                    description: result.error,
                    variant: 'destructive',
                });
            } else {
                router.push(callbackUrl);
                window.location.reload();
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in...',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    const signInWithGoogle = useGoogleSignIn(setIsGoogleLoading);

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={signInUser}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email">
                            Email
                        </label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                            }}
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="password">
                            Password
                        </label>
                        <Input
                            id="password"
                            placeholder="Type your password"
                            type="password"
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>

                    <Button disabled={isLoading} className="mt-1">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In with Email
                    </Button>
                </div>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </div>

            <div className="grid gap-3">
                <Button
                    variant="outline"
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={isGoogleLoading}>
                    {isGoogleLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Image
                            src="/images/google.svg"
                            alt="Google logo"
                            width={16}
                            height={16}
                            className="mr-2"
                        />
                    )}{' '}
                    Continue with Google
                </Button>
            </div>
        </div>
    );
};

export default UserAuthForm;
