import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch bookings',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        name: body.name,
        phone: body.phone,
        email: body.email,
        program: body.program,
        date: body.date,
        time: body.time,
        participants: body.participants,
        message: body.message || ''
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('New booking created:', data);
    return NextResponse.json({ success: true, booking: data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create booking',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}