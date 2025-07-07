export class AicClientIo {
    constructor() {
        // Consts
        this.clName = 'AicClientIo';
    }
    // Code
    async fetch(path, bodyJson, token = undefined, baseUrl = undefined) {
        // Debug
        const fnName = `${this.clName}.fetch()`;
        // Header
        var headers = {
            'Content-Type': 'application/json',
        };
        if (token != null) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        // Determine URL
        const aicServer = baseUrl == null ? 'api.aiconstrux.com' : baseUrl;
        const serverPath = `${aicServer}${path}`;
        // Debug
        // console.log(`${fnName}: sending POST request to: ` + serverPath)
        // console.log(`${fnName}: body: ` + JSON.stringify(bodyJson))
        // Fetch
        try {
            const response = await fetch(serverPath, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bodyJson)
            });
            if (response.ok) {
                return await response.json();
            }
            else {
                console.error(`${fnName}: status: ${response.status}: ` +
                    `${response.statusText}`);
                const errorData = await response.json();
                console.error(`${fnName}: errorData: ` + JSON.stringify(errorData));
                throw new Error(`${fnName}: error: ${response.status} ` +
                    `${response.statusText}`);
            }
        }
        catch (error) {
            console.error(`${fnName}: error calling local API:`, error);
        }
    }
}
