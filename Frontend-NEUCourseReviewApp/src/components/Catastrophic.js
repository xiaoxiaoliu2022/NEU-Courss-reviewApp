import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CoursesDataService from "../services/courses";
import { IconContext } from "react-icons";
import "./MyFavorite.css";
import "./MyReviews.css";
import { motion } from 'framer-motion';
import Card from 'react-bootstrap/Card';
import { BsHandThumbsDownFill, BsFillEmojiFrownFill, BsFillExclamationTriangleFill } from "react-icons/bs";

function Catastrophic() {
    const [unFavList, setUnFavList] = useState([]);
    const [cards, setCards] = useState([]);
    var returnData = [];

    const retriveMindBlowingClass = useCallback(() => {

        CoursesDataService.getAllCourse().then(response => {
            console.log("get all courses response.data: ", response.data.coursesList)
            setCards(response.data.coursesList);
        })
            .catch(e => {
                console.log(e);
            });

    }, []);

    const updateLeaseFav = useCallback(() => {

        let newFavorite = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].rating <= 3 && cards[i].rating != 0) {
                newFavorite.push(cards[i]);
            }
        };
        console.log(newFavorite);
        setUnFavList(newFavorite);
    }
        , [cards]);

    useEffect(() => {
        retriveMindBlowingClass();
    }, [retriveMindBlowingClass]);

    useEffect(() => {
        updateLeaseFav();
    }, [updateLeaseFav]);


    return (

        <div className="mindBlowingTitle">
            <br></br>
            <h1>Classes with less than 3 stars rating:
                <BsHandThumbsDownFill className="spanStyle1" />
                <span> </span>
                <BsHandThumbsDownFill className="spanStyle2" />
                <span> ... </span>
                <span>
                    <BsHandThumbsDownFill /></span>

            </h1>

            <motion.img
                className="backgroundPoster"
                src="/images/MC2 2.jpeg" alt="Avatar"
                animate={{
                    scale: [0.7, 0.8, 0.9, 0.9, 0.8],
                    borderRadius: ["20%", "20%", "50%", "50%", "50%"],
                    rotate: [0, 0, 270, 270, 0]
                }}
                transition={{ duration: 3 }}
            />

            <div>
                <br></br>
                {unFavList.map((favorite, index) => {
                    return (
                        <div>
                            <Card className="favoritesCard " >
                                <IconContext.Provider value={{ className: "unhappy", size: 50 }}>
                                    <>
                                        <BsFillExclamationTriangleFill />
                                    </>
                                </IconContext.Provider>

                                <Card.Text className="favoritesTitle">
                                    Course Name: {favorite.course_name}
                                    <br></br>
                                    Instructor: {favorite.instructor}
                                    <br></br>
                                    Rating of this class: {Math.round(favorite.rating * 100) / 100}
                                </Card.Text>
                            </Card>
                            <br></br>
                        </div>
                    )
                }
                )}
            </div>




        </div>

    )
}


export default Catastrophic