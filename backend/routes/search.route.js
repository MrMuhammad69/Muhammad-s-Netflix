import express from "express";
import { searchMovie, searchPerson, searchTV, getSearchHistory, removeitemfromsearchlist } from "../controllers/search.controller.js";
const router = express.Router()
//aaron paul
router.get("/person/:query", searchPerson)
router.get("/movie/:query", searchMovie)
router.get("/tv/:query", searchTV)

router.get('/history', getSearchHistory)

router.delete('/history/:id', removeitemfromsearchlist)

export default router