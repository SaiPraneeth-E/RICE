// src/app/api/genkit/[[...path]]/route.ts
import {NextRequest} from 'next/server';
import {createNextHandler} from '@genkit-ai/next';
import '@/ai/dev'; // This imports your flows

export const dynamic = 'force-dynamic'; // Defaults to force-static in App Router

const handler = createNextHandler();

export async function GET(req: NextRequest, props: {params: {path: string[]}}) {
  return handler(req, props);
}

export async function POST(
  req: NextRequest,
  props: {params: {path: string[]}}
) {
  return handler(req, props);
}

export async function PUT(req: NextRequest, props: {params: {path: string[]}}) {
  return handler(req, props);
}

export async function PATCH(
  req: NextRequest,
  props: {params: {path: string[]}}
) {
  return handler(req, props);
}

export async function DELETE(
  req: NextRequest,
  props: {params: {path: string[]}}
) {
  return handler(req, props);
}
