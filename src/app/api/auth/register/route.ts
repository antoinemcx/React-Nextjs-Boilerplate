import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password, cPassword } = body;

    if (!name || !email || !password || !cPassword) {
        return NextResponse.json({ error: 'A field is missing !' }, { status: 400 });
    }

    if (password.length < 8 || password.length >= 32) {
        return NextResponse.json(
            { error: 'The password must be between 8 and 32 characters long.' },
            { status: 400 }
        );
    }
    if (!/\d/.test(password)) {
        return NextResponse.json(
            { error: 'The password must contain at least 1 digit.' },
            { status: 400 }
        );
    }
    if (!/[a-z]/.test(password)) {
        return NextResponse.json(
            { error: 'The password must contain at least 1 lowercase letter.' },
            { status: 400 }
        );
    }
    if (!/[A-Z]/.test(password)) {
        return NextResponse.json(
            { error: 'The password must contain at least 1 capital letter.' },
            { status: 400 }
        );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return NextResponse.json(
            { error: 'The password must contain at least 1 special character.' },
            { status: 400 }
        );
    }

    if (cPassword !== password) {
        return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const exist = await db.user.findUnique({ where: { email: email } });
    if (exist) {
        return NextResponse.json(
            { error: 'This email is already used' },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            hashedPassword,
        },
    });

    return NextResponse.json({ success: true });
}
