import CoursesDao from "../dao/coursesDAO.js";
import FavoritesDAO from "../dao/favoritesDAO.js";

export default class FavoritesController {

    
    static async apiUpdateFavorites(req, res, next) {
        try {
            const FavoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            )
            const numberOfFavorites = await CoursesDao.updateNumOfFavorites(
                req.body.course_id,
                req.body.isLike

            )
            var { error } = FavoritesResponse
            if (error) {
                res.status(500).json({ error });
            }
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }
    static async apiGetFavorites(req, res, next) {

        try {
            let id = req.params.userId;
            let favorites = await FavoritesDAO.getFavorites(id);
            if (!favorites) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(favorites);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: "Error inside apiGetFavorites" });
        }
    }

    static async apiGetFavoriteCourses(req, res, next) {

        try {
            let id = req.params.userId;
            let favoriteCourses = await FavoritesDAO.getFavoriteCourses(id);
            if (!favoriteCourses) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(favoriteCourses);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: "Error inside apiGetFavorites Course"  });
        }
    }

}