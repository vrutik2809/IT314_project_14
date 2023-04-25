export default {
    "/api/auth/login": {
        post: {
            tags: [ "Auth" ],
            summary: "user login route",
            description: "user login route",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/login",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "User login successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/success_response",
                            },
                        },
                    },
                },
                401: {
                    description: "Invalid email or password",
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