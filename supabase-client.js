require('dotenv').config();  // Load environment variables from .env

const { createClient } = require('@supabase/supabase-js');

// Access the environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not set');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
