import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./MyFavorite.css";
import "./MyReviews.css";
import { FaHeartbeat, FaHotjar, FaFire } from "react-icons/fa";
import { IconContext } from "react-icons";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoursesDataService from "../services/courses";

function MindBlowing() {
    const [cards, setCards] = useState([]);

    const retriveMindBlowingClass = useCallback(() => {

        CoursesDataService.getAllCourse().then(response => {
            console.log("get all courses response.data: ", response.data.coursesList)
            setCards(response.data.coursesList);
        })
            .catch(e => {
                console.log(e);
            });

    }, []);

    useEffect(() => {
        retriveMindBlowingClass();
    }, [retriveMindBlowingClass]);

    return (

        <div className="mindBlowingTitle">
            <br></br>
            <h1>NEU Students' Top three favorite classes:
                <span> </span>
                <FaHeartbeat />
                <span> </span>
                <FaHeartbeat />
                <span> ... </span>
                <span>
                    <FaHeartbeat className="spanStyle1" /></span>
            </h1>

            <motion.img
                className="backgroundPoster"
                src="/images/MC2 3.jpeg" alt="Avatar"
                animate={{
                    scale: [0.7, 0.8, 0.9, 0.9, 0.8],
                    borderRadius: ["20%", "20%", "50%", "50%", "50%"],
                    rotate: [0, 0, 270, 270, 0]
                }}
                transition={{ duration: 3 }}
            />

            <div>
                <br></br>
                {cards.sort((a, b) => (a.number_of_favorites > b.number_of_favorites) ? 1 : -1).reverse().slice(0, 3).map((favorite, index) => {
                    return (
                        <div>
                            <Card className="favoritesCard " >
                                <IconContext.Provider value={{ className: "fire", size: 50 }}>
                                    <>
                                        <FaHotjar />
                                    </>
                                </IconContext.Provider>

                                <div className="ranking">
                                {index+1}
                                </div>

                                <Card.Text className="favoritesTitle">
                                    Course Name: {favorite.course_name}
                                    <br></br>
                                    Instructor: {favorite.instructor}
                                    <br></br>
                                    Total Students Favorites this class: {favorite.number_of_favorites}
                                </Card.Text>
                            </Card>
                            <br></br>
                        </div>

                    )
                }
                )}
            </div>
        </div >
    )
}


export default MindBlowing