let holidaysService = new Holidays();
const frontend = {
  test: function(params?): string {
    return "testing";
  },
  onlySudo: function(params?) {
    return "you are sudo user."
  },
  //test markdown telegram
  justReviewFn: function(params?): string {
    return `
      *bold text*
      _italic text_
      [text](URL)
      \`inline fixed-width code\`
      \`\`\`text
      pre-formatted fixed-width code block
      \`\`\`
    `
  },
  startCommand: function(params?): string {
    return `
    *Welcome*`;
  },
};
