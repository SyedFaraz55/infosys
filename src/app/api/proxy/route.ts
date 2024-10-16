import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.apis.guru/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get('provider');

  let url: string;
  if (provider) {
    url = `${BASE_URL}/${provider}.json`;
  } else {
    url = `${BASE_URL}/providers.json`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}