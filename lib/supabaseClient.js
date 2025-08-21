// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key Supabase Anda
const supabaseUrl = 'https://vipymadgirqtasaqvnpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHltYWRnaXJxdGFzYXF2bnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDA2NTUsImV4cCI6MjA3MTI3NjY1NX0.NFdHtPAinU7kjztZ8_6zrJT2lm5YIVi3tFPm5KdEKHk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);