import { supabase } from '../../lib/supabase.js';
import crypto from 'crypto';

const VERIFY_TOKEN = import.meta.env.FACEBOOK_VERIFY_TOKEN || 'your-verify-token';
const APP_SECRET = import.meta.env.FACEBOOK_APP_SECRET;

export async function GET({ request }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  // Verify webhook subscription
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Facebook webhook verified');
      return new Response(challenge, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }

  return new Response('Bad Request', { status: 400 });
}

export async function POST({ request }) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // Verify request signature
    if (!verifySignature(body, signature)) {
      console.log('Invalid signature');
      return new Response('Unauthorized', { status: 401 });
    }

    const data = JSON.parse(body);

    // Process lead ads webhooks
    if (data.object === 'page') {
      for (const entry of data.entry) {
        for (const change of entry.changes) {
          if (change.field === 'leadgen') {
            await processLead(change.value);
          }
        }
      }
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

function verifySignature(body, signature) {
  if (!APP_SECRET || !signature) return false;
  
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', APP_SECRET)
    .update(body)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function processLead(leadData) {
  const { leadgen_id, page_id, form_id, adgroup_id, ad_id, campaign_id } = leadData;
  
  try {
    // Fetch lead details from Facebook API
    const leadDetails = await fetchLeadFromFacebook(leadgen_id);
    
    if (leadDetails) {
      // Insert lead into database
      const { error } = await supabase
        .from('leads')
        .insert({
          name: leadDetails.name || '',
          phone: leadDetails.phone || '',
          email: leadDetails.email || '',
          lead_source: 'facebook',
          ad_campaign: campaign_id || '',
          ad_set_keyword: adgroup_id || '',
          form_type: 'contact_form',
          lead_notes: `Facebook Lead ID: ${leadgen_id}, Form ID: ${form_id}`,
          status: 'new'
        });

      if (error) {
        console.error('Database insertion error:', error);
      } else {
        console.log('Lead successfully inserted:', leadgen_id);
      }
    }
  } catch (error) {
    console.error('Error processing lead:', error);
  }
}

async function fetchLeadFromFacebook(leadId) {
  const accessToken = import.meta.env.FACEBOOK_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('Facebook access token not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${leadId}?access_token=${accessToken}`
    );
    
    const leadData = await response.json();
    
    if (leadData.error) {
      console.error('Facebook API error:', leadData.error);
      return null;
    }

    // Parse field data
    const parsedData = {};
    if (leadData.field_data) {
      for (const field of leadData.field_data) {
        switch (field.name) {
          case 'full_name':
          case 'first_name':
          case 'last_name':
            parsedData.name = field.values[0];
            break;
          case 'email':
            parsedData.email = field.values[0];
            break;
          case 'phone_number':
            parsedData.phone = field.values[0];
            break;
        }
      }
    }

    return parsedData;
  } catch (error) {
    console.error('Error fetching lead from Facebook:', error);
    return null;
  }
}