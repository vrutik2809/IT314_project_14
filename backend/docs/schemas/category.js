export default {
    create_category: {
        type: "object",
        required: [ "name" ],
        properties: {
            name: {
                type: "string",
                description: "Name of the category",
                example: "category 1",
            },
        },
    },
}