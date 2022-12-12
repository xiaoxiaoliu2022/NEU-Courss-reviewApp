import ReviewsDAO from '../dao/reviewsDAO.js';
import CoursesDAO from '../dao/coursesDAO.js';
export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const courseId = req.body.course_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            const rating = req.body.rating;
            const isAnonymous = req.body.isAnonymous;

            const currentRatingInfo = await CoursesDAO.getCourseRatingInfoById(courseId);
            const currentRating = currentRatingInfo.rating;
            const currentRatingCount = currentRatingInfo.rating_count;

            console.log(`currentRating"${currentRating}, currentRatingCount : ${currentRatingCount}`);
            const newRating = (currentRating*currentRatingCount+rating)/(currentRatingCount+1);
            const newRatingCount = currentRatingCount+1;
            
            console.log(` new Rating: ${newRating}, newRatingCount ${newRatingCount}`);
            const reviewResponse = await ReviewsDAO.addReview(
                courseId,
                userInfo,
                review,
                rating,
                isAnonymous,
                date
            );
           const ratingResponse = await CoursesDAO.updateRating(courseId,newRatingCount,newRating);
            var { error1 } = reviewResponse;
            console.log(error1);
            var { error2 } = ratingResponse;
            console.log(error2);
            if (error1 || error2 ) {
                res.status(500).json({ error: "Unable to post review." });
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }
    static async apiUpdateReview(req, res, next) {
        try {
            const userId = req.body.user_id;
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const rating = req.body.rating;
            const isAnonymous = req.body.isAnonymous;
            const date = new Date();
            
            const reviewInfo = await ReviewsDAO.getReviewRatingById(reviewId);
            console.log("reviewInfo");
            console.log(reviewInfo);
            const courseId = reviewInfo.course_id;
            const oldRating = reviewInfo.rating;
            const currentRatingInfo = await CoursesDAO.getCourseRatingInfoById(courseId);
            const currentRating = currentRatingInfo.rating;
            const currentRatingCount = currentRatingInfo.rating_count;

            console.log(`Review Rating to be deleted: ${oldRating}`);

            console.log(`currentRating"${currentRating}, currentRatingCount : ${currentRatingCount}`);
            const newRating = (currentRating*currentRatingCount-oldRating+rating)/(currentRatingCount);
            console.log(` new Rating: ${newRating}`);

            const updateReview = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                rating,
                isAnonymous,
                date

            );
            const ratingResponse = await CoursesDAO.updateRating(courseId,currentRatingCount,newRating);
            

            var { error1 } = updateReview;
            console.log(error1);
            var { error2 } = ratingResponse;
            console.log(error2);
            if (error1 || error2) {
                res.status(500).json({ error: "Unable to update review." });
            } else if (updateReview.modifiedCount <= 0) {
                res.json({ error: "Can't find a match review to update" });

            } else if (updateReview.modifiedCount > 1) {
                res.json({ error: "More than one match review are found" });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message});
        }
    }
    
    

    static async apiDeleteReview(req, res, next) {
        try {
            const userId = req.body.user_id;
            const reviewId = req.body.review_id;
           

            const reviewInfo = await ReviewsDAO.getReviewRatingById(reviewId)
            const courseId = reviewInfo.course_id;
            const oldRating = reviewInfo.rating;

            const currentRatingInfo = await CoursesDAO.getCourseRatingInfoById(courseId);
            const currentRating = currentRatingInfo.rating;
            const currentRatingCount = currentRatingInfo.rating_count;

            console.log(`Review Rating to be deleted: ${oldRating}`);

            console.log(`currentRating"${currentRating}, currentRatingCount : ${currentRatingCount}`);
            const newRating = (currentRating*currentRatingCount-oldRating)/(currentRatingCount-1);
            const newRatingCount = currentRatingCount-1;
            console.log(` new Rating: ${newRating}, new Rating Count: ${newRatingCount}`);

            const deleteReview = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );
            const ratingResponse = await CoursesDAO.updateRating(courseId,newRatingCount,newRating);

            var { error1 } = deleteReview;
            console.log(error1);
            var { error2 } = ratingResponse;
            console.log(error2);
            if (error1 || error2) {
                res.status(500).json({ error: "Unable to delete review." });
            } else if (deleteReview.deletedCount <= 0) {
                res.json({ error: "Can't match review to delete" });

            } else if (deleteReview.deletedCount > 1){
                res.json({ error: "More than one match review are found." });
            }else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async apiGetAnonymousReview(req, res, next) {
        let reviews;
        try {
            let id = req.params.userId;
            
            reviews = await ReviewsDAO.getReview(id);
            if (!reviews) {
                res.status(404).json({ error: "not found review" });
                return;
            }
            console.log(reviews);
            for(let i = 0; i < reviews.length; i++){
                console.log(reviews[i]['course_id']);
                reviews[i]['course_info'] = await CoursesDAO.getCourseInfoById(reviews[i]['course_id']);
                console.log(reviews[i]);
            }
            //console.log(reviews);
            
            res.json(reviews);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: "Error inside apiGetReview" });
        }
    }
    static async apiGetNamedReview(req, res, next) {
        let reviews;
        try {
            let id = req.params.userId;
            //console.log(id);
            reviews = await ReviewsDAO.getReview(id,false);
            if (!reviews) {
                res.status(404).json({ error: "not found review" });
                return;
            }
            for(let i = 0; i < reviews.length; i++){
                console.log(reviews[i]['course_id']);
                reviews[i]['course_info'] = await CoursesDAO.getCourseInfoById(reviews[i]['course_id']);
            }
            //console.log(reviews);
            res.json(reviews);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: "Error inside apiGetReview" });
        }
    }
    
    
}