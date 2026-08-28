import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time, serviceType, message } =
      body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta" },
        { status: 400 }
      );
    }

    // In production, send email or save to database
    // For now, just return success
    const reservation = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      guests,
      date,
      time,
      serviceType,
      message,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Reserva recebida com sucesso",
        reservation,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar reserva" },
      { status: 500 }
    );
  }
}
