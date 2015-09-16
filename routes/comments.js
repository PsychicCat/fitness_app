var express = require('express');
var router = express.Router();

// require database queries
var getCommentsByActivity = require('../queries/getCommentsByActivity.js');
var createComment = require('../queries/createComment.js');
var deleteComment = require('../queries/deleteComment.js');
var blockUser = require('../queries/blockUser');

/* GET route */
// get comments for activity
router.get('/:activity_id', function(req, res, next) {

    //TODO: replace empty array with req.user.blocked, empty array is for test purposes
    var blockedIds = [];

    getCommentsByActivity(req.params.activity_id, blockedIds, function(comments){
        res.json(comments);
    });
});

/* POST route */
// post comment to activity
router.post('/:activity_id', function(req, res, next) {
    console.log(req.body);
    createComment(req.body.userId, req.params.activity_id, req.user.blocked, req.body.comment, function(comments){
        res.json(comments);
    });
});

/* DELETE route */
// delete comment from activity
router.delete('/:comment_id', function(req, res, next) {
    deleteComment(req.params.comment_id, function(comment){
        res.sendStatus(200);
    });
});

/* PATCH route */
// add user to blocked user array in user model when block is clicked from comment
router.patch('/:user_id', function(req,res,next){
    blockUser(req.params.user_id, "blockedUserIdGoesHere", function(blockedId){
        res.sendStatus(200);
    })
});

module.exports = router;