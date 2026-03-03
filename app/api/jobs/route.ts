import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { jobsData } from '@/lib/jobs-data';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize jobs if empty
    const { data: existing } = await supabase
      .from('jobs')
      .select('id')
      .limit(1);

    if (!existing || existing.length === 0) {
      const jobsToInsert = jobsData.map((job) => ({
        ...job,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobsToInsert)
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
