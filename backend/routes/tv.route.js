import express from 'express'
import { getTredingTV, getSimilarTV, getTVDetails, getTVTrailer, getTVbyCategories } from '../controllers/tv.controller.js'
const router = express.Router()

router.get('/trending', getTredingTV)
router.get('/:id/trailers', getTVTrailer)
router.get('/:id/details', getTVDetails)
router.get('/:id/similar', getSimilarTV)
router.get('/:category', getTVbyCategories)

export default router