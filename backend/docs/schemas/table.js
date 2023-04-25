export default {
    create_table: {
        type: "object",
        required: [ "name" ],
        properties: {
            name: {
                type: "string",
                description: "Name of the table",
                example: "table 1",
            },
            occupied: {
                type: "boolean",
                description: "Is the table occupied",
                example: false,
            },
        },
    },
}