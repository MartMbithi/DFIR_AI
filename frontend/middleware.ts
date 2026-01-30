import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {
  // Do NOT attempt auth with localStorage-based tokens
  return NextResponse.next();
}
