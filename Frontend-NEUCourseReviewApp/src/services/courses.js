import axios from "axios";
class CourseDataService {
    getAll(page = 0) {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses?page=${page}`)
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses?page=${page}`);
    }
    find(query, by = "course_name", page = 0) {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses?${by}=${query}&page=${page}`)
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses?${by}=${query}&page=${page}`
        );
    }
    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/ratings`);
    }
    getSingleCourse(by = "_id") {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/id/${by}`);
    }
    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`, data);
    }
    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`, data)
    }
    deleteReview(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`, { data: data })
    }
    getAllCourse() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/mindBlowing`);
    }
    updateNumOfFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/numOfFavorites`, data);
    }
}
export default new CourseDataService();