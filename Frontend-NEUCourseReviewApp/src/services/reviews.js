
import axios from "axios";// simplify making the HTTP calls to the API

class ReviewService {
    

    getCourseById(courseId){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/id/${courseId}`
        );
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`, data);
    }

    deleteReview(res) {
        
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review`,{data: res});
    }

    getAnonymousReviews(user_id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review/anonymous/${user_id}`);
    }

    getNamedReviews(user_id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/review/named/${user_id}`);
    }
}

export default new ReviewService();
