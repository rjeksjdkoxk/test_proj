const mongoose = require('mongoose');

const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String, required: [true, 'name is req'], trim: true,
    }, price: {
        type: Number, required: [true, 'price is req'],
    }, featured: {
        type: Boolean, default: false
    }, rating: {
        type: Number, default: 4.5
    }, createdAt: {
        type: Date, default: Date.now()
    }, company: {
        type: String, enum: {
            values: ['ikea', 'caressa', 'liddy', 'marcos'], message: '{VALUE} is not supported'
        }
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product