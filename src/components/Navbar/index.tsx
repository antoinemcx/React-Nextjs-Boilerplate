'use client';

import Link from 'next/link';
import { buttonVariants } from '@/ui/Button';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';
import SignInButton from './components/SignInButton';
import UserAccountNav from './components/UserAccountNav';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
    const { data: session } = useSession();

    const [open, setOpen] = useState<boolean>(false);
    const links = [{ name: '404', href: '/sfudfsi' }];

    return (
        <div className="flex fixed backdrop-blur-sm bg-background/75 z-50 top-0 left-0 right-0 h-20 border-b border-border shadow-sm items-center justify-between">
            <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
                <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transform transition-all duration-300 ${
                            open ? 'rotate-45 translate-y-2' : ''
                        }`}></div>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transition-opacity ${
                            open ? 'opacity-0' : ''
                        }`}></div>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transform transition-all duration-300 ${
                            open ? '-rotate-45 -translate-y-2' : ''
                        }`}></div>
                </div>

                <div className="flex gap-4 md:w-full md:justify-between">
                    <Logo />

                    <div
                        className={`fixed md:relative items-start md:items-center space-y-4 md:space-y-0 px-10 md:px-0 ${
                            open ? 'top-[12vh] h-[95vh]' : 'top-[-15vh]'
                        } w-[100vw] md:h-auto md:w-auto left-0 md:left-auto flex-col flex md:gap-4 md:flex-row md:top-0 bg-background75 backdrop-blur-md transition-all duration-200 ease-in`}>
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        {links.map((link, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={buttonVariants({ variant: 'navbarLink' })}>
                                    {link.name}
                                </Link>
                            );
                        })}

                        {session ? (
                            <>
                                {/* Protected pages */}
                                <Link
                                    href="/admin"
                                    className={buttonVariants({ variant: 'navbarLink' })}>
                                    Admin
                                </Link>

                                <div className="hidden md:block">
                                    <UserAccountNav user={session.user} />
                                </div>
                            </>
                        ) : (
                            <SignInButton />
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 md:hidden">
                    <ThemeToggle />
                    {session && <UserAccountNav user={session.user} />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
