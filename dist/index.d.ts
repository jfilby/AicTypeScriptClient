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
interface SignIn {
    apiKey: string;
    secret: string;
    projectEnvId: string;
    baseUrl?: string | undefined;
}
interface AicEntityFilter {
    entityId: string;
    select?: string[];
    where?: any;
}
declare enum AicIncludeEntities {
    all = "all",
    filtered = "filtered"
}
interface AicFilters {
    includeEntities?: AicIncludeEntities;
    entityFilters: AicEntityFilter[];
}
interface ChatMessage {
    type: string;
    text: string;
}
declare enum FieldDoesntExistOption {
    strict = "strict",
    ignore = "ignore"
}
interface LoadOptions {
    onFieldDoesntExistValues?: FieldDoesntExistOption;
}

declare class AicClientAuth {
    clName: string;
    getToken(signIn: SignIn): Promise<string>;
}

declare class AicClientChat {
    clName: string;
    message(signIn: SignIn, userProfileId: string, agentId: string, chatSessionId: string | null, filters: AicFilters, messages: ChatMessage[]): Promise<any>;
}

declare class AicClientMutateRecords {
    clName: string;
    delete(signIn: SignIn, userProfileId: string, entityId: string, where?: any): Promise<any>;
    load(signIn: SignIn, userProfileId: string, records: any[], options?: LoadOptions | undefined): Promise<any>;
}

declare class AicClientQueryRecords {
    clName: string;
    filter(signIn: SignIn, userProfileId: string, entityId: string, where?: any, // Map of fields to values
    orderBy?: any[] | undefined): Promise<any>;
    getById(signIn: SignIn, userProfileId: string, entityId: string, id: string): Promise<any>;
}

export { AicClientAuth, AicClientChat, AicClientMutateRecords, AicClientQueryRecords, type AicEntityFilter, type AicFilters, AicIncludeEntities, BaseDataTypes, type ChatMessage, FieldDoesntExistOption, type LoadOptions, type SignIn };
