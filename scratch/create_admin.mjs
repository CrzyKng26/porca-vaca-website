import { createClient } from '@supabase/supabase-js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@porcanvaca.com',
    password: 'PorcaAdmin2026!',
    email_confirm: true
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('Admin user already exists!');
    } else {
      console.error('Error creating user:', error.message);
    }
  } else {
    console.log('Admin user created successfully:', data.user.id);
  }
}

createAdmin();
