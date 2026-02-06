const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('=== Supabase Config ===');
console.log('URL:', supabaseUrl);
console.log('ANON Key:', supabaseAnonKey ? 'SET' : 'NOT SET');
console.log('Service Role Key:', supabaseServiceKey ? 'SET' : 'NOT SET');
console.log('');

async function testClient(client, name) {
  console.log(`Testing ${name}...`);

  const tables = ['posts', 'projects', 'researches', 'page_views'];

  for (const table of tables) {
    try {
      const { data, error } = await client.from(table).select('*').limit(1);
      if (error) {
        console.error(`  ❌ Table '${table}':`, error.message);
      } else {
        console.log(`  ✅ Table '${table}' exists`);
      }
    } catch (e) {
      console.error(`  ❌ Table '${table}':`, e.message);
    }
  }
}

async function run() {
  // Test with ANON key (public access)
  console.log('=== Testing with ANON key ===');
  const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
  await testClient(supabaseAnon, 'ANON Client');

  // Test with SERVICE_ROLE key (admin access)
  if (supabaseServiceKey) {
    console.log('\n=== Testing with SERVICE ROLE key ===');
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
    await testClient(supabaseService, 'Service Role Client');
  }
}

run().catch(console.error);
