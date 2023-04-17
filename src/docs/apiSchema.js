module.exports = {
    "openapi": "3.0.3",
    "info": {
        "version": "1.0.0",
        "title": "Node STARTPN",
        "description": "Node STARTPN API"
    },
    "servers": [
        {
            "url": "http://localhost:4000/",
            "description": "Local server"
        },
        {
            "url": "https://node-startpn.onrender.com/",
            "description": "Deploy server"
        }
    ],
    "paths": {
        "/api": {
            "get": {
                "tags": [
                    "Status"
                ],
                "summary": "Status do serviço",
                "responses": {
                    "200": {
                        "description": "Serviço em Operação",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "string",
                                    "example": "Service in operating 🚀"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Serviço offline"
                    }
                }
            }
        },
        "/api/sign-in": {
            "post": {
                "tags": [
                    "Autenticação"
                ],
                "description": "Session SignIn",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Data user",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "name@mail.com"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "12345678"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success Authentication",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "example": "Fulano da Silva"
                                                },
                                                "email": {
                                                    "type": "string",
                                                    "example": "name@mail.com"
                                                }
                                            }

                                        },
                                        "token": {
                                            "type": "string",
                                            "example": "asdasdas7d6as6dasd7a6s7dsadasd7asd7asdas9d0as"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Erro ao Realizar Autenticação"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/sign-up": {
            "post": {
                "tags": [
                    "Autenticação"
                ],
                "description": "Register",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "user data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "example": "usuário 001"
                                },
                                "email": {
                                    "type": "string",
                                    "example": "name@mail.com"
                                },
                                "phone": {
                                    "type": "string",
                                    "example": "00111112222"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "12345678"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Success Login",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "example": "Fulano da Silva"
                                                },
                                                "email": {
                                                    "type": "string",
                                                    "example": "name@mail.com"
                                                },
                                                "phone": {
                                                    "type": "string",
                                                    "example": "27111112222"
                                                },
                                                "email_verified": {
                                                    "type": "boolean",
                                                    "example": "true"
                                                },
                                                "status": {
                                                    "type": "enum",
                                                    "example": "1"
                                                },
                                            }

                                        },
                                        "token": {
                                            "type": "string",
                                            "example": "asdasdas7d6as6dasd7a6s7dsadasd7asd7asdas9d0as"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Ocorreu um erro, verifique e tente novamente."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/folders": {
            "get": {
                "tags": [
                    "Pastas"
                ],
                "description": "List folders",
                "responses": {
                    "200": {
                        "description": "Success list folders",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string",
                                                "example": "642615df92c9e18ecef32a6b"
                                            },
                                            "id_user": {
                                                "type": "number",
                                                "example": "1"
                                            },
                                            "title": {
                                                "type": "string",
                                                "example": "Lorem Ipsum"
                                            },
                                            "date": {
                                                "type": "string",
                                                "example": "17-04-2023 15:04:28"
                                            },
                                            "files_count": {
                                                "type": "number",
                                                "example": "1"
                                            },
                                            "user": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": "1"
                                                    },
                                                    "name": {
                                                        "type": "String",
                                                        "example": "Fulano"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Ocorreu um erro, verifique e tente novamente."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Pastas"
                ],
                "description": "Create folders",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "folder data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id_user": {
                                    "type": "number",
                                    "example": "1"
                                },
                                "title": {
                                    "type": "string",
                                    "example": "Lorem ipsum"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Folder created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": "1"
                                        },
                                        "id_user": {
                                            "type": "number",
                                            "example": "1"
                                        },
                                        "title": {
                                            "type": "string",
                                            "example": "Lorem ipsum"
                                        },
                                        "date": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "error on request, check and try again."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "Pastas"
                ],
                "description": "Update folder",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "id folder to update :id",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "folder data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "example": "Lorem ipsum"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Folder created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": "1"
                                        },
                                        "id_user": {
                                            "type": "number",
                                            "example": "1"
                                        },
                                        "title": {
                                            "type": "string",
                                            "example": "Lorem ipsum"
                                        },
                                        "date": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "example": "023-04-17T15:54:46.390Z"
                                        },
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "error on request, check and try again."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Pastas"
                ],
                "description": "Delete folder",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "id folder to delete :id",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Folder deleted",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Registro excluído com sucesso."
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "error on request, check and try again."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/api/files": {
            "get": {
                "tags": [
                    "Arquivos"
                ],
                "description": "List files",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "id folder to list files",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    },
                ],
                "responses": {
                    "200": {
                        "description": "Success list files",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "number",
                                                "example": "1"
                                            },
                                            "original_name": {
                                                "type": "string",
                                                "example": "lorem_ipsum.png"
                                            },
                                            "name": {
                                                "type": "string",
                                                "example": "andi7a6sdashdas7d8.png"
                                            },
                                            "size": {
                                                "type": "string",
                                                "example": "1.51mb"
                                            },
                                            "url": {
                                                "type": "string",
                                                "example": "https://startpn.s3.amazonaws.com/f1ce486ad7a6afe774beb093ec1c7ddf.png"
                                            },
                                            "type": {
                                                "type": "string",
                                                "example": "png"
                                            },
                                            "id_folder": {
                                                "type": "number",
                                                "example": "3"
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "example": "2023-04-17T16:10:02.518Z"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "example": "2023-04-17T16:10:02.518Z"
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Ocorreu um erro, verifique e tente novamente."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Arquivos"
                ],
                "description": "Create file",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "id folder to create file",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "in": "multipart/form-data",
                        "name": "form-data",
                        "description": "file to send",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "file": {
                                    "type": "file",
                                    "example": ">file<"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Folder created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Register created successfully."
                                        },
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": "1"
                                                },
                                                "original_name": {
                                                    "type": "string",
                                                    "example": "lorem_ipsum.png"
                                                },
                                                "name": {
                                                    "type": "string",
                                                    "example": "andi7a6sdashdas7d8.png"
                                                },
                                                "size": {
                                                    "type": "string",
                                                    "example": "1.51mb"
                                                },
                                                "url": {
                                                    "type": "string",
                                                    "example": "https://startpn.s3.amazonaws.com/f1ce486ad7a6afe774beb093ec1c7ddf.png"
                                                },
                                                "type": {
                                                    "type": "string",
                                                    "example": "png"
                                                },
                                                "id_folder": {
                                                    "type": "number",
                                                    "example": "3"
                                                },
                                                "createdAt": {
                                                    "type": "string",
                                                    "example": "2023-04-17T16:10:02.518Z"
                                                },
                                                "updatedAt": {
                                                    "type": "string",
                                                    "example": "2023-04-17T16:10:02.518Z"
                                                },
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "error on request, check and try again."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Arquivos"
                ],
                "description": "Delete files",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "id file to delete :id",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Folder deleted",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Registro excluído com sucesso."
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "error on request, check and try again."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    }
}