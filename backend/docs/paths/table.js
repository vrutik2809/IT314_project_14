export default {
    "/api/tables": {
        get: {
            tags: [ "Table" ],
            summary: "Get all tables",
            description: "Get all tables",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "pageNumber",
                    in: "query",
                    description: "Page number",
                    required: false,
                },
                {
                    name: "keyword",
                    in: "query",
                    description: "Search keyword",
                    required: false,
                }
            ],
            responses: {
                200: {
                    description: "Tables fetched successfully",
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
                500: {
                    description: "Internal server error",
                },
            },
        },
        post: {
            tags: [ "Table" ],
            summary: "Create a new table",
            description: "Create a new table",
            security: [
                {
                    Bearer: [],
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/create_table",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Table created successfully",
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
    "/api/tables/{id}": {
        get: {
            tags: [ "Table" ],
            summary: "Get a table",
            description: "Get a table with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the table to fetch",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "table fetched successfully",
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
                    description: "table not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        put: {
            tags: [ "Table" ],
            summary: "Update a table",
            description: "Update a table with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the table to update",
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
                            $ref: "#/components/schemas/create_table",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "table updated successfully",
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
                    description: "table not found",
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
        delete: {
            tags: [ "Table" ],
            summary: "Delete a table",
            description: "Delete a table with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the table to delete",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "table deleted successfully",
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
                    description: "table not found",
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