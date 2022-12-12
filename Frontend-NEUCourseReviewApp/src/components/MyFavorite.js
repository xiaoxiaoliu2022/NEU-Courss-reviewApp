import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./MyFavorite.css";
import "./MyReviews.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FavoritesDataService from "../services/favorites";

function MyFavorite({ user }) {
    const [favoriteClassList, setFavoriteClassList] = useState([]);
    const [counterState, setCounter] = useState(0);
    let timer;
    const retriveFavoriteClass = useCallback(() => {
        if (user) {
            FavoritesDataService.getFavoriteClass(user.googleId).then(response => {
                console.log("getFavoriteClass response.data: ", response.data)
                setFavoriteClassList(response.data);

            })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [user]);

    useEffect(() => {
        retriveFavoriteClass();
    }, [retriveFavoriteClass]);

    useEffect(() => {
        let counter = 0;
        clearInterval(timer)
        timer = setInterval(() => {
            if (counterState === 5) {
                clearInterval(timer)
                return
            }
            setCounter(prev => prev + 1)
            counter += 0.1

        }, 150)

        return () => clearInterval(timer)
    }, [counterState])

    return (
        <div>
            <div className="favoritesTitle">
                <h1>My Favorite Classes: 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                </h1>
            </div>
            <br></br>

            <Col>
                {favoriteClassList.map((favorite, index) => {
                    console.log("favorite", favorite);
                    return (
                        <div>
                                <div>
                                    <Card className="favoritesCard " >
                                        <div className="favoritesNumber">
                                            <div>{counterState}</div>
                                        </div>
                                        <Card.Text className="favoritesTitle">

                                            {favorite.course_name}
                                            <br></br>
                                            5 Stars Instructor in My Eye: {favorite.instructor}
                                            <span> </span>


                                        </Card.Text>

                                        <Card.Img
                                            className="favoritesPoster"
                                            src="/images/course_standin.png"
                                            onError={e => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "/images/course_standin.png";
                                            }}
                                            alt="Poster" />

                                    </Card>
                                    <br></br>
                                </div>
                            </div>


                    )
                }


                )

                }

            </Col>

            <motion.img
                className="favPoster"
                src="/images/MC2 1.jpeg" alt="Avatar"
                animate={{
                    x: 900,
                    opacity: 1,
                }}
                initial={{ opacity: 0.1 }}
                transition={{
                    type: "spring",
                    stiffness: 100
                }}

            />


        </div>
    )
}


export default MyFavorite