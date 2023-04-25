export default {
    "/api/categories": {
        get: {
            tags: [ "Category" ],
            summary: "Get all categories",
            description: "Get all categories",
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
                    schema: {
                        type: "integer",
                    },
                },
                {
                    name: "keyword",
                    in: "query",
                    description: "Search keyword",
                    required: false,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Categories fetched successfully",
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
        post: {
            tags: [ "Category" ],
            summary: "Create a category",
            description: "Create a category",
            security: [
                {
                    Bearer: [],
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/create_category",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Category created successfully",
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
    "/api/categories/{id}": {
        get: {
            tags: [ "Category" ],
            summary: "Get a category",
            description: "Get a category with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the category to fetch",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Category fetched successfully",
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
                    description: "Category not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        put: {
            tags: [ "Category" ],
            summary: "Update a category",
            description: "Update a category with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the category to update",
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
                            $ref: "#/components/schemas/create_category",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Category updated successfully",
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
                    description: "Category not found",
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
            tags: [ "Category" ],
            summary: "Delete a category",
            description: "Delete a category with specified id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the category to delete",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Category deleted successfully",
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
                    description: "Category not found",
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