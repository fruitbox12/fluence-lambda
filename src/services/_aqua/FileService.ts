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

export interface FileServiceDef {
    getSharedFiles: (publicKey: string, callParams: CallParams<'publicKey'>) => { path: string; publicKey: string; timestamp: string; }[] | Promise<{ path: string; publicKey: string; timestamp: string; }[]>;
    shareFile: (publicKey: string, file: { path: string; publicKey: string; timestamp: string; }, callParams: CallParams<'publicKey' | 'file'>) => void | Promise<void>;
    uploadFile: (file: { path: string; publicKey: string; timestamp: string; }, callParams: CallParams<'file'>) => string | Promise<string>;
}
export function registerFileService(service: FileServiceDef): void;
export function registerFileService(serviceId: string, service: FileServiceDef): void;
export function registerFileService(peer: FluencePeer, service: FileServiceDef): void;
export function registerFileService(peer: FluencePeer, serviceId: string, service: FileServiceDef): void;
       

export function registerFileService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "file_service",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "getSharedFiles" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "publicKey" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "array",
                            "type" : {
                                "tag" : "struct",
                                "name" : "File",
                                "fields" : {
                                    "path" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "publicKey" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "timestamp" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            "shareFile" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "publicKey" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "file" : {
                            "tag" : "struct",
                            "name" : "File",
                            "fields" : {
                                "path" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "publicKey" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "timestamp" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        }
                    }
                },
                "codomain" : {
                    "tag" : "nil"
                }
            },
            "uploadFile" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "file" : {
                            "tag" : "struct",
                            "name" : "File",
                            "fields" : {
                                "path" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "publicKey" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "timestamp" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      
// Functions

