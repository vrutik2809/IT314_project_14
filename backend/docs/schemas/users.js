export default {
    update_user: {
        type: "object",
        required: [ "name","email","passwordCheck" ],
        properties: {
            name: {
                type: "string",
                description: "Name of the user",
                example: "John Doe",
            },
            email: {
                type: "string",
                description: "Email of the user",
                example: "user@example.com",
            },
            password: {
                type: "string",
                description: "updated password of the user",
                example: "new_password",
            },
            passwordCheck: {
                type: "string",
                description: "current password of the user",
                example: "current_password",
            },
            image: {
                type: "string",
                description: "Image of the user",
                example: "/avatar.png",
            },

        },
    },
}