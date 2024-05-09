
const mongoose = require("mongoose");
const { mongo_url } = require("../config/config");
const { log } = require("winston");


class BaseDatos {
    static #instance;

    constructor(){
        mongoose.connect(mongo_url)
    }
    static getInstance(){
        if( this.#instance){
            console.log("Conexion Previa");
            return this.#instance
        }
        this.#instance = new BaseDatos()
            console.log("Conexion Exitosa!!");
        return this.#instance
    }
}
 module.exports = BaseDatos.getInstance();


