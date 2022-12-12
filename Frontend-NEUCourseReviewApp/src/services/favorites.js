import axios from "axios";

class FavoritesDataService {


    updateFavorite(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/favorites`, data);
    }
    

    getFavorite(data = "_id") {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/favorites/${data}`);
    }

    getFavoriteClass(data = "_id") {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/favoriteCourses/${data}`);
    }



}

export default new FavoritesDataService();
