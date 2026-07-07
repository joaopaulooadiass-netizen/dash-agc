import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Cliente com service_role — só para uso server-side (API routes, cron job).
// Nunca expor ao navegador: bypassa RLS.
//
// Inicialização PREGUIÇOSA: as envs só são validadas no primeiro uso real,
// não na importação — senão o `next build` quebra ao coletar as rotas em
// ambientes sem Supabase configurado (o app funciona sem ele; o cache do
// Meta apenas fica desativado e os callers degradam sozinhos).
let client: SupabaseClient | null = null

export function supabaseConfigurado(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function getClient(): SupabaseClient {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL não definido')
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY não definido')
  client = createClient(url, key, { auth: { persistSession: false } })
  return client
}

export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = getClient()
    const value = Reflect.get(real, prop)
    return typeof value === 'function' ? value.bind(real) : value
  },
})
