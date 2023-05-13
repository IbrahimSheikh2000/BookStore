import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()
import bookController from '../controllers/bookController.js'
import checkUserAuth from '../middleware/auth-middleware.js'
import reviewController from '../controllers/reviewController.js'

//auth middleware

router.use('/addreview', checkUserAuth)
router.use('/modifyreview', checkUserAuth)
router.use('/deletereview', checkUserAuth)


//public routes
router.get('/books', bookController.getBook)
router.post('/addbook', bookController.addBooktoDatabase)
router.post('/register-user', userController.registerUser)
router.post('/login', userController.userLogin)
router.get('/get-book-by-isbn/:isbn', bookController.getBookbyISBN)
router.get('/bookbyauthor/:author', bookController.getBookbyAuthor)
router.get('/bookbytitle/:title', bookController.getBookbytitle)
router.get('/getbookreviews', reviewController.getReview)
router.get('/getbookbygenre', bookController.getbookbyGenre)


//protected routes
router.post('/addreview', reviewController.addReview)
router.post('/modifyreview', reviewController.modifyReview)
router.post('/deletereview', reviewController.deleteReview)


export default router