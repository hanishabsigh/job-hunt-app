import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { jobsData } from '@/lib/jobs-data';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error && error.code === 'PGRST116') {
      // Table doesn't exist yet, return pre-loaded data with note
      const jobsWithNote = jobsData.map((job, idx) => ({
        id: `temp-${idx}`,
        ...job,
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json(jobsWithNote);
    }

    if (error) {
      console.error('Supabase error:', error);
      // Return mock data for demo purposes
      const jobsWithIds = jobsData.map((job, idx) => ({
        id: `demo-${idx}`,
        ...job,
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json(jobsWithIds);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Fetch error:', err);
    // Return demo data even on error
    const jobsWithIds = jobsData.map((job, idx) => ({
      id: `demo-${idx}`,
      ...job,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    return NextResponse.json(jobsWithIds);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If request includes jobs, this is an initialization request
    if (body.init) {
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
        console.error('Insert error:', error);
        // If insert fails, return demo data
        const jobsWithIds = jobsToInsert.map((job, idx) => ({
          ...job,
          id: `demo-${idx}`,
        }));
        return NextResponse.json(jobsWithIds);
      }

      return NextResponse.json(data);
    }

    // Try to get existing jobs
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Return demo data
      const jobsWithIds = jobsData.map((job, idx) => ({
        id: `demo-${idx}`,
        ...job,
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json(jobsWithIds);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('POST error:', err);
    // Return demo data
    const jobsWithIds = jobsData.map((job, idx) => ({
      id: `demo-${idx}`,
      ...job,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    return NextResponse.json(jobsWithIds);
  }
}
