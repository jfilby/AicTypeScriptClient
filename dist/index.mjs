// src/services/auth/get-token.ts
import NodeCache from "node-cache";

// src/types/errors.ts
var CustomError = class _CustomError extends Error {
  constructor(message) {
    var _a;
    super(message);
    this.name = "CustomError";
    this.name = "CustomError";
    (_a = Error.captureStackTrace) == null ? void 0 : _a.call(Error, this, _CustomError);
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack
    };
  }
};

// src/services/utils/io.ts
var AicClientIo = class {
  constructor() {
    // Consts
    this.clName = "AicClientIo";
  }
  // Code
  async fetch(path, bodyJson, token = void 0, baseUrl = void 0) {
    const fnName = `${this.clName}.fetch()`;
    var headers = {
      "Content-Type": "application/json"
    };
    if (token != null) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const aicServer = baseUrl == null ? "https://api.aiconstrux.com" : baseUrl;
    const serverPath = `${aicServer}${path}`;
    try {
      const response = await fetch(
        serverPath,
        {
          method: "POST",
          headers,
          body: JSON.stringify(bodyJson)
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`${fnName}: status: ${response.status}: ${response.statusText}`);
        const errorData = await response.json();
        console.error(`${fnName}: errorData: ` + JSON.stringify(errorData));
        throw new Error(`${fnName}: error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`${fnName}: error calling local API:`, error);
    }
  }
};

// src/services/auth/get-token.ts
var aicClientUtils = new AicClientIo();
var tokenCache = new NodeCache({ stdTTL: 60 * 55 });
var tokenCacheKey = "t";
var AicClientAuth = class {
  constructor() {
    // Consts
    this.clName = "AicClientAuth";
  }
  // Code
  async getToken(signIn) {
    const fnName = `${this.clName}.getToken()`;
    if (tokenCache.has(tokenCacheKey)) {
      const token2 = tokenCache.get(tokenCacheKey);
      if (typeof token2 === "string") {
        return token2;
      }
    }
    const body = {
      key: signIn.apiKey,
      secret: signIn.secret,
      projectEnvId: signIn.projectEnvId
    };
    const results = await aicClientUtils.fetch(
      "/v1/auth/get-token",
      body,
      void 0,
      signIn.baseUrl
    );
    const token = results.token;
    if (token == null) {
      throw new CustomError(`${fnName}: no token returned`);
    }
    tokenCache.set(
      tokenCacheKey,
      token
    );
    return token;
  }
};

// src/services/chat/batch-message.ts
var aicClientAuth = new AicClientAuth();
var aicClientUtils2 = new AicClientIo();
var AicClientBatchChat = class {
  constructor() {
    // Consts
    this.clName = "AicClientBatchChat";
  }
  // Code
  async batchMessage(signIn, userProfileId, agentId, chatSessionId, filters, messages) {
    const fnName = `${this.clName}.batchMessage()`;
    const token = await aicClientAuth.getToken(signIn);
    const body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      agentId,
      chatSessionId,
      filters,
      messages
    };
    return await aicClientUtils2.fetch(
      "/v1/chat/batch-message",
      body,
      token,
      signIn.baseUrl
    );
  }
  async getBatchMessage(signIn, userProfileId, batchJobId) {
    const fnName = `${this.clName}.getBatchMessage()`;
    const token = await aicClientAuth.getToken(signIn);
    const body = {
      userProfileId
    };
    return await aicClientUtils2.fetch(
      `/v1/chat/batch-message/${batchJobId}`,
      body,
      token,
      signIn.baseUrl
    );
  }
};

// src/services/chat/message.ts
var aicClientAuth2 = new AicClientAuth();
var aicClientUtils3 = new AicClientIo();
var AicClientChat = class {
  constructor() {
    // Consts
    this.clName = "AicClientChat";
  }
  // Code
  async message(signIn, userProfileId, agentId, chatSessionId, filters, messages) {
    const fnName = `${this.clName}.message()`;
    const token = await aicClientAuth2.getToken(signIn);
    const body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      agentId,
      chatSessionId,
      filters,
      messages
    };
    return await aicClientUtils3.fetch(
      "/v1/chat/message",
      body,
      token,
      signIn.baseUrl
    );
  }
};

// src/services/records/mutate.ts
var aicClientAuth3 = new AicClientAuth();
var aicClientUtils4 = new AicClientIo();
var AicClientMutateRecords = class {
  constructor() {
    // Consts
    this.clName = "AicClientMutateRecords";
  }
  // Code
  async delete(signIn, userProfileId, entityId, where = void 0) {
    const fnName = `${this.clName}.delete()`;
    const token = await aicClientAuth3.getToken(signIn);
    var body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      entityId
    };
    if (where != null) {
      body.where = JSON.stringify(where);
    }
    return await aicClientUtils4.fetch(
      "/v1/records/delete",
      body,
      token,
      signIn.baseUrl
    );
  }
  async load(signIn, userProfileId, records, options = void 0) {
    const fnName = `${this.clName}.load()`;
    const token = await aicClientAuth3.getToken(signIn);
    var body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      records,
      options
    };
    return await aicClientUtils4.fetch(
      "/v1/records/load",
      body,
      token,
      signIn.baseUrl
    );
  }
};

// src/services/records/query.ts
var aicClientAuth4 = new AicClientAuth();
var aicClientUtils5 = new AicClientIo();
var AicClientQueryRecords = class {
  constructor() {
    // Consts
    this.clName = "AicClientQueryRecords";
  }
  // Code
  async filter(signIn, userProfileId, entityId, where = void 0, orderBy = void 0) {
    const fnName = `${this.clName}.filter()`;
    const token = await aicClientAuth4.getToken(signIn);
    var body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      entityId
    };
    if (where != null) {
      body.where = JSON.stringify(where);
    }
    if (orderBy != null) {
      body.orderBy = JSON.stringify(orderBy);
    }
    return await aicClientUtils5.fetch(
      "/v1/records/filter",
      body,
      token,
      signIn.baseUrl
    );
  }
  async getById(signIn, userProfileId, entityId, id) {
    const fnName = `${this.clName}.getById()`;
    const token = await aicClientAuth4.getToken(signIn);
    var body = {
      userProfileId,
      projectEnvId: signIn.projectEnvId,
      entityId,
      id
    };
    return await aicClientUtils5.fetch(
      "/v1/records/get-by-id",
      body,
      token,
      signIn.baseUrl
    );
  }
};

// src/types/data-types.ts
var BaseDataTypes = class {
};
// Statuses
BaseDataTypes.activeStatus = "A";
BaseDataTypes.deletePendingStatus = "P";
BaseDataTypes.deletedStatus = "D";
BaseDataTypes.inactiveStatus = "C";
BaseDataTypes.inProgressStatus = "I";
BaseDataTypes.newStatus = "N";
BaseDataTypes.userSelectableStatuses = [
  {
    value: "A",
    name: "Active"
  },
  {
    value: "D",
    name: "Deleted"
  },
  {
    value: "C",
    name: "Inactive"
  },
  {
    value: "N",
    name: "New"
  },
  {
    value: "P",
    name: "Delete pending"
  }
];
BaseDataTypes.userSelectableStatusesMap = {
  "A": "Active",
  "C": "Inactive",
  "D": "Deleted",
  "N": "New",
  "P": "Delete pending"
};
var AicIncludeEntities = /* @__PURE__ */ ((AicIncludeEntities2) => {
  AicIncludeEntities2["all"] = "all";
  AicIncludeEntities2["filtered"] = "filtered";
  return AicIncludeEntities2;
})(AicIncludeEntities || {});
var FieldDoesntExistOption = /* @__PURE__ */ ((FieldDoesntExistOption2) => {
  FieldDoesntExistOption2["strict"] = "strict";
  FieldDoesntExistOption2["ignore"] = "ignore";
  return FieldDoesntExistOption2;
})(FieldDoesntExistOption || {});
export {
  AicClientAuth,
  AicClientBatchChat,
  AicClientChat,
  AicClientMutateRecords,
  AicClientQueryRecords,
  AicIncludeEntities,
  BaseDataTypes,
  FieldDoesntExistOption
};
