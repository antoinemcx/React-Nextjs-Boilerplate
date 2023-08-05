import { signOut } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { useToast } from '../useToast';

const useSignOut = (setIsLoading?: Dispatch<SetStateAction<boolean>>) => {
    const { toast } = useToast();

    return async () => {
        setIsLoading && setIsLoading(true);

        try {
            await signOut({ callbackUrl: `${window.location.origin}/login` });
        } catch (error) {
            toast({
                title: 'Error signing out',
                description: 'Please try again later',
                variant: 'destructive',
            });
        } finally {
            setIsLoading && setIsLoading(false);
        }
    };
};

export default useSignOut;
