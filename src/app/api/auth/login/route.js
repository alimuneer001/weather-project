import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Import database functions with try/catch to handle errors
let validateUser;
try {
  const db = require('@/utils/db');
  validateUser = db.validateUser;
} catch (error) {
  console.error('Error importing database utilities:', error);
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Check if database functions are available
    if (!validateUser) {
      console.log('Database not configured, using mock authentication');
      
      // For development/testing only: mock authentication
      // In production, this should be replaced with actual database validation
      const mockUsers = [
        { id: '1', email: 'user@example.com', password: 'password123', name: 'Test User' }
      ];
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'Invalid email or password' },
          { status: 401 }
        );
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      var authenticatedUser = userWithoutPassword;
    } else {
      // Validate user credentials against the database
      try {
        const user = await validateUser(email, password);
        
        if (!user) {
          return NextResponse.json(
            { success: false, message: 'Invalid email or password' },
            { status: 401 }
          );
        }
        
        var authenticatedUser = user;
      } catch (dbError) {
        console.error('Database authentication error:', dbError);
        
        // Check if we're in mock authentication mode
        if (dbError.message === 'MOCK_AUTH_MODE') {
          console.log('Using mock authentication due to database connection issues');
          // Fall back to mock authentication
          if (!validateUser) {
            // We need to fall back to mock auth mode
            if (email === 'user@example.com' && password === 'password123') {
              var authenticatedUser = {
                id: '1',
                email: 'user@example.com',
                name: 'Test User'
              };
            } else {
              return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
              );
            }
          }
        } else {
          return NextResponse.json(
            { success: false, message: 'Database error: ' + dbError.message },
            { status: 500 }
          );
        }
      }
    }
    
    // Set authentication cookie
    const cookieStore = cookies();
    await cookieStore.set('auth', 'true', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });
    
    // Return user data (excluding sensitive information)
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: authenticatedUser
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
