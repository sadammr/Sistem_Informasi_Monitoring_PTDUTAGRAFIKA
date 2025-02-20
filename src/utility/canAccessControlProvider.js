/* eslint-disable no-unused-vars */

import { supabaseClient } from './supabaseClient'

export const canAccessControlProvider = async ({ _, action }) => {
  const id = localStorage.getItem('user_id')

  const { data } = await supabaseClient
    .from('pengguna')
    .select()
    .eq('user_id', id)

  const level = data?.at?.(0)?.level

  switch (level) {
    case 'tim-administrasi': {
      if (action === 'list') {
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
      return {
        can: true,
      }
    }

    default: {
      return { can: true }
    }
  }
}
