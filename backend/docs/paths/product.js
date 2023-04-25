export default {
    "/api/products": {
        get: {
            tags: [ "Product" ],
            summary: "Get all products",
            description: "Get all products",
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
                    description: "Products fetched successfully",
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
            tags: [ "Product" ],
            summary: "Create a product",
            description: "Create a product",
            security: [
                {
                    Bearer: [],
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/create_product",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Product created successfully",
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
    "/api/products/{id}": {
        get: {
            tags: [ "Product" ],
            summary: "Get a product with specific id",
            description: "Get a product with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Product id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Product fetched successfully",
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
                    description: "Product not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        put: {
            tags: [ "Product" ],
            summary: "Update a product with specific id",
            description: "Update a product with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Product id",
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
                            $ref: "#/components/schemas/create_product",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Product updated successfully",
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
                    description: "Not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        delete: {
            tags: [ "Product" ],
            summary: "Delete a product with specific id",
            description: "Delete a product with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Product id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Product deleted successfully",
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
                    description: "Product not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
}