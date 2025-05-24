import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Import database functions with try/catch to handle errors
let checkUserExists, createUser;
try {
  const db = require('@/utils/db');
  checkUserExists = db.checkUserExists;
  createUser = db.createUser;
} catch (error) {
  console.error('Error importing database utilities:', error);
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password, name } = body;
    
    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and name are required' },
        { status: 400 }
      );
    }
    
    // Check if database functions are available
    if (!checkUserExists || !createUser) {
      console.log('Database not configured, using mock signup');
      
      // For development/testing only: mock user creation
      // In production, this should be replaced with actual database operations
      const mockUsers = [
        { id: '1', email: 'user@example.com', password: 'password123', name: 'Test User' }
      ];
      
      // Check if user already exists in mock data
      if (mockUsers.some(u => u.email === email)) {
        return NextResponse.json(
          { success: false, message: 'User with this email already exists' },
          { status: 409 }
        );
      }
      
      // Create mock user
      const newUser = {
        id: Date.now().toString(),
        email,
        name
      };
      
      var createdUser = newUser;
    } else {
      try {
        // Check if user already exists in the database
        const existingUser = await checkUserExists(email);
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: 'User with this email already exists' },
            { status: 409 }
          );
        }
        
        // Create the user in the database
        const newUser = await createUser(email, password, name);
        var createdUser = newUser;
      } catch (dbError) {
        console.error('Database signup error:', dbError);
        
        // Check if we're in mock authentication mode
        if (dbError.message === 'MOCK_AUTH_MODE') {
          console.log('Using mock authentication for signup due to database connection issues');
          
          // Mock user creation
          // Check if the email is already used in our mock system
          if (email === 'user@example.com') {
            return NextResponse.json(
              { success: false, message: 'User with this email already exists' },
              { status: 409 }
            );
          }
          
          // Create a mock user
          var createdUser = {
            id: Date.now().toString(),
            email,
            name
          };
          
          console.log('Created mock user:', createdUser);
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
      message: 'Account created successfully',
      user: createdUser
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
