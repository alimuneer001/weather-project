import { NextResponse } from 'next/server';
import { initDatabase } from '@/utils/db';

// API route to initialize the database
export async function GET() {
  try {
    const success = await initDatabase();
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Database initialized successfully' 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to initialize database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in database initialization route:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
