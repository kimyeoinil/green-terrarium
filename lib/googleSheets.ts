/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';

export class GoogleSheets {
  private sheets: any;
  private auth: any;
  private isConfigured: boolean;

  constructor() {
    // 환경 변수 검증
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('Missing Google Sheets configuration:', {
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
        hasSpreadsheetId: !!spreadsheetId
      });
      this.isConfigured = false;
      return;
    }

    try {
      // Vercel 환경에서 Private Key 처리
      let processedPrivateKey = privateKey;
      
      // Base64로 인코딩된 경우 디코딩
      if (process.env.GOOGLE_PRIVATE_KEY_BASE64 === 'true') {
        try {
          processedPrivateKey = Buffer.from(privateKey, 'base64').toString('utf-8');
          console.log('Decoded private key from Base64');
        } catch (e) {
          console.error('Failed to decode Base64 private key:', e);
        }
      } else {
        // Private Key 처리 로직 개선
        // 1. 이미 정상적인 줄바꿈이 있는 경우
        if (privateKey.includes('\n') && !privateKey.includes('\\n')) {
          // 그대로 사용
          processedPrivateKey = privateKey;
        }
        // 2. 이스케이프된 줄바꿈이 있는 경우
        else if (privateKey.includes('\\n')) {
          processedPrivateKey = privateKey.replace(/\\n/g, '\n');
        }
        // 3. 줄바꿈이 전혀 없는 경우 (한 줄로 된 경우)
        else {
          // BEGIN과 END 태그가 없는 경우 추가
          if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
            processedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
          } else {
            processedPrivateKey = privateKey;
          }
          
          // 줄바꿈 추가
          processedPrivateKey = processedPrivateKey
            .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\n')
            .replace(/-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----')
            .replace(/(.{64})/g, '$1\n') // 64자마다 줄바꿈 추가
            .replace(/\n\n+/g, '\n') // 중복 줄바꿈 제거
            .trim();
        }
      }
      
      console.log('Initializing Google Sheets with:', {
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
        privateKeyLength: privateKey.length,
        privateKeyStart: privateKey.substring(0, 50) + '...',
        hasNewlines: privateKey.includes('\n'),
        hasEscapedNewlines: privateKey.includes('\\n'),
        hasBeginTag: privateKey.includes('-----BEGIN PRIVATE KEY-----'),
        hasEndTag: privateKey.includes('-----END PRIVATE KEY-----'),
        processedKeyStart: processedPrivateKey.substring(0, 100) + '...',
        processedKeyLength: processedPrivateKey.length
      });

      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: processedPrivateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      this.isConfigured = true;
      console.log('Google Sheets initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      this.isConfigured = false;
    }
  }

  checkConfiguration() {
    if (!this.isConfigured) {
      throw new Error('Google Sheets is not properly configured. Please check environment variables.');
    }
  }

  async read(spreadsheetId: string, range: string) {
    this.checkConfiguration();
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      throw error;
    }
  }

  async write(spreadsheetId: string, range: string, values: any[][]) {
    this.checkConfiguration();
    try {
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      throw error;
    }
  }

  async append(spreadsheetId: string, range: string, values: any[][]) {
    this.checkConfiguration();
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error appending to Google Sheets:', error);
      throw error;
    }
  }

  async clear(spreadsheetId: string, range: string) {
    this.checkConfiguration();
    try {
      const response = await this.sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
      });
      return response.data;
    } catch (error) {
      console.error('Error clearing Google Sheets:', error);
      throw error;
    }
  }

  getConfigurationStatus() {
    return {
      isConfigured: this.isConfigured,
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasSpreadsheetId: !!process.env.GOOGLE_SPREADSHEET_ID,
    };
  }
}

export const sheetsClient = new GoogleSheets();