var express = require('express');
var router = express.Router();
var path = require('path');
var Activities = require('../models/activities.js');


//This will get all activities under the username if true
router.get('/activities', function(req, res, next) {

    if(req.isAuthenticated()==true) {
        var currentUser = req.user;

        Activities.find({user_id: currentUser._id}, function (err, activities) {

            console.log(activities);
            res.json({currentUser: currentUser}, {activities: activities});

            if (err)
                next(err);
            else
                res.send('There was an error with your request');
        })
    }
});


//This will allow the user to update the activities by id
router.put('/activities', function(req, res, next) {
    res.sendfile(path.join(__dirname, '../views/userPage.html'));
    if(req.isAuthenticated()==true){
        var currentUser = req.user;
        //
        Activities.findByIdAndUpdate(_id,{duration:req.body.duration,distance:req.body.distance,units:req.body.units,effort:req.body.effort,activity_type:req.body.activity_type,date:req.body.date,summary:req.body.summary},function(err,activities) {

        if (err)
            next(err);
        else
            res.send('There was an error with your request');

        res.sendfile(path.join(__dirname, '../views/userPage.html'));
    })

}
});

//this will allow users to post new activites based on username and id
router.post('/activities', function(req, res, next) {

    if(req.isAuthenticated()==true){
        var currentUser = req.user;
       Activity.create(req.body, function (err,activities) {
           if (err)
               next(err);
           else
               res.send('There was an error with your request');

    res.sendfile(path.join(__dirname, '../views/userPage.html'));
 })

}
});


//this will allow the user to delete an activity by its id
router.delete('/activities', function(req, res, next) {

    if(req.isAuthenticated()==true){
        var currentUser = req.user;

        Activities.findByIdAndRemove(req.body.activity._id,function(err) {
            if (err)
                next(err);
            else
                res.send('There was an error with your request');

            res.sendfile(path.join(__dirname, '../views/userPage.html'));
})
}
    });





module.exports = router;