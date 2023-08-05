'use client';

import UserAvatar from '@/components/UserAvatar';
import useSignOut from '@/hooks/auth/useSignOut';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import { User } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    const signUserOut = useSignOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: user.name || null, image: user.image || null }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-muted">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="focus:!bg-opacity-20 focus:!bg-red-500 focus:!text-red-500"
                    onSelect={(e) => {
                        e.preventDefault();
                        signUserOut();
                    }}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
