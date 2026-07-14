import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
  console.warn('Supabase URL is missing. Please add it to your .env file.');
}
if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
  console.warn('Supabase Anon Key is missing. Please add it to your .env file.');
}

const finalUrl = (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL_HERE') 
  ? 'https://placeholder-url.supabase.co' 
  : supabaseUrl;

const finalKey = (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_HERE')
  ? 'placeholder-key'
  : supabaseAnonKey;

export const supabase = createClient(finalUrl, finalKey);
