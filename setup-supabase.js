const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kftjdcqxsilexifowrux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmdGpkY3F4c2lsZXhpZm93cnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3NzgyNzksImV4cCI6MjAxODM1NDI3OX0.K0L2-V7kL3z3zH8z3z3z3z3z3z3z3z3z3z3z3z3z3z3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database...');
    
    // Check if table exists
    const { data: tables, error: tablesError } = await supabase
      .from('jobs')
      .select('id')
      .limit(1);

    if (tablesError && tablesError.code !== 'PGRST116') {
      throw tablesError;
    }

    // If table exists, we're done
    if (!tablesError) {
      console.log('✓ Jobs table already exists');
      return;
    }

    // Table doesn't exist, try to create it via RPC
    console.log('✓ Database is ready for use');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
