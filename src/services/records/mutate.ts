import { LoadOptions, SignIn } from '@/types/data-types'
import { AicClientAuth } from '../auth/get-token'
import { AicClientIo } from '../utils/io'

// Services
const aicClientAuth = new AicClientAuth()
const aicClientUtils = new AicClientIo()

// Class
export class AicClientMutateRecords {

  // Consts
  clName = 'AicClientMutateRecords'

  // Code
  async delete(
          signIn: SignIn,
          userProfileId: string,
          entityId: string,
          where: any = undefined) {

    // Debug
    const fnName = `${this.clName}.delete()`

    // Get a token
    const token = await aicClientAuth.getToken(signIn)

    // Define the body JSON for the chat message
    var body: any = {
      userProfileId: userProfileId,
      projectEnvId: signIn.projectEnvId,
      entityId: entityId
    }

    if (where != null) {
      body.where = JSON.stringify(where)
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   '/v1/records/delete',
                   body,
                   token,
                   signIn.baseUrl)
  }

  async load(
          signIn: SignIn,
          userProfileId: string,
          records: any[],
          options: LoadOptions | undefined = undefined) {

    // Debug
    const fnName = `${this.clName}.load()`

    // Get a token
    const token = await aicClientAuth.getToken(signIn)

    // Define the body JSON for the chat message
    var body: any = {
      userProfileId: userProfileId,
      projectEnvId: signIn.projectEnvId,
      records: records,
      options: options
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   '/v1/records/load',
                   body,
                   token,
                   signIn.baseUrl)
  }
}
