interface Command {
  fn: {
    (params?: {})
  };
  roles?: Array<string>;
}


const COMMANDLIST = {
  "/test": {
    fn: frontend.test
  } as Command,
  "/onlySudo": {
    fn: frontend.onlySudo,
    roles: ["sudo"]
  } as Command,
  "/review": {
    fn: frontend.justReviewFn,
    roles: ["reviewer"]
  } as Command,
  "help": {
    fn: frontend.startCommand
  } as Command,
  "Help": {
    fn: frontend.startCommand
  } as Command,
  "/start": {
    fn: frontend.startCommand
  } as Command
};
