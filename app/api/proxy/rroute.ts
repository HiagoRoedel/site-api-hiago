import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch("https://apihiago.onrender.com/clientes", {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}
