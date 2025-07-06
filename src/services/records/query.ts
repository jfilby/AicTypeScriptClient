import { SignIn } from '@/types/data-types'
import { AicClientAuth } from '../auth/get-token'
import { AicClientIo } from '../utils/io'

// Services
const aicClientAuth = new AicClientAuth()
const aicClientUtils = new AicClientIo()

// Class
export class AicClientQueryRecords {

  // Consts
  clName = 'AicClientQueryRecords'

  // Code
  async filter(
          signIn: SignIn,
          userProfileId: string,
          entityId: string,
          where: any = undefined,                    // Map of fields to values
          orderBy: any[] | undefined = undefined) {  // Array of fields to asc/desc

    // Debug
    const fnName = `${this.clName}.filter()`

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

    if (orderBy != null) {
      body.orderBy = JSON.stringify(orderBy)
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   '/v1/records/filter',
                   body,
                   token,
                   signIn.baseUrl)
  }

  async getById(
          signIn: SignIn,
          userProfileId: string,
          entityId: string,
          id: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get a token
    const token = await aicClientAuth.getToken(signIn)

    // Define the body JSON for the chat message
    var body: any = {
      userProfileId: userProfileId,
      projectEnvId: signIn.projectEnvId,
      entityId: entityId,
      id: id
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   '/v1/records/get-by-id',
                   body,
                   token,
                   signIn.baseUrl)
  }
}
