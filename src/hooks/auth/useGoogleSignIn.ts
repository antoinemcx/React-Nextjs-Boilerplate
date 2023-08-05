import { signIn } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { useToast } from '../useToast';

const useGoogleSignIn = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
    const { toast } = useToast();

    return async () => {
        setIsLoading(true);

        try {
            await signIn('google');
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
};

export default useGoogleSignIn;
