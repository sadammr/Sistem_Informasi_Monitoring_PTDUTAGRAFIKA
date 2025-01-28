import { createClient } from '@refinedev/supabase'

const SUPABASE_URL = 'https://ymialvjqvigtyzpfmcnm.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaWFsdmpxdmlndHl6cGZtY25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzUwNjksImV4cCI6MjA1MzY1MTA2OX0.S_hdiba-Q5SH-laV6T3qu_h1XHufNDP6PXwMl7ncIYA'

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
  },
})
