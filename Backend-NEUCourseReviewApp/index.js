import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import CoursesDAO from './dao/coursesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.COURSEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000;
    // will get env varible from both 
    try {
        // connect to MongoDB server
        await client.connect();
        await CoursesDAO.injectDB(client);
        await client.connect();
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);
        app.listen(port, () => {
            console.log('Server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);