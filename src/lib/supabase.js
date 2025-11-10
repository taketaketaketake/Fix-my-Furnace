import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket name for furnace diagnosis images
export const STORAGE_BUCKET = 'Furnace Diagnosis Images'

// Storage bucket name for service contract images
export const CONTRACT_STORAGE_BUCKET = 'contract-images'