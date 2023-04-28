export default {
    create_product: {
        type: "object",
        required: [ "name" ,"price","categoryId","stock" ],
        properties: {
            name: {
                type: "string",
                description: "Name of the product",
                example: "product 1",
            },
            price: {
                type: "number",
                description: "Price of the product",
                example: 10.50,
            },
            categoryId: {
                type: "string",
                description: "Category id of the product",
                example: "5f9f1b9b9c9d0b1b8c8b8b8b",
            },
            stock: {
                type: "number",
                description: "Stock of the product",
                example: 10,
            },
        },
    },
}