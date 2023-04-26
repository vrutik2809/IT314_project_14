export default {
    "/api/orders": {
        get: {
            tags: [ "Order" ],
            summary: "Get all orders",
            description: "Get all orders",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "pageNumber",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                    },
                },
                {
                    name: "keyword",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "delivery",
                    in: "query",
                    required: false,
                    schema: {
                        type: "boolean",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Order fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        post: {
            tags: [ "Order" ],
            summary: "Create order",
            description: "Create order",
            security: [
                {
                    Bearer: [],
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/create_order",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Order created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
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
    },
    "/api/orders/{id}": {
        get: {
            tags: [ "Order" ],
            summary: "Get a order with specific id",
            description: "Get a order with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "order id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "order fetched successfully",
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
                    description: "order not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
        put: {
            tags: [ "Order" ],
            summary: "Update a order with specific id",
            description: "Update a order with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "order id",
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
                            $ref: "#/components/schemas/create_order",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "order updated successfully",
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
            tags: [ "Order" ],
            summary: "Delete a order with specific id",
            description: "Delete a order with specific id",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "order id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "order deleted successfully",
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
                    description: "order not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
    "/api/orders/{id}/pay": {
        post: {
            tags: [ "Order" ],
            summary: "Mark order as paid",
            description: "Mark order as paid",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "order id",
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
                            type: "object",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Order paid successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
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
    },
    "/api/orders/{id}/delivery": {
        post: {
            tags: [ "Order" ],
            summary: "Toggle order delivery status",
            description: "Toggle order delivery status",
            security: [
                {
                    Bearer: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "order id",
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
                            type: "object",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Order delivery toggled successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
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
    },
    "/api/orders/statistics": {
        get: {
            tags: [ "Order" ],
            summary: "Get order statistics",
            description: "Get order statistics",
            security: [
                {
                    Bearer: [],
                }
            ],
            responses: {
                200: {
                    description: "Order statistics fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
}