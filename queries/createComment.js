var Comments = require('../models/comments');

var createComment = function(userId, activityId, blockedIDs, comment, callback){
    var comment = new Comments({user_id: userId, activity_id: activityId, comment: comment});

    comment.save(function(err){
        if(err){
            console.log(err);
            next(err);
        }
    });

    Comments.find({activity_id: activityId, user_id: { "$nin" : blockedIDs } }, function(err, comments){
        callback(comments);
    })
};


module.exports = createComment;