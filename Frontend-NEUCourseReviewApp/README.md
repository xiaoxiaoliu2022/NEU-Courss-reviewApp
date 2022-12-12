# NEUCourseReviewApp Group Project Iteration 3

## What did Xinyue do:
Create page for reminding user to login when user trying to access myFavoriate page.
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/readme-xinyue/screenshot/Login_info.png)


## What did Qiuyu do:
1. Make sure the frontend of favorite, mindblowing, and catastrophic tabs are linking to the bad end <br />
2. Add Code for the mindblowing, and catastrophic tabs.<br />
My Favorite tab  <br />
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/favFront.png?raw=true)
Mindblowing tab  <br />
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/MindBlowing.png?raw=true)
Catastrophic and confusing tab  <br />
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/cc.png?raw=true)



## What xiaoxiao did:
1. Complete rolling number funcition. When "favorite a course" backend will be called , the number of favs will increase by one, otherwise decrease by one.

<p>
    <img src="screenshot/increase.png" width="800" height="500" />
</p>
2. The animation works correctly with the change of number of favorites

<p>
    <img src="screenshot/decrease.png" width="800" height="500" />
</p>

## What Yanlin did:
1. Finsh backend part to update the average rating of a course when a new requst created to CRUD review.
Explained as below:
At first there is only one rating of 2 about this course as we can see from database;
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/beforeaddingnewRating.png?raw=true)
then user create a new review with rating of 0.5
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/createReview.png?raw=true)
the average rating of this course has a change from 2 to 1.25
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/afternewrating.png?raw=true)
2. Use DropDown, which is a Bootstrap UI component to allow user to leave comment as anonymous or non-anonymous.
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/dropdown.png?raw=true)
<br />



# NEUCourseReviewApp Group Project Iteration 2
## What did Xinyue do:
Built homepage and google, microsoft authentication<br />
Create Search page and let user search by course name or instructor.(configure DB index)<br />
![Demo](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/readme-xinyue/screenshot/demo_search.gif)


## What did Qiuyu d0:
Built the frontend of favorite, mindblowing, and catastrophic tabs <br />
Link the frontend with database <br />


Motion library  <br />
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/motion.png?raw=true)
Start setting up favorite favorite. Please see below screenshot for reference.<br />

## What xiaoxiao did:

Add counting favorites function to courseList  <br />
Deploy frontend and backend to heroku with teammembers.  <br />
<p>
    <img src="screenshot/addCouning.png" width="800" height="500" />
</p>

<p>
    <img src="screenshot/deploy.png" width="800" height="500" />
</p>

## What Yanlin did:
Finish page getting reviews for user. Each user's reviews are composed of reviews left as named person or anonymous person. If user doesn't sign in, the page cannot show her/his reviews.
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/myreviewsignout.png?raw=true)
![alt text](https://github.khoury.northeastern.edu/NEU-CS5610-FA22/Frontend-NEUCourseReviewApp/blob/main/screenshot/myreviewsignin.png?raw=true)
