export default {
    "/api/users": {
        post: {
            tags: [ "User" ],
            summary: "Create a new user",
            description: "Create a new user",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/login",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "user created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Not authorized",
                },
                403: {
                    description: "Validation error",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
    "/api/users/profile/{id}": {
        put: {
            tags: [ "User" ],
            summary: "Update a user",
            description: "Update a user with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to update",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/update_user",
                        },
                    },
                },
            },
            responses: {
                200: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Not authorized",
                },
                403: {
                    description: "Validation error",
                },
                404: {
                    description: "user not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
    "/api/users/{id}": {
        get: {
            tags: [ "User" ],
            summary: "Get a user",
            description: "Get a user with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to fetch",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "user fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Not authorized",
                },
                403: {
                    description: "Validation error",
                },
                404: {
                    description: "user not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        delete: {
            tags: [ "User" ],
            summary: "Delete a user",
            description: "Delete a user with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to delete",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "user deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Not authorized",
                },
                403: {
                    description: "Validation error",
                },
                404: {
                    description: "user not found",
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/error_response",
                            },
                        },
                    },
                },
            },
        },
    },
}