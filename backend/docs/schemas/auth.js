export default {
    login: {
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email",
                description: "Email address of the user",
                example: "admin@example.com",
            },
            password: {
                type: "string",
                description: "Password of the user",
                example: "123456",
            },
        },
    },
}