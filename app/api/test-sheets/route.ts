/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { sheetsClient } from '@/lib/googleSheets';

export async function GET() {
  try {
    // 환경 변수 상태 확인
    const configStatus = sheetsClient.getConfigurationStatus();
    
    // 기본 상태 정보
    const status: any = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      configuration: configStatus,
      environmentVars: {
        hasSpreadsheetId: !!process.env.GOOGLE_SPREADSHEET_ID,
        spreadsheetIdLength: process.env.GOOGLE_SPREADSHEET_ID?.length || 0,
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
      }
    };

    // 설정이 완료되었으면 연결 테스트
    if (configStatus.isConfigured && process.env.GOOGLE_SPREADSHEET_ID) {
      try {
        // 스프레드시트 헤더 읽기 시도
        const testRange = 'Bookings!A1:J1';
        const headers = await sheetsClient.read(process.env.GOOGLE_SPREADSHEET_ID, testRange);
        
        status.connectionTest = {
          success: true,
          headers: headers[0] || [],
          message: 'Successfully connected to Google Sheets'
        };
      } catch (error) {
        status.connectionTest = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          errorDetails: error instanceof Error ? error.toString() : 'Unknown error',
          message: 'Failed to connect to Google Sheets'
        };
      }
    } else {
      status.connectionTest = {
        success: false,
        message: 'Google Sheets is not configured',
        missingConfig: {
          spreadsheetId: !process.env.GOOGLE_SPREADSHEET_ID,
          clientEmail: !process.env.GOOGLE_CLIENT_EMAIL,
          privateKey: !process.env.GOOGLE_PRIVATE_KEY
        }
      };
    }

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json({
      error: 'Test endpoint error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.toString() : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await request.json();
    
    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      return NextResponse.json({
        error: 'Configuration error',
        message: 'GOOGLE_SPREADSHEET_ID is missing'
      }, { status: 500 });
    }

    // 테스트 데이터 쓰기
    const testData = [
      ['TEST_' + Date.now(), 'Test Name', '010-0000-0000', 'test@example.com', 
       'test', '2025-01-01', '10:00', '1', 'Test message', new Date().toISOString()]
    ];

    await sheetsClient.append(process.env.GOOGLE_SPREADSHEET_ID, 'Bookings!A:J', testData);

    return NextResponse.json({
      success: true,
      message: 'Test data written successfully',
      data: testData[0]
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Write test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.toString() : 'Unknown error'
    }, { status: 500 });
  }
}