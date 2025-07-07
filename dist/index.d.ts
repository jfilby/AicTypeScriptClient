interface SignIn {
    apiKey: string;
    secret: string;
    projectEnvId: string;
    baseUrl?: string | undefined;
}
interface AicFilter {
    entity: string;
    where: any;
}
interface ChatMessage {
    type: string;
    text: string;
}
declare class BaseDataTypes {
    static activeStatus: string;
    static deletePendingStatus: string;
    static deletedStatus: string;
    static inactiveStatus: string;
    static inProgressStatus: string;
    static newStatus: string;
    static userSelectableStatuses: {
        value: string;
        name: string;
    }[];
    static userSelectableStatusesMap: Record<string, string>;
}

declare class AicClientAuth {
    clName: string;
    getToken(signIn: SignIn): Promise<any>;
}

declare class AicClientChat {
    clName: string;
    message(signIn: SignIn, userProfileId: string, agentId: string, chatSessionId: string | null, filters: AicFilter[], messages: ChatMessage[]): Promise<any>;
}

declare class AicClientMutateRecords {
    clName: string;
    delete(signIn: SignIn, userProfileId: string, entityId: string, where?: any): Promise<any>;
    load(signIn: SignIn, userProfileId: string, entityId: string, record: any): Promise<any>;
    loadMany(signIn: SignIn, userProfileId: string, entityId: string, records: any[]): Promise<any>;
}

declare class AicClientQueryRecords {
    clName: string;
    filter(signIn: SignIn, userProfileId: string, entityId: string, where?: any, // Map of fields to values
    orderBy?: any[] | undefined): Promise<any>;
    getById(signIn: SignIn, userProfileId: string, entityId: string, id: string): Promise<any>;
}

export { AicClientAuth, AicClientChat, AicClientMutateRecords, AicClientQueryRecords, type AicFilter, BaseDataTypes, type ChatMessage, type SignIn };
