const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async callback => {
    try {
        const client = await MongoClient.connect('mongodb+srv://shazaib:5gUDaAp76a0SXYWo@nodejscluster.dkico.mongodb.net/shop?retryWrites=true&w=majority');
        _db = client.db();
    } catch (error) {
        throw error;
    }
}
 
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
