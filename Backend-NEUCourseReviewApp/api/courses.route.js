import express from 'express';
import CoursesController from './courses.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoritesController from './favorites.controller.js';

const router = express.Router(); // get acess to express router

router.route("/").get(CoursesController.apiGetCourses);
router.route("/id/:id").get(CoursesController.apiGetCourseById);
router.route("/ratings").get(CoursesController.apiGetRatings);
router.route("/numOfFavorites").put(CoursesController.apiUpdateNumOfFavorites);

router.route("/review/anonymous/:userId").get(ReviewsController.apiGetAnonymousReview);
router.route("/review/named/:userId").get(ReviewsController.apiGetNamedReview);

router.route("/review").post(ReviewsController.apiPostReview);
router.route("/review").put(ReviewsController.apiUpdateReview);
router.route("/review").delete(ReviewsController.apiDeleteReview);
router
    .route("/favorites")
    .put(FavoritesController.apiUpdateFavorites);
router
    .route("/favorites/:userId")
    .get(FavoritesController.apiGetFavorites);
router
    .route("/favoriteCourses/:userId")
    .get(FavoritesController.apiGetFavoriteCourses);

router
    .route("/mindBlowing")
    .get(CoursesController.apiGetAllCourse);
export default router;