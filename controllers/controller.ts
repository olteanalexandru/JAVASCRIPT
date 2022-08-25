export {};

// auto try catch
const asyncHandler = require('express-async-handler')
const Movie= require('../models/movie');
const moment= require('moment');

let secretKey = 1234;

interface Response {
    status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any } }
}
type NewType = {
    secretKey: number;
    availableOnDvd: any;
    takings: number;
    plot: string;
    year: number;
    title: string;
    genre: string;
    appointment: String;
    name: string;
    id: string;
    _id: string;
};

interface Request {
    secretKey: number;
    movie: any;
    user: { id: number },
    body: NewType
    params: { id: number; }
}

//@route GET /api/movies
//@acces Private
const getMovie= asyncHandler(async (req: Request ,res: Response) => {
    const movies = await Movie.find({movies: req.movie.id})
    res.status(200).json(movies)
    //res.status(200).json({message:'Get Movies'})
})


//@route GET /api/movies/movies
//@acces Public

const getAllMovies = asyncHandler(async (req: Request ,res: Response) => {
    const movies = await Movie.find({})
    res.status(200).json(movies)
    
})

//@route GET /api/movies/movies/:id
//@acces Public
const GetSpecific = asyncHandler(async (req: Request, res: Response) => {
    const movies = await Movie.findById( req.params.id );
    res.status(200).json(movies);
    //res.status(200).json({message:'Get Movies'})
});

//@route SET /api/movies
//@acces Private
const SetMovie =  asyncHandler( async  (req: Request, res: Response) => {
    if (!req.body.title){
    res.status(400)
    throw new Error('Missing title')
    
};
if (!req.body.year){
    res.status(400)
    throw new Error('Missing year ')
    
};
if (req.body.secretKey != secretKey){
    res.status(400)
    throw new Error('Missing secretKey ')
    
};


var date = new Date();
var formattedDate = moment(date).format('YYYYMMDD');

if (req.body.appointment){
    if (req.body.appointment < formattedDate ){
        res.status(400)
        throw new Error('Appointment is in the past')
    }
} 


const movie = await Movie.create({ 
    title: req.body.title,
    year: req.body.year,
    plot:req.body.plot,
    takings:req.body.takings,
    availableOnDvd:req.body.availableOnDvd,
    appointment:req.body.appointment,
    name:req.body.name


})
res.status(200).json(movie)
})




//@route PUT /api/goals
//@acces Private
const PutMovie=asyncHandler( async (req: Request,res: Response)=> {

    const movie = await Movie.findById(req.params.id)

   if(!movie){
       res.status(400)
       throw new Error('missing movie')
   }
   if (req.body.secretKey != secretKey){
    res.status(400)
    throw new Error('Missing secretKey ')
    
};

   
   const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
       new:true,
   })

    res.status(200).json(updatedMovie)
})


//@route DELETE /api/goals
//@acces Private

const DeleteMovie =asyncHandler( async (req: Request ,res: Response) =>{

    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error('missing movie')
    }
    
    if (req.body.secretKey != secretKey){
        res.status(400)
        throw new Error('Missing secretKey ')
    }


     await movie.remove()
 
     res.status(200).json({id:req.params.id})
})

module.exports = {
    getMovie,
    getAllMovies,
    SetMovie,
    PutMovie,
    DeleteMovie,
    GetSpecific

}
