const mongoose = require ('mongoose');

var Schema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true
    },
    idade: { 
        type: Number,
        required: true
    },
    altura: { 
        type: Number,
        required: true
    },
    peso: { 
        type: Number,
        required: true
    },
    sexo: { 
        type: String,
        required: true
        
    },
    sintomas: { 
        type: String,
        required: true
        
    },
    teste: { 
        type: String,
        required: true
    },
    cronico: { 
        type: String,
        required: true
    },
    risco: { 
        type: String,
        required: true
    },
    mental: { 
        type: String,
        required: true
    },
    imc: { 
        type: Number,
        required: true
    }

})

const Userdb = mongoose.model('userdb', Schema);
module.exports = Userdb;