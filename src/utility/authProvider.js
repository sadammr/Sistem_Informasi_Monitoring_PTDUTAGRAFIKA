import { supabaseClient } from './supabaseClient'

const authProvider = {
  login: async ({ email, password }) => {
    // sign in with oauth
    try {
      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          success: false,
          error,
        }
      }

      if (data?.user) {
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
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      return {
        success: false,
        error,
      }
    }

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
      const { data } = await supabaseClient.auth.getSession()
      const { session } = data

      if (!session) {
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
    const user = await supabaseClient.auth.getUser()

    if (user) {
      return user.data.user?.role
    }

    return null
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser()

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      }
    }

    return null
  },
}

export { authProvider }
