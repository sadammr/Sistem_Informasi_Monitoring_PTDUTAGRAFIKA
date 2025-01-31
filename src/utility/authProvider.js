import { supabaseClient } from './supabaseClient'

const authProvider = {
  login: async ({ email, password }) => {
    // sign in with oauth
    try {
      const { data, error } = await supabaseClient
        .from('pengguna')
        .select()
        .eq('email', email)
        .eq('user_password', password)

      if (error) {
        return {
          success: false,
          error,
        }
      }

      if (data?.at(0)) {
        localStorage.setItem('user_id', data?.at(0)?.user_id)

        return {
          success: true,
          redirectTo: '/',
        }
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }

    return {
      success: false,
      error: {
        message: 'Login failed',
        name: 'Invalid email or password',
      },
    }
  },
  logout: async () => {
    localStorage.removeItem('user_id')

    return {
      success: true,
      redirectTo: '/',
    }
  },
  onError: async (error) => {
    console.error(error)

    return { error }
  },
  check: async () => {
    try {
      const id = localStorage.getItem('user_id')

      if (!id) {
        return {
          authenticated: false,
          error: {
            message: 'Check failed',
            name: 'Session not found',
          },
          logout: true,
          redirectTo: '/login',
        }
      }
    } catch (error) {
      return {
        authenticated: false,
        error: error || {
          message: 'Check failed',
          name: 'Not authenticated',
        },
        logout: true,
        redirectTo: '/login',
      }
    }

    return {
      authenticated: true,
    }
  },
  getPermissions: async () => {
    //
  },
  getIdentity: async () => {
    const id = localStorage.getItem('user_id')
    const { data } = await supabaseClient
      .from('pengguna')
      .select()
      .eq('user_id', id)

    if (data?.at?.(0)) {
      return {
        ...data.at?.(0),
        name: `${data.at?.(0)?.user_nama} - ${data.at?.(0)?.email}`,
      }
    }

    return null
  },
}

export { authProvider }
