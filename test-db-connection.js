#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests Supabase connection and basic queries
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');

// Load environment variables
config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

async function testDatabaseConnection() {
  console.log('🔧 Testing Database Connection...\n');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing required Supabase environment variables');
    console.log('Required: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  // Test anon key connection
  console.log('📊 Testing Anon Key Connection...');
  const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test basic query
    const { data, error } = await supabaseAnon
      .from('form_submissions')
      .select('count')
      .limit(1);

    if (error) {
      console.log('⚠️  Anon connection error:', error.message);
    } else {
      console.log('✅ Anon connection successful');
    }
  } catch (err) {
    console.log('❌ Anon connection failed:', err.message);
  }

  // Test service role connection if available
  if (supabaseServiceRole) {
    console.log('\n🔐 Testing Service Role Connection...');
    const supabaseService = createClient(supabaseUrl, supabaseServiceRole);

    try {
      const { data, error } = await supabaseService
        .from('form_submissions')
        .select('count')
        .limit(1);

      if (error) {
        console.log('⚠️  Service role error:', error.message);
      } else {
        console.log('✅ Service role connection successful');
      }
    } catch (err) {
      console.log('❌ Service role connection failed:', err.message);
    }
  }

  // Test table access
  console.log('\n📋 Testing Table Access...');

  const tables = [
    'form_submissions',
    'service_contracts', 
    'providers',
    'pricing_insights'
  ];

  const testClient = supabaseServiceRole ? createClient(supabaseUrl, supabaseServiceRole) : supabaseAnon;
  console.log(`Using ${supabaseServiceRole ? 'service role' : 'anon'} key for table queries\n`);

  for (const table of tables) {
    try {
      const { data, error, count } = await testClient
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${count || 0} records`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }

  // Get actual form_submissions data
  console.log('\n📄 Recent form_submissions data:');
  try {
    const { data, error } = await testClient
      .from('form_submissions')
      .select('id, full_name, phone_number, created_at, form_source')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.log(`❌ Error fetching form_submissions: ${error.message}`);
    } else if (data && data.length > 0) {
      data.forEach((record, index) => {
        console.log(`${index + 1}. ${record.full_name} - ${record.phone_number} (${record.form_source})`);
      });
    } else {
      console.log('No records found in form_submissions table');
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }

  console.log('\n🏁 Database connection test completed');
}

// Run the test
testDatabaseConnection().catch(console.error);