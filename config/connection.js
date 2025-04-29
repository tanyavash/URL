
const mongoose = require('mongoose')

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = {
    connectToMongoDB,
}
