import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.json');

export async function POST(request: NextRequest) {
  try {
    const products = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}