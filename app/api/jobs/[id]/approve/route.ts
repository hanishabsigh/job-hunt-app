import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import axios from 'axios';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Update job status to approved
    const { data, error } = await supabase
      .from('jobs')
      .update({
        status: 'approved',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const job = data?.[0];
    if (job) {
      // Send Discord notification
      const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (discordWebhookUrl) {
        try {
          await axios.post(discordWebhookUrl, {
            embeds: [
              {
                title: '✅ Job Application Approved',
                color: 0x00ff00,
                fields: [
                  { name: 'Company', value: job.company, inline: true },
                  { name: 'Role', value: job.role, inline: true },
                  { name: 'Salary', value: job.salary, inline: true },
                  { name: 'Status', value: 'Approved for Submission', inline: false },
                  { name: 'URL', value: `[Apply Here](${job.url})`, inline: false },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          });
        } catch (discordErr) {
          console.error('Discord notification failed:', discordErr);
          // Don't fail the request if Discord fails
        }
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
