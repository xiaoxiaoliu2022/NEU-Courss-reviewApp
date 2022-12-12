import React from 'react'
import { Link, useSearchParams} from 'react-router-dom';
import CourseList from './CourseList';
export default function Search({user, addFavorite, deleteFavorite, favorites}) {
  let [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q")
  // console.log(searchParams)
  // console.log(query)
  return (
    <div>
      <CourseList user={user}
       addFavorite={addFavorite}
       deleteFavorite={deleteFavorite}
       favorites={favorites}
       search={query}
       searchMode="findByTitle"/>
    </div>
  )
}
