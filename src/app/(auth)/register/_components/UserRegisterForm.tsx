'use client';

import { FC, useState } from 'react';
import Button from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const UserRegister: FC<UserRegisterFormProps> = ({ ...props }: UserRegisterFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
    });

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data }),
            });

            const body = await response.json();
            if (body.error) {
                toast({
                    description: body.error,
                    variant: 'destructive',
                });
            } else {
                router.push('/login');
                toast({
                    title: 'Successfully registered',
                    description: 'You can now sign in with your credentials !',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error during registration...',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={registerUser} {...props}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="name">
                        Name
                    </label>
                    <Input
                        id="name"
                        placeholder="Your name"
                        type="text"
                        value={data.name}
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                        }}
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        required
                        disabled={isLoading}
                    />
                </div>
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
                        required
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
                        placeholder="Create a password"
                        type="password"
                        value={data.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                        }}
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="cPassword">
                        Confirm password
                    </label>
                    <Input
                        id="cPassword"
                        placeholder="Confirm the password"
                        type="password"
                        value={data.cPassword}
                        onChange={(e) => {
                            setData({ ...data, cPassword: e.target.value });
                        }}
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        required
                        disabled={isLoading}
                    />
                </div>

                <Button disabled={isLoading} className="mt-3">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                </Button>
            </div>
        </form>
    );
};

export default UserRegister;
