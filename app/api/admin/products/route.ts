import { NextRequest, NextResponse } from "next/server";

let products: any[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const newProducts = await request.json();
  products = newProducts;
  return NextResponse.json({ success: true });
}