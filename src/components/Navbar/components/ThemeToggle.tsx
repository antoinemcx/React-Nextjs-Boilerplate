'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import Button from '@/ui/Button';
import { Laptop, Moon, Sun } from 'lucide-react';

const ThemeToggle: FC = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm">
                    <Sun className="rotate-0 scale-100 transition-all hover:text-foreground dark:-rotate-90 dark:scale-0 dark:text-muted" />
                    <Moon className="absolute rotate-90 scale-0 transition-all dark:hover:text-foreground dark:rotate-0 dark:scale-100 dark:text-muted" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" forceMount>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
