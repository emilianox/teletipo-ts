var COMMANDLIST = {
    "/test": {
        fn: frontend.test
    },
    "/onlySudo": {
        fn: frontend.onlySudo,
        roles: ["sudo"]
    },
    "/review": {
        fn: frontend.justReviewFn,
        roles: ["reviewer"]
    },
    "help": {
        fn: frontend.startCommand
    },
    "Help": {
        fn: frontend.startCommand
    },
    "/start": {
        fn: frontend.startCommand
    },
};
