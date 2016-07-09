var holidaysService = new Holidays();
var frontend = {
    test: function (params) {
        return "testing";
    },
    onlySudo: function (params) {
        return "you are sudo user.";
    },
    justReviewFn: function (params) {
        return "\n      *bold text*\n      _italic text_\n      [text](URL)\n      `inline fixed-width code`\n      ```text\n      pre-formatted fixed-width code block\n      ```\n    ";
    },
    startCommand: function (params) {
        return "\n    *Welcome*";
    },
};
