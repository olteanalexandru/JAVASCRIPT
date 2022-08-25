export {};
const express = require('express')
const router = express.Router()
const { getMovie,SetMovie,PutMovie,DeleteMovie , getAllMovies , GetSpecific} = require ('../controllers/controller') 


// router.get('/',(req,res)=> {
//     res.status(200).json({message:'Get movie'})
// }) /* <-- acestea se afla acum in controller */

router.route('/').get(getMovie).post(SetMovie)
router.route('/movies').get(getAllMovies)
router.route('/movies/:id').get(GetSpecific)
router.route('/:id').put(PutMovie).delete(DeleteMovie)

module.exports = router;




