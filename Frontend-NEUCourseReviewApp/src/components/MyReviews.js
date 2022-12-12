import React, { useCallback, useEffect, useState } from 'react'
import ReviewService from '../services/reviews'
import './MyReviews.css'
import './StarShowing.css'
import Card from 'react-bootstrap/Card';


const MyReviews = ({user})=> {

  const [namedreviews, setNamedReviews] = useState([]);
  const [anonymousreviews, setAnonymousReviews] = useState([]);


  const retrieveAnonymousReviews = useCallback( ()=>{
    if(user){
      console.log("retrieving Anonymous Reviews...");
      console.log(user.googleId);
      ReviewService.getAnonymousReviews(user.googleId)
      .then( response=>{
       setAnonymousReviews(response.data);
       })
       .catch(e=>{
       console.log(`Error in retrieveAnonymousReviews ${e}`);
      })
    }
    
  },[user])

  const retrieveNamedReviews = useCallback( ()=>{
    if(user){
      console.log("retrieving Named Reviews...");
      ReviewService.getNamedReviews(user.googleId)
      .then( response=>{
      setNamedReviews(response.data);
      })
     .catch(e=>{
      console.log(`Error in retrieveNamedReviews ${e}`);
     })
    }
    
  },[user])

  

  useEffect( ()=>{
     retrieveAnonymousReviews();
     console.log("AnonymousReviews======");
     console.log(anonymousreviews.length);
  },[retrieveAnonymousReviews])

  useEffect( ()=>{
    retrieveNamedReviews();
    console.log("NamedReviews======");
     console.log(namedreviews.length);
 },[retrieveNamedReviews])
  
  return (
    
  
    <div>
      <div className="container">
        <div className="section-title text-black text-center">  
           {user?<h1>{'Reviews as '+ user.name}</h1>: <h1>Reviews as non-anonymous</h1>}
        </div>
        <div className="row text-white">
           
           {namedreviews.map(   (namedreview) =>{
            return (
            
              <div className="col-lg-3 col-md-6 sm-item" width="33%" data-aos="fade-up">
               <div className="reviewCard">
                <Card.Img
                  className = "review-cover"
                  src = {namedreview.course_info.pic + "/100px180"}
                  onError={e=>{e.currentTarget.onerror = null; 
                               e.currentTarget.src ="/images/course_standin.png";
                          }}
                  alt="Poster"/>

                  <h2 className='review-text'>{'CS'+ namedreview.course_info.course_number}</h2>
                  <h4 className='review-text'>{namedreview.course_info.instructor}</h4>
                  <div className='rating'>
                     {[...Array(Math.floor(namedreview.rating))].map((_, index) => <i class="fa fa-star checked" key={index}></i>)}
                     {(namedreview.rating%1!== 0) ? <i class="fa fa-star-half-full checked"></i>:<></>}
                     {[...Array(5-Math.round(namedreview.rating))].map((_, index) => <i class="fa fa-star none" key={index}></i>)}
                  </div>
              <div className="review-text">
                <p> {namedreview.review}</p>
              </div>
            </div>
          </div>
          )
          })}           
        </div>      
      
       
        <div className="section-title text-black text-center">
  
          <h1>Reviews as Anonymous</h1>
        </div>
        <div className="row text-white">

          {anonymousreviews.map( anonreview => {
              return(
                <div className="col-lg-3 col-md-6 sm-item" width="33%" data-aos="fade-up">
                <div className="reviewCard">
              
                  <Card.Img
                     className = "review-cover"
                     src = "/images/course_standin.png"
                     onError={e=>{e.currentTarget.onerror = null; 
                                  e.currentTarget.src = "/images/course_standin.png";
                                  }}
                      alt="Poster"/>
    
                  <h2 className='review-text'>{'CS'+ anonreview.course_info.course_number}</h2>
                  <h4 className='review-text'>{anonreview.course_info.instructor}</h4>
                 <div className='rating'>
                  
                  {[...Array(Math.floor(anonreview.rating))].map((_, index) => <i class="fa fa-star checked" key={index}></i>)}
                  {(anonreview.rating%1!== 0) ? <i class="fa fa-star-half-full checked"></i>:<></>}
                  {[...Array(5-Math.round(anonreview.rating))].map((_, index) => <i class="fa fa-star none" key={index}></i>)}
                  </div>
                  <div className="review-text">
                    <p> {anonreview.review}</p>
                  </div>
                </div>
              </div>
              )
          })}
        </div>
      </div>
    </div>
    
        
  
  )
}

export default MyReviews