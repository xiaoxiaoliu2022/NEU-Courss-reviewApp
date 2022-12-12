import React, { useState, useEffect } from "react";
import CourseDataService from "../services/courses";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import moment from "moment";
// import ReplacementImage from "./git.png";
import "./Course.css";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsDown, BsHandThumbsDownFill } from "react-icons/bs";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";

const Course = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();
    const [course, setCourse] = useState({
        id: null,
        course_name: "",
        rating: "",
        reviews: []
    });
    useEffect(() => {
        const getCourse = id => {
            CourseDataService.getSingleCourse(id).then(response => {
                setCourse(response.data);
                console.log(response.data.reviews);
            })
                .catch(e => {
                    console.log(e);
                });


        }
        getCourse(params.id)
    }, [params.id]);
    return (
        <div>
            <Container >
                <Row>
                    <Col>
                        {/* <div className="poster">
                            <Image
                                className="bigPicture"
                                src={course.pic + "/100px250"}
                                onError={(e) => {
                                    e.target.src = ReplacementImage
                                }}
                                fluid />
                        </div> */}
                    </Col>
                    <Col>
                        <Card className="courseInfo" >
                            <Card.Body >

                                <Card.Text className="favoritestext">
                                    Favorites: {course.number_of_favorites}
                                </Card.Text>
                            </Card.Body>
                            <Card.Header as="h5">{course.course_name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {course.instructor}
                                </Card.Text>
                                <Card.Text>
                                    {course.district}
                                </Card.Text>
                                {/* <Card.Text>
                                    {course.prerequisites}
                                </Card.Text> */}
                                <Card.Text>
                                    {course.course_description}
                                </Card.Text>

                                {
                                    user &&
                                    <Link className="addReview" to={"/courses/" + params.id + "/review"} >
                                        Add Review
                                    </Link>}
                            </Card.Body>

                            <Card.Body >
                                <BsHandThumbsUp className="up" />
                                <Card.Text className="ratingtext">
                                    Rating: {course.rating}
                                </Card.Text>
                            </Card.Body>

                        </Card>
                        <h4 className="reviews">Reviews</h4>
                        <br></br>
                        {course.reviews.map((review, index) => {
                            return (

                                <div className="d-flex">
                                    <div className="flex-shrink-0 reviewsText">

                                        <h7>{(review.isAnonymous? "Anonymous" :review.name) + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}:</h7>
                                        <div className='rating'>
                  
                                        {[...Array(Math.floor(review.rating))].map((_, index) => <i class="fa fa-star checked" key={index}></i>)}
                                        {(review.rating%1!== 0) ? <i class="fa fa-star-half-full checked"></i>:<></>}
                                        {[...Array(5-Math.round(review.rating))].map((_, index) => <i class="fa fa-star none" key={index}></i>)}
                                        </div>
                                        <Card>
                                            <Card.Body className="reviewContent">
                                                <p className="review">{review.review}</p>

                                            </Card.Body>
                                        </Card>


                                        {
                                            user && user.googleId === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link className="edit" to={{
                                                        pathname: "/courses/" + params.id + "/review"
                                                    }}
                                                        state={{
                                                            currentReview: review
                                                        }}>
                                                        Edit
                                                    </Link>

                                                </Col>
                                                <Col>
                                                    <Link className="delete" onClick={() => {

                                                        var data = {
                                                            review: review,
                                                            user_id: user.googleId,
                                                            review_id: review._id
                                                        }
                                                        CourseDataService.deleteReview(data).then(response => {
                                                            navigate("/courses/" + params.id)
                                                        })
                                                            .catch(e => {
                                                                console.log(e);
                                                            });

                                                        setCourse((prevState) => {
                                                            prevState.reviews.splice(index, 1);
                                                            return ({
                                                                ...prevState
                                                            })
                                                        })

                                                    }}>
                                                        Delete
                                                    </Link>
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
            {/* Placeholder text for Course */}
        </div>
    )
}

export default Course;