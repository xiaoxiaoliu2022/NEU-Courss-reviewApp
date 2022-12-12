import { Link, useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import CourseList from './CourseList';
import './Hero.css'

export default function Hero() {
  const [searchTitle, setSearchTitle] = useState("");
  let navigate = useNavigate(); 
  let params = useParams();
  function findByTitle() {
    console.log("title:" + searchTitle);
    // return (<Link to={"/courses"}></Link>);
  }

  // Other functions that are not depneded on by useEffect
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }
  return (
    <div className='hero'>
      <img className='my_img' src='/images/mc2.jpeg' />
      {/* <div className='overlay'> */}

      <div className='content'>

        <h1>Northeastern University</h1>
        <h2>Computer Science</h2>
        <form className='form'>
          <div><input type='text' placeholder='Search Courses or Instructors'
            value={searchTitle}
            onChange={onChangeSearchTitle} /></div>
          <div>
          <Link className="reviewLink" to={"/search?" + new URLSearchParams({q: searchTitle}).toString()}>
          <button className='my_button' onClick={()=>findByTitle()}><AiOutlineSearch className='icon' /></button>
                    </Link>
            {/* <button className='my_button' onClick={()=>findByTitle()}><AiOutlineSearch className='icon' /></button> */}
          </div>
        </form>
        <h1 >Evaluation = Mind-blowing || Catastrophic && Confusing </h1>
        <h1 >E = MC^2</h1>
      </div>
      <div>
        {/* <CourseList title={searchTitle}/> */}
      </div>
    </div>


  );
  // <footer>Copy right @NEU 2022</footer>
}
