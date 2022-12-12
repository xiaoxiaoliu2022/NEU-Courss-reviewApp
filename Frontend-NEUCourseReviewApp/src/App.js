import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyFavorite from "./components/MyFavorite";
import MindBlowing from "./components/MindBlowing";
import Catastrophic from "./components/Catastrophic";
import CourseList from "./components/CourseList";
import MyReviews from "./components/MyReviews";
import Hero from "./components/Hero";
import Course from "./components/Course";
import AddReview from "./components/AddReview";
import FavoritesDataService from './services/favorites.js';
import CourseDataService from './services/courses.js'
import Info from './components/Info'

// uncomment below if using microsoft login api
// import { useIsAuthenticated } from "@azure/msal-react";
// import { SignInButton } from "./components/SignInButton";
// import { SignOutButton } from "./components/SignOutButton";
// import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
// import { useMsal } from "@azure/msal-react";
// import { useMsalAuthentication } from "@azure/msal-react";
// import { useAccount } from "@azure/msal-react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Logout from './components/Logout';
import Search from "./components/Search";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [flag, setFlag] = useState(false);
  const addFavorite = (courseId, numOfFavorites) => {
    setFavorites([...favorites, courseId]);
    updateNumOfFavorites(courseId, numOfFavorites + 1);
  };
  const deleteFavorite = (courseId, numOfFavorites) => {
    setFavorites(favorites.filter(f => f !== courseId));
    updateNumOfFavorites(courseId, numOfFavorites - 1);
  };

  const updateNumOfFavorites = (courseId, numOfFavorites) => {
    var data = {
      numOfFavorites: numOfFavorites,
      courseId: courseId
    }
    CourseDataService.updateNumOfFavorites(data)
      .catch(e => {
        console.log(e);
      });
  }

  const getFavorites = useCallback(() => {
    if (user) {
      FavoritesDataService.getFavorite(user.googleId)
        .then(response => {
          setFavorites(response.data.favorites);
          setFlag(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [user]);

  const updateFavorites = useCallback(() => {
    if (user && flag) {
      var data = {
        _id: user.googleId,
        favorites: favorites,
      }
      FavoritesDataService.updateFavorite(data)
        .catch(e => {
          console.log(e);
        });
    }
  }, [favorites, user, flag]);//if we  do not use callback at the same time, we may encounter data delay problem, db can not update data
  // in time either

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    updateFavorites();
  }, [updateFavorites]);
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now() / 1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
          <Container className="container-fluid">
            <Navbar.Brand className="brand" href="/">
              Course Review
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="reponsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to={"/courses"}>
                  Courses
                </Nav.Link>

                <Nav.Link as={Link} to={"/myreview"}>
                  MyReviews
                </Nav.Link>
                <Nav.Link as={Link} to={"/favorites"}>
                  My Favorite Classes
                </Nav.Link>
                <Nav.Link as={Link} to={"/mindBlowing"}>
                  Mind-Blowing
                </Nav.Link>
                <Nav.Link as={Link} to={"/Catastrophic"}>
                  Catastrophic && Confusing
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            {/* uncomment below if using microsoft login api */}
            {/* {isAuthenticated ? <SignOutButton /> : <SignInButton />} */}
            {user ? (
              <Logout setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
            )}
          </Container>
        </Navbar>

        {/* uncomment below if using microsoft login api */}
        {/* <AuthenticatedTemplate>
          <p>Signed in as: {account?.username},{account?.localAccountId}</p>
        </AuthenticatedTemplate> */}
        {/* <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate> */}

        <Routes>
          <Route exact path={"/"} element={
            <Hero />}
          />
          <Route exact path={"/review"} element={
            <CourseList
            />}
          />
          <Route exact path={"/courses"} element={
            <CourseList
              user={user}
              addFavorite={addFavorite}
              deleteFavorite={deleteFavorite}
              favorites={favorites}
            />}
          />
          <Route path={"/courses/:id/"} element={
            <Course user={user} />} />


          <Route exact path={"/myreview"} element={
            <MyReviews user={user} />}
          />
          
          <Route path={"/favorites"} element={
            user ?
              <MyFavorite user={user} />
              :
              <Info />
          }
          />
          <Route exact path={"/mindBlowing"} element={
            <MindBlowing />}
          />

          <Route exact path={"/Catastrophic"} element={
            <Catastrophic />}
          />
          <Route path={"/courses/:id/review"} element={
            <AddReview Review user={user} />} />

          <Route exact path={"/search"} element={
            <Search user={user} 
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
            favorites={favorites}/>}></Route>

        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}
export default App;