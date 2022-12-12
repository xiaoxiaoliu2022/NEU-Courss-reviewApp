import CoursesDao from "./coursesDAO.js"
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let favoritesCollection;

export default class FavoritesDAO {
    static async injectDB(conn) {
        if (favoritesCollection) {
            return;
        }
        try {
            favoritesCollection = await conn.db(process.env.COURSEREVIEWS_NS)
                .collection('favorites');
        }
        catch (e) {
            console.error(`Unable to connect in FavoritesDAO:${e}`);
        }


    }

    static async updateFavorites(userId, favorites) {
        try {
            const updateResponse = await favoritesCollection.updateOne(
                { _id: userId },
                { $set: { favorites: favorites } },
                { upsert: true }
            )

            return updateResponse
        }
        catch (e) {
            console.error(`Unable to update favorites: ${e}`);
            return { error: e };
        }
    }

    static async getFavorites(id) {
        let cursor;
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray();
            return favorites[0];
        } catch (e) {
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }

    }

    static async getFavoriteCourses(id) {
        let cursor;
        let favoriteCourses = [];
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray();
            const favoritesIds = favorites[0].favorites;
            for (var i = 0; i < favoritesIds.length; i++) {
                favoriteCourses.push(await CoursesDao.getCourseById(favoritesIds[i]));
            }
            return favoriteCourses;

        } catch (e) {
            console.error(`Something wnet wrong in getFavoriteCourses: ${e}`);
            throw e;
        }

    }
}