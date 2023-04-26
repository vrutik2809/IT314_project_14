export default {
    create_order: {
        type: "object",
        required: [ "total" ,"products" ],
        properties: {
            total: {
                type: "number",
                description: "Total price of order",
                example: 1000,
            },
            isPaid: {
                type: "boolean",
                description: "Is order paid",
                example: false,
            },
            delivery: {
                type: "boolean",
                description: "Is order is for delivery or not",
                example: false,
            },
            note: {
                type: "string",
                description: "Note for order",
                example: "sample note",
            },
            tableId: {
                type: "string",
                description: "Id of table on which order is placed",
                example: "5f9b1b7b9b9d6b2b1c7b7b7b",
            },
            products: {
                type: "array",
                items: {
                    type: "object",
                    required: [ "id" ,"quantity" ],
                    properties: {
                        id: {
                            type: "string",
                            description: "Id of product",
                            example: "5f9b1b7b9b9d6b2b1c7b7b7b",
                        },
                        quantity: {
                            type: "number",
                            description: "Quantity of product",
                            example: 2,
                        },
                    },
                },
            },
        },
    },
}