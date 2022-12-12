
import CoursesDao from '../dao/coursesDAO.js';
export default class CoursesController {
    static async apiGetCourses(req, res, next) {
        const coursesPerPage = req.query.coursesPerPage ?
            parseInt(req.query.coursesPerPage) : 3;
        const page = req.query.page ? parseInt(req.query.page) : 0;


        let filters = {}
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.course_name = req.query.title;
        }
        console.log("Call");
        const { coursesList, totalNumCourses } = await
            CoursesDao.getCourses({ filters, page, coursesPerPage });

        let response = {
            courses: coursesList,
            page: page,
            filters: filters,
            entries_per_page: coursesPerPage,
            total_results: totalNumCourses,

        };
        res.json(response);
    }
    static async apiGetCourseById(req, res, next) {
        try {
            let id = req.params.id || {}
            let course = await CoursesDao.getCourseById(id);
            if (!course) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(course);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }

    }
    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await CoursesDao.getRatings();
            res.json(propertyTypes);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetAllCourse(req, res, next) {
        try {
            let course = await CoursesDao.getAllCourses();
            if (!course) {
                res.status(404).json({ error: "not found in controller" });
                return;
            }
            res.json(course);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }

    }
    static async apiUpdateNumOfFavorites(req, res, next) {
        try {
            const numOfFavorites = req.body.numOfFavorites
            const courseId = req.body.courseId
            const updateNumOfFavorites = await CoursesDao.updateNumOfFavorites(
                courseId,
                numOfFavorites
            )
            console.log(updateNumOfFavorites)
            if (!updateNumOfFavorites) {
                res.status(404).json({ error: "not found in controller" });
                return;
            }
            res.json(updateNumOfFavorites);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

}