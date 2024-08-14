export interface paths {
    "/api/generic-erc-20/{address}/domain-separator": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressDomain-separator"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/allowance/{owner}/{spender}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressAllowanceByOwnerBySpender"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/balance-of/{account}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressBalance-ofByAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/decimals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressDecimals"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/eip-712-domain": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressEip-712-domain"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/name": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressName"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/nonces/{owner}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressNoncesByOwner"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/owner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressOwner"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/paused": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressPaused"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/symbol": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressSymbol"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/total-supply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressTotal-supply"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/approve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressApprove"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/approve/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressApproveReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/burn": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressBurn"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/burn/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressBurnReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/burn-from": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressBurn-from"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/burn-from/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressBurn-fromReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/mint": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressMint"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/mint/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressMintReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/pause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressPause"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/pause/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressPauseReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/permit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressPermit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/permit/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressPermitReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/renounce-ownership": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressRenounce-ownership"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/renounce-ownership/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressRenounce-ownershipReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressTransfer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressTransferReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer-from": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressTransfer-from"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer-from/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressTransfer-fromReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer-ownership": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressTransfer-ownership"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/transfer-ownership/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressTransfer-ownershipReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/unpause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiGeneric-erc-20ByAddressUnpause"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/generic-erc-20/{address}/unpause/receipt/{transactionHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiGeneric-erc-20ByAddressUnpauseReceiptByTransactionHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ws": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/pending-and-recently-processed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the list of pending and recently processed transactions */
        get: operations["getTransactionsPending-and-recently-processed"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/pending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the list of pending transactions */
        get: operations["getTransactionsPending"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/processed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the list of processed transactions */
        get: operations["getTransactionsProcessed"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "getApiGeneric-erc-20ByAddressDomain-separator": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressAllowanceByOwnerBySpender": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                owner: string;
                spender: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressBalance-ofByAccount": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                account: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressDecimals": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number;
                    "multipart/form-data": number;
                    "text/plain": number;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressEip-712-domain": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        fields: string;
                        name: string;
                        version: string;
                        chainId: string;
                        verifyingContract: string;
                        salt: string;
                        extensions: string[];
                    };
                    "multipart/form-data": {
                        fields: string;
                        name: string;
                        version: string;
                        chainId: string;
                        verifyingContract: string;
                        salt: string;
                        extensions: string[];
                    };
                    "text/plain": {
                        fields: string;
                        name: string;
                        version: string;
                        chainId: string;
                        verifyingContract: string;
                        salt: string;
                        extensions: string[];
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressName": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressNoncesByOwner": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                owner: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressOwner": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressPaused": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                    "multipart/form-data": boolean;
                    "text/plain": boolean;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressSymbol": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressTotal-supply": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "multipart/form-data": string;
                    "text/plain": string;
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressApprove": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        spender: string;
                        value: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        spender: string;
                        value: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        spender: string;
                        value: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressApproveReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressBurn": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        value: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        value: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        value: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressBurnReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressBurn-from": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        account: string;
                        value: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        account: string;
                        value: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        account: string;
                        value: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressBurn-fromReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressMint": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        amount: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        amount: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        amount: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressMintReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressPause": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressPauseReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressPermit": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        owner: string;
                        spender: string;
                        value: string;
                        deadline: string;
                        v: number;
                        r: string;
                        s: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        owner: string;
                        spender: string;
                        value: string;
                        deadline: string;
                        v: number;
                        r: string;
                        s: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        owner: string;
                        spender: string;
                        value: string;
                        deadline: string;
                        v: number;
                        r: string;
                        s: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressPermitReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressRenounce-ownership": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressRenounce-ownershipReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressTransfer": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        value: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        value: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        to: string;
                        value: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressTransferReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressTransfer-from": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        from: string;
                        to: string;
                        value: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        from: string;
                        to: string;
                        value: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        from: string;
                        to: string;
                        value: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressTransfer-fromReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressTransfer-ownership": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        newOwner: string;
                    };
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        newOwner: string;
                    };
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                    input: {
                        newOwner: string;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressTransfer-ownershipReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "postApiGeneric-erc-20ByAddressUnpause": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "multipart/form-data": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
                "text/plain": {
                    /** @description From address */
                    from: string;
                    /** @description Gas limit */
                    gasLimit?: string;
                    /** @description Gas price */
                    gasPrice?: string;
                    /** @description Simulate the transaction before sending it */
                    simulate?: boolean;
                    /** @description Metadata (store custom metadata from your application) */
                    metadata?: Record<string, never>;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "multipart/form-data": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                    "text/plain": {
                        /** @description Transaction hash */
                        transactionHash: string;
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getApiGeneric-erc-20ByAddressUnpauseReceiptByTransactionHash": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Contract address */
                address: string;
                /** @description Transaction hash */
                transactionHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "multipart/form-data": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                    "text/plain": {
                        receipt: {
                            /** @description Blob Gas Price */
                            blobGasPrice?: string;
                            /** @description Blob Gas Used */
                            blobGasUsed?: string;
                            /** @description Block Hash */
                            blockHash: string;
                            /** @description Block Number */
                            blockNumber: string;
                            /** @description Contract Address */
                            contractAddress?: string | null;
                            /** @description Cumulative Gas Used */
                            cumulativeGasUsed: string;
                            /** @description Effective Gas Price */
                            effectiveGasPrice: string;
                            /** @description From */
                            from: string;
                            /** @description Gas Used */
                            gasUsed: string;
                            /** @description Logs */
                            logs: unknown[];
                            /** @description Logs Bloom */
                            logsBloom: string;
                            /** @description Root */
                            root?: string;
                            /** @description Status */
                            status: "success" | "reverted";
                            /** @description To */
                            to: string | null;
                            /** @description Transaction Hash */
                            transactionHash: string;
                            /** @description Transaction Index */
                            transactionIndex: number;
                            /** @description Type */
                            type: string;
                        };
                    };
                };
            };
            /** @description InvalidInputRpcErrorType, InvalidParamsRpcErrorType, InvalidRequestRpcErrorType, ParseRpcErrorType */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32000;
                        /** @constant */
                        name: "InvalidInputRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32602;
                        /** @constant */
                        name: "InvalidParamsRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32600;
                        /** @constant */
                        name: "InvalidRequestRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32700;
                        /** @constant */
                        name: "ParseRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotFoundRpcErrorType, ResourceNotFoundRpcErrorType */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32601;
                        /** @constant */
                        name: "MethodNotFoundRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32001;
                        /** @constant */
                        name: "ResourceNotFoundRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description TransactionRejectedRpcErrorType */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32003;
                        /** @constant */
                        name: "TransactionRejectedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            425: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                    };
                    "multipart/form-data": {
                        message: string;
                    };
                    "text/plain": {
                        message: string;
                    };
                };
            };
            /** @description LimitExceededRpcErrorType */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32005;
                        /** @constant */
                        name: "LimitExceededRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ChainDisconnectedErrorType, HttpRequestErrorType, InternalRpcErrorType, ProviderDisconnectedErrorType, RpcErrorType, RpcRequestErrorType, SwitchChainErrorType, TimeoutErrorType, UnauthorizedProviderErrorType, UnknownRpcErrorType, UnsupportedProviderMethodErrorType, UserRejectedRequestErrorType, WebSocketRequestErrorType */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: 4901;
                        /** @constant */
                        name: "ChainDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "HttpRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: -32603;
                        /** @constant */
                        name: "InternalRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4900;
                        /** @constant */
                        name: "ProviderDisconnectedError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "RpcRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4902;
                        /** @constant */
                        name: "SwitchChainError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "TimeoutError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4100;
                        /** @constant */
                        name: "UnauthorizedProviderError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "UnknownRpcError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4200;
                        /** @constant */
                        name: "UnsupportedProviderMethodError";
                        message: string;
                    } | {
                        /** @constant */
                        code: 4001;
                        /** @constant */
                        name: "UserRejectedRequestError";
                        message: string;
                    } | {
                        /** @constant */
                        name: "WebSocketRequestError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description MethodNotSupportedRpcErrorType */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32004;
                        /** @constant */
                        name: "MethodNotSupportedRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description ResourceUnavailableRpcErrorType */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32002;
                        /** @constant */
                        name: "ResourceUnavailableRpcError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
            /** @description JsonRpcVersionUnsupportedErrorType */
            505: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "multipart/form-data": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                    "text/plain": {
                        /** @constant */
                        code: -32006;
                        /** @constant */
                        name: "JsonRpcVersionUnsupportedError";
                        message: string;
                    } | {
                        message: string;
                    };
                };
            };
        };
    };
    "getTransactionsPending-and-recently-processed": {
        parameters: {
            query?: {
                /** @description Contract address */
                address?: string;
                /** @description From address */
                from?: string;
                /** @description Function name */
                functionName?: string;
                /** @description Page number, starts from 0 */
                page?: string;
                /** @description Number of items per page */
                pageSize?: string;
                /** @description Processed after date, use json like date format (eg 2024-06-26T14:07:37.740Z) (default is 15 minutes ago) */
                processedAfter?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending and recently processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "multipart/form-data": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending and recently processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "text/plain": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending and recently processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                };
            };
        };
    };
    getTransactionsPending: {
        parameters: {
            query?: {
                /** @description Contract address */
                address?: string;
                /** @description From address */
                from?: string;
                /** @description Function name */
                functionName?: string;
                /** @description Page number, starts from 0 */
                page?: string;
                /** @description Number of items per page */
                pageSize?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "multipart/form-data": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "text/plain": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Pending transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                };
            };
        };
    };
    getTransactionsProcessed: {
        parameters: {
            query?: {
                /** @description Contract address */
                address?: string;
                /** @description From address */
                from?: string;
                /** @description Function name */
                functionName?: string;
                /** @description Page number, starts from 0 */
                page?: string;
                /** @description Number of items per page */
                pageSize?: string;
                /** @description Processed after date, use json like date format (eg 2024-06-26T14:07:37.740Z) */
                processedAfter?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "multipart/form-data": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                    "text/plain": {
                        /** @description Total number of results */
                        count: number;
                        /** @description Processed transactions */
                        records: {
                            /** @description Transaction hash */
                            transactionHash: string;
                            /** @description From address */
                            from: string;
                            /** @description Contract address */
                            address: string;
                            /** @description Function name */
                            functionName: string;
                            createdAt: (Record<string, never> | string) | null;
                            updatedAt: (Record<string, never> | string) | null;
                            receipt: {
                                /** @description Blob Gas Price */
                                blobGasPrice?: string;
                                /** @description Blob Gas Used */
                                blobGasUsed?: string;
                                /** @description Block Hash */
                                blockHash: string;
                                /** @description Block Number */
                                blockNumber: string;
                                /** @description Contract Address */
                                contractAddress?: string | null;
                                /** @description Cumulative Gas Used */
                                cumulativeGasUsed: string;
                                /** @description Effective Gas Price */
                                effectiveGasPrice: string;
                                /** @description From */
                                from: string;
                                /** @description Gas Used */
                                gasUsed: string;
                                /** @description Logs */
                                logs: unknown[];
                                /** @description Logs Bloom */
                                logsBloom: string;
                                /** @description Root */
                                root?: string;
                                /** @description Status */
                                status: "success" | "reverted";
                                /** @description To */
                                to: string | null;
                                /** @description Transaction Hash */
                                transactionHash: string;
                                /** @description Transaction Index */
                                transactionIndex: number;
                                /** @description Type */
                                type: string;
                            } | null;
                            metadata: Record<string, never> | null;
                        }[];
                    };
                };
            };
        };
    };
}
