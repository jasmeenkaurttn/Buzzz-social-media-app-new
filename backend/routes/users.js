const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');


//get all users
// router.get('/getAll',async(req,res)=>{
//     try {
//         const users = await User
//             .find()
//             .select({firstName:1,lastName:1,profilePicture:1})
//         res.send(users);
//     } catch (error) {
//         res.send(error);
//     }
// })

//get friend suggestions
router.post('/suggestions/:id',async(req,res)=>{
    try {
        const users = await User
             .find()
             .and([{"_id": {"$nin": req.body.friends}}, {"_id": {"$ne": req.params.id}}])
            // .find()
            .select({firstName:1,lastName:1,profilePicture:1})
        res.send(users);
    } catch (error) {
        res.send(error);
    }
})

// update a user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        // After setting new password, updating user
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({message:"Account has been updated"});
        } catch (error) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can only update your account');
    }
});

// delete a user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can only delete your account');
    }
})

// get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get friends
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )

        let friendList = [];
        friends.map(friend => {
            const { _id, firstName, profilePicture, lastName } = friend;
            friendList.push({ _id, firstName, lastName, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err);
    }
})

// follow a user
//parmas:  followers or friends Id
//body: logged In user's Id
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json('User has been followed');
            } else {
                res.status(403).json('You already follow this user');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
})

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json('User has been unfollowed');
            } else {
                res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
})



module.exports = router;