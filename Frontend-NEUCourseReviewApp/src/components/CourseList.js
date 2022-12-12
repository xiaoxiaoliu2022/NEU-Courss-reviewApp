import React, { useState, useEffect, useCallback, useRef } from "react";
import CourseDataService from "../services/courses";
import FavoritesDataService from "../services/favorites";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import MyFavorite from "./MyFavorite";
import "./CoursesList.css";
import { BsStar, BsStarFill } from "react-icons/bs";


// import { findByTitle } from "@testing-library/react";
// import  Image  from "react-bootstrap/Image";
const CoursesList = ({
  user,
  favorites,
  addFavorite,
  deleteFavorite,
  search,
  searchMode,
}) => {
  //use state to set state values
  const ref = useRef(null);
  const [courses, setCourses] = useState([]);
  const [searchTitle, setSearchTitle] = useState(search ? search : "");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["See the Catastrophic && Confusin ones"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState(searchMode ? searchMode : "")
  const [flag, setFlag] = useState(false);

  // useCallback to define functions which should only be created once and will be dependencies for useEffect
  const animateFavNums = (startValue, endValue, courseId) => {
    if (startValue == endValue) {
      return
    }
    var elementId = courseId + "_numOfFav";
    var valueDisplay = document.getElementById(elementId);
    const interval = 30;
    let duration = endValue - startValue;
    let durationStep = Math.floor(interval / Math.abs(duration));
    let counter = setInterval(function () {
      startValue = duration > 0 ? startValue + 1 : startValue - 1;
      valueDisplay.textContent = startValue;
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, durationStep);
  };

  useEffect(() => {
    if (ref.current) {
      courses.forEach((course) => {
        animateFavNums(0, course.number_of_favorites, course._id);
      })
    }

  }, [courses]);


  const retrieveRatings = useCallback(() => {
    CourseDataService.getRatings()
      .then(response => {
        setRatings(["See the Catastrophic && Confusin ones"].concat(response.data))
      })
      .catch(e => {
        console.log(e);
      });

  }, []);

  const retrieveCourses = useCallback(() => {
    setCurrentSearchMode("");
    CourseDataService.getAll(currentPage)
      .then(response => {
        setCourses(response.data.courses);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
        setFlag(true);
      })
      .catch(e => {
        console.log("Fail to get courses")
        console.log(e);
      });
  }, [currentPage]);

  const find = useCallback((query, by) => {
    CourseDataService.find(query, by, currentPage)
      .then(response => {
        setCourses(response.data.courses);
      })
      .catch(e => {
        console.log(e);
      });
  }, [currentPage]);


  const findByTitle = useCallback(() => {
    if (searchTitle) {
      // console.log("find by title")
      setCurrentSearchMode("findByTitle");
      find(searchTitle, "title");
    }

  }, [find, searchTitle]);

  useEffect(() => {
    findByTitle();
  }, [find, searchTitle]);

  const findByRating = useCallback(() => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveCourses();
    } else {
      find(searchRating, "rated");
    }
  }, [find, searchRating, retrieveCourses]);
  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else {
      // console.log("currentSearchMode" + currentSearchMode);
      retrieveCourses();
    }
  }, [currentSearchMode, findByTitle, findByRating, retrieveCourses]);
  // Use effect to carry out side effect functionality
  useEffect(() => {
    retrieveRatings();
  }, [retrieveRatings]);

  useEffect(() => {

    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveNextPage();
  }, [currentPage, retrieveNextPage]);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }


  return (
    <div ref={ref} className="App">
      <Container className="main-container">
        <br></br>
        <Form>
          <Row>
            <Col>
              <Link to="/mindBlowing" className="btn btn-success ">See mind-blowing courses</Link>
            </Col>
            <Col></Col>
            <Col>
              <Link to="/Catastrophic" className="btn btn-danger float-right">See the Catastrophic && Confusin ones</Link>
            </Col>
          </Row>
        </Form>

        <Row className="courseRow">
          {courses.map((course) => {
            return (
              <Col key={course._id}>
                <Card className="coursesListCard">
                  <span className="num" id={course._id + "_numOfFav"} data-val={course.number_of_favorites.toString()}>0</span>

                  {
                    user &&
                    (
                      favorites.includes(course._id) ?
                        <BsStarFill className="star starFill" onClick={() => {
                          animateFavNums(course.number_of_favorites, course.number_of_favorites - 1, course._id)
                          deleteFavorite(course._id, course.number_of_favorites);
                          course.number_of_favorites = course.number_of_favorites - 1;
                        }} />
                        :
                        <BsStar className="star starEmpty" onClick={() => {
                          animateFavNums(course.number_of_favorites, course.number_of_favorites + 1, course._id)
                          addFavorite(course._id, course.number_of_favorites);
                          course.number_of_favorites = course.number_of_favorites + 1;
                        }} />

                    )}

                  {/* <Card.Img
                    className="smallPoster"
                    src={course.pic + "/100px180"}

                  /> */}
                  <Card.Body>
                    {/* <BsHeart className="heart heartEmpty" /> */}

                  </Card.Body>
                  <Card.Body>
                    <div className="wrapper">
                      <div className="container">
                        {/* <span className="num" data-val={course.number_of_favorites.toString()}>0</span> */}
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title> {course.course_name}</Card.Title>
                    <Card.Text>
                      Course Code:{course.course_number}
                    </Card.Text>
                    <Card.Text>
                      Instructor:{course.instructor}
                    </Card.Text>
                    <Card.Text>
                      District:{course.district}
                    </Card.Text>
                    <Card.Text>

                      Prerequisites:{course.prerequisites}
                    </Card.Text>
                    <Card.Text>
                      Course Description:{course.course_description}
                    </Card.Text>

                    <Link className="reviewLink" to={"/courses/" + course._id}>
                      View Reviews
                    </Link>
                  </Card.Body>
                  <Card.Body>
                    <Card.Text className="rating">
                      Rating:{course.rating}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
        <br className="showingPage" />
        Showing page: {currentPage + 1}.
        <Link className="button"
          variant="link"
          onClick={() => { setCurrentPage(currentPage + 1) }}>
          Explore next {entriesPerPage} courses
        </Link>
      </Container>
    </div>
  )
}

export default CoursesList;
