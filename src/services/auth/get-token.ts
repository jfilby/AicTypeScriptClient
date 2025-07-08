import NodeCache from 'node-cache'
import { SignIn } from '@/types/data-types'
import { CustomError } from '@/types/errors'
import { AicClientIo } from '../utils/io'

// Services
const aicClientUtils = new AicClientIo()

// Token cache
const tokenCache = new NodeCache({ stdTTL: 60 * 55 })   // ttl: 55m (5m before the 1h expiration)
const tokenCacheKey = 't'

// Class
export class AicClientAuth {

  // Consts
  clName = 'AicClientAuth'

  // Code
  async getToken(signIn: SignIn): Promise<string> {

    // Debug
    const fnName = `${this.clName}.getToken()`

    // Is there a cached token?
    if (tokenCache.has(tokenCacheKey)) {

      const token = tokenCache.get(tokenCacheKey)

      if (typeof token === 'string') {
        return token
      }
    }

    // Body
    const body = {
      key: signIn.apiKey,
      secret: signIn.secret,
      projectEnvId: signIn.projectEnvId
    }

    // Debug
    // console.log(`${fnName}: body: ` + JSON.stringify(body))

    // Try to fetch
    const results = await
            aicClientUtils.fetch(
              '/v1/auth/get-token',
              body,
              undefined,
              signIn.baseUrl)

    // Get token
    const token = results.token

    // Validate
    if (token == null) {
      throw new CustomError(`${fnName}: no token returned`)
    }

    // Debug
    // console.log(`${fnName}: token: ${token}`)

    // Cache the token
    tokenCache.set(
      tokenCacheKey,
      token)

    // Return
    return token
  }
}
