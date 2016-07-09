function testStartCommand() {
    return testDoPostCommand_("/start");
}
function testOnlySudoCommand() {
    return testDoPostCommand_("/onlySudo");
}
function testReviewCommand() {
    return testDoPostCommand_("/review");
}
