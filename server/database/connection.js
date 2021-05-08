const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        //String de Conexao com mongoDB
        const con = await mongoose.connect("mongodb+srv://user_mtest:268450@cluster0.k8lca.mongodb.net/teste?retryWrites=true&w=majority", {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('MongoDb Connected: ${con.connection.host}');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB