import { supabaseClient } from './supabaseClient'

const stafGudangAccess = ['home', 'stok', 'bahan_masuk']
const timAdministrasiAccess = ['home', 'bahan_baku', 'bahan_keluar']

export const canAccessControlProvider = async ({ resource }) => {
  const id = localStorage.getItem('user_id')

  const { data } = await supabaseClient
    .from('pengguna')
    .select()
    .eq('user_id', id)

  const level = data?.at?.(0)?.level

  switch (level) {
    case 'tim-administrasi': {
      const result = timAdministrasiAccess.includes(resource)

      if (result) {
        return {
          can: true,
        }
      }

      return {
        can: false,
      }
    }

    case 'tim-produksi': {
      return {
        can: true,
      }
    }

    case 'staf-gudang': {
      const result = stafGudangAccess.includes(resource)

      if (result) {
        return {
          can: true,
        }
      }

      return {
        can: false,
      }
    }

    default: {
      return { can: true }
    }
  }
}
