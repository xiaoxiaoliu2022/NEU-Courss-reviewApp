import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let courses;

export default class CoursesDao {
    static async injectDB(conn) {
        if (courses) {
            return;
        }
        try {
            courses = await conn.db(process.env.COURSEREVIEWS_NS).collection('courses');
        }
        catch (e) {
            console.error(`unable to connect in CoursesDao: ${e}`);
        }
    }

    static async updateNumOfFavorites(courseId, numOfFavorites) {

        try {
            const filter = {
                _id: ObjectId(courseId),
            }
            const update = {
                number_of_favorites: numOfFavorites
            }
            return await courses.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update number of favorares: ${e}`)
            return { error: e };
        }
    }
    static async updateRating(courseId, newRatingCount, newRating) {

        try {
            const filter = {
                _id: ObjectId(courseId),
            }
            const update = {
                rating_count: newRatingCount,
                rating: newRating
            }
            console.log("updating rating");
            return await courses.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update raing: ${e}`)
            return { error: e };
        }
    }

    static async getCourses({
        filters = null,
        page = 0,
        coursesPerPage = 3,
    } = {}) {
        let query;
        if (filters) {
            console.log("filter in DAO:");
            console.log(filters);
            if ("course_name" in filters) {
                query = { $text: { $search: filters['course_name'] } };
            } else if ("rating" in filters) {
                query = { "rating": { $eq: filters['rating'] } }
            }
        }

        let cursor;
        try {
            console.log("query in try:")
            console.log(query)
            cursor = await courses.find(query).limit(coursesPerPage).skip(coursesPerPage * page);
            //console.log(cursor)
            const coursesList = await cursor.toArray();
            // console.log(coursesList)
            const totalNumCourses = await courses.countDocuments(query);
            return { coursesList, totalNumCourses };

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { coursesList: [], totalNumCourses: 0 };
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await courses.distinct("rating");
            return ratings;
        } catch (e) {
            console.error(`Unable to get ratings, ${e}`);
            return ratings;
        }

    }

    static async getCourseById(id) {
        try {
            return await courses.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: `_id`,
                        foreignField: 'course_id',
                        as: 'reviews',
                    }
                }

            ]).next();
        } catch (e) {
            console.error(`Something went wrong in GetCourseById: ${e}`);
            throw e;
        }

    }
    static async getCourseInfoById(id) {
        try {
            return await courses.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $project: {
                        instructor: 1,
                        course_name: 1,
                        course_number: 1,
                        pic: 1
                    }
                }

            ]).next();
        } catch (e) {
            console.error(`Something went wrong in GetCourseById: ${e}`);
            throw e;
        }

    }
    static async getCourseRatingInfoById(id) {
        try {
            return await courses.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $project: {
                        rating:1,
                        rating_count:1
                    }
                }

            ]).next();
        } catch (e) {
            console.error(`Something went wrong in GetCourseById: ${e}`);
            throw e;
        }

    }
    static async getAllCourses() {
        let cursor;
        try {
            cursor = await courses.find();
            const coursesList = await cursor.toArray();
            console.log("coursesList:", coursesList);
            return { coursesList };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { coursesList: [] };
        }
    }

} 