import { NextRequest, NextResponse } from 'next/server';

// Store proofs temporarily (in production, use a database)
let latestProofs: unknown = null;

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 RECLAIM CALLBACK RECEIVED');
    
    const body = await request.json();
    console.log('📊 Callback data:', JSON.stringify(body, null, 2));

    // Store the proofs so the frontend can retrieve them
    latestProofs = body;

    // Acknowledge the callback
    return NextResponse.json({ 
      success: true, 
      message: 'Callback received and stored successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ RECLAIM CALLBACK ERROR:', error);
    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (latestProofs) {
    const proofs = latestProofs;
    latestProofs = null; // Clear after retrieval
    console.log('📤 Returning stored proofs to frontend');
    return NextResponse.json({ 
      success: true,
      proofs,
      timestamp: new Date().toISOString() 
    });
  } else {
    return NextResponse.json({ 
      success: false,
      message: 'No proofs available yet',
      status: 'waiting'
    });
  }
}
