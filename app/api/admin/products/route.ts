import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const products = await request.json();
    
    // Correct path for public folder
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    // Make sure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}