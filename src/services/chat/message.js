import { AicClientAuth } from '../auth/get-token';
import { AicClientIo } from '../utils/io';
// Services
const aicClientAuth = new AicClientAuth();
const aicClientUtils = new AicClientIo();
// Class
export class AicClientChat {
    constructor() {
        // Consts
        this.clName = 'AicClientChat';
    }
    // Code
    async message(signIn, userProfileId, agentId, chatSessionId, filters, messages) {
        // Debug
        const fnName = `${this.clName}.message()`;
        // Get a token
        const token = await aicClientAuth.getToken(signIn);
        // Define the body JSON for the chat message
        const body = {
            userProfileId: userProfileId,
            projectEnvId: signIn.projectEnvId,
            agentId: agentId,
            chatSessionId: chatSessionId,
            messages: messages,
            filters: filters
        };
        // Try to fetch
        return await aicClientUtils.fetch('/v1/chat/message', body, token, signIn.baseUrl);
    }
}
