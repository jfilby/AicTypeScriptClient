import { AicClientAuth } from '../auth/get-token';
import { AicClientIo } from '../utils/io';
// Services
const aicClientAuth = new AicClientAuth();
const aicClientUtils = new AicClientIo();
// Class
export class AicClientMutateRecords {
    constructor() {
        // Consts
        this.clName = 'AicClientMutateRecords';
    }
    // Code
    async delete(signIn, userProfileId, entityId, where = undefined) {
        // Debug
        const fnName = `${this.clName}.delete()`;
        // Get a token
        const token = await aicClientAuth.getToken(signIn);
        // Define the body JSON for the chat message
        var body = {
            userProfileId: userProfileId,
            projectEnvId: signIn.projectEnvId,
            entityId: entityId
        };
        if (where != null) {
            body.where = JSON.stringify(where);
        }
        // Try to fetch
        return await aicClientUtils.fetch('/v1/records/delete', body, token, signIn.baseUrl);
    }
    async load(signIn, userProfileId, entityId, record) {
        // Debug
        const fnName = `${this.clName}.load()`;
        // Get a token
        const token = await aicClientAuth.getToken(signIn);
        // Define the body JSON for the chat message
        var body = {
            userProfileId: userProfileId,
            projectEnvId: signIn.projectEnvId,
            entityId: entityId,
            record: record
        };
        // Try to fetch
        return await aicClientUtils.fetch('/v1/records/load', body, token, signIn.baseUrl);
    }
    async loadMany(signIn, userProfileId, entityId, records) {
        // Debug
        const fnName = `${this.clName}.loadMany()`;
        // Get a token
        const token = await aicClientAuth.getToken(signIn);
        // Define the body JSON for the chat message
        var body = {
            userProfileId: userProfileId,
            projectEnvId: signIn.projectEnvId,
            entityId: entityId,
            records: records
        };
        // Try to fetch
        return await aicClientUtils.fetch('/v1/records/load-many', body, token, signIn.baseUrl);
    }
}
