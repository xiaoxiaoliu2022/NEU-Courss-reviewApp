// import mongodb, { ObjectId } from "mongodb";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.COURSEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewDA: ${e}`);

        }
    }
    static async addReview(courseId, user, review, rating, isAnonymous, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                course_id: ObjectId(courseId),
                rating:rating,
                isAnonymous, isAnonymous
            }
            return await reviews.insertOne(reviewDoc);

        }
        catch (e) {
            console.error(`Unable to post review:${e}`)
            return { error: e };

        }

    }
    static async updateReview(reviewId, userId, review, rating, isAnonymous, date) {
        try {
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId),

            }
            const update = {
                review: review,
                rating: rating,
                isAnonymous:isAnonymous,
                date: date
            }
            return await reviews.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }
    }
    static async updateRating(reviewId, userId, rating, date) {
        try {
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId),

            }
            const update = {
                rating: rating,
                date: date
            }
            return await reviews.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }
    }
    static async updateReviewName(reviewId, userId, isAnonymous, date) {
        try {
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId),

            }
            const update = {
                isAnonymous: isAnonymous,
                date: date
            }
            return await reviews.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }
    }
    static async getReviewRatingById(id) {
        try {
            return await reviews.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $project: {
                        rating:1,
                        course_id:1,
                    }
                }

            ]).next();
        } catch (e) {
            console.error(`Something went wrong in getReviewRatingById: ${e}`);
            throw e;
        }

    }
    static async deleteReview(reviewId, userId) {
        try {
            const filter = {
                user_id: userId,
                _id: new ObjectId(reviewId),
            }
            return await reviews.deleteOne(filter)
        } catch (e) {
            console.error(`Unable to delete the review: ${e}`)
            return { error: e }
        }
    }
    static async getReview(userId,isAnon = true) {
       
        try {
            let cursor = await reviews.find({
                user_id: userId,
                isAnonymous: isAnon
            });
            
           const review = await cursor.toArray();
           return review;
        } catch(e){
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }

    }
}