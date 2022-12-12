import React, { useState } from 'react';
import ReviewService from "../services/reviews";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Rating } from 'react-simple-star-rating'


const AddReview = ({ user }) => {
  const navigate = useNavigate()
  let params = useParams();
  let current = useLocation().state; // state passed from link tag

  let editing = false;
  let initialReviewState = "";

  // initialReviewState will have a different value we are editing an existing review
  if (current) {
    editing = true;
    initialReviewState = current.currentReview.review
    //console.log("current.currentReview:" )
    //console.log(current.currentReview)
  }

  const [review, setReview] = useState(initialReviewState);
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Catch Rating value
  const handleRating = (rate) => {
    console.log(`current rating :${rate}`);
    setRating(rate);
  }
  const onPointerMove = (value, index) => console.log(value, index);
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')

  const onChangeReview = e => {
    const review = e.target.value;
    setReview(review);
    //console.log("Review in OnChangeReview");
    //console.log(review);
  }



  const handleSelect = (e) => {
    console.log(e);
    if (e === 'Anonymous') {
      console.log("setting..")
      setIsAnonymous(true);
      console.log(isAnonymous);
    }
    else {
      setIsAnonymous(false);
      console.log(isAnonymous);
    }
  }
  const saveReview = () => {
    var data = {
      review: review,
      name: user.name,
      user_id: user.googleId,
      rating: rating,
      course_id: params.id, //get movie id from url
      isAnonymous: isAnonymous
    }
    if (editing) {
      console.log("editing");
      data.review_id = current.currentReview._id;
      console.log("current data::");
      console.log(data)
      ReviewService.updateReview(data)
        .then(response => {
          navigate("/courses/" + params.id)
        })
        .catch(e => {
          console.log("??" + e)
        });

    } else {
      console.log("creating");
      ReviewService.createReview(data)
        .then(response => {
          navigate("/courses/" + params.id)
        })
        .catch(e => {
          console.log(e)
        });
    }
  }



  return (

    <Container className="main-container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label > {editing ? "Editing" : "Creating"} Review</Form.Label>
          <>
            <div >
              <Rating
                onClick={handleRating}
                onPointerMove={onPointerMove}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                size={50}
                allowHover={true}
                allowFraction={true}

              />
            </div>
          </>
          <div className="App container">
            <br></br>

            <DropdownButton
              alignRight
              title="Comment as"
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="Named">{user.name}</Dropdown.Item>
              <Dropdown.Item eventKey="Anonymous">Anonymous</Dropdown.Item>

            </DropdownButton>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Form.Control
            as="textarea"
            type="text"
            required
            review={review}
            onChange={onChangeReview}
            defaultValue={editing ? review : ""}
          />
        </Form.Group>

        <Button variant='primary' onClick={saveReview}>
          Submit
        </Button>


      </Form>
    </Container>
  )
}

export default AddReview;
