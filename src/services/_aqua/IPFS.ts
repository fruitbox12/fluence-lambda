/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.4-322
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface IPFSDef {
    createConnection: (callParams: CallParams<null>) => { host: string; pathname: string; port: string; protocol: string; } | Promise<{ host: string; pathname: string; port: string; protocol: string; }>;
    uploadFile: (callParams: CallParams<null>) => void | Promise<void>;
}
export function registerIPFS(service: IPFSDef): void;
export function registerIPFS(serviceId: string, service: IPFSDef): void;
export function registerIPFS(peer: FluencePeer, service: IPFSDef): void;
export function registerIPFS(peer: FluencePeer, serviceId: string, service: IPFSDef): void;
       

export function registerIPFS(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "ipfs_service",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "createConnection" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "struct",
                            "name" : "IPFSHTTPClient",
                            "fields" : {
                                "host" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "pathname" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "port" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "protocol" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        }
                    ]
                }
            },
            "uploadFile" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
                },
                "codomain" : {
                    "tag" : "nil"
                }
            }
        }
    }
}
    );
}
      
// Functions
