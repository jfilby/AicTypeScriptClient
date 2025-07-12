import { AicFilters, ChatMessage, SignIn } from '@/types/data-types'
import { AicClientAuth } from '../auth/get-token'
import { AicClientIo } from '../utils/io'

// Services
const aicClientAuth = new AicClientAuth()
const aicClientUtils = new AicClientIo()

// Class
export class AicClientBatchChat {

  // Consts
  clName = 'AicClientBatchChat'

  // Code
  async batchMessage(
          signIn: SignIn,
          userProfileId: string,
          agentId: string,
          chatSessionId: string | null,
          filters: AicFilters,
          messages: ChatMessage[]) {

    // Debug
    const fnName = `${this.clName}.batchMessage()`

    // Get a token
    const token = await aicClientAuth.getToken(signIn)

    // Define the body JSON for the chat message
    const body = {
      userProfileId: userProfileId,
      projectEnvId: signIn.projectEnvId,
      agentId: agentId,
      chatSessionId: chatSessionId,
      filters: filters,
      messages: messages
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   '/v1/chat/batch-message',
                   body,
                   token,
                   signIn.baseUrl)
  }

  async getBatchMessage(
          signIn: SignIn,
          userProfileId: string,
          batchJobId: string) {

    // Debug
    const fnName = `${this.clName}.getBatchMessage()`

    // Get a token
    const token = await aicClientAuth.getToken(signIn)

    // Define the body JSON for the chat message
    const body = {
      userProfileId: userProfileId
    }

    // Try to fetch
    return await aicClientUtils.fetch(
                   `/v1/chat/batch-message/${batchJobId}`,
                   body,
                   token,
                   signIn.baseUrl)
  }
}
