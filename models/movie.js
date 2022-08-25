"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//create movie schema
const movieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: false },
    year: { type: Number, required: true },
    plot: { type: String, required: false },
    takings: { type: Number, required: false },
    availableOnDvd: { type: Boolean, required: false },
    appointment: { type: String, required: false },
    name: { type: String, required: false }
}, { timestamps: false, });
//create genre schema
/*const genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
}); */
//create genre model
//const Genre = mongoose.model('Genre', genreSchema);
//export as Movie 
module.exports = mongoose_1.default.model('Movie', movieSchema);
