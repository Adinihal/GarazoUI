import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const result = await connection.ping();
    connection.release();

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Azure MySQL',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        sqlState: error.sqlState,
      },
      { status: 500 }
    );
  }
}
