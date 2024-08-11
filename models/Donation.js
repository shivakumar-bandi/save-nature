const mongoose =require('mongoose')

const donationSchema =new mongoose.Schema({
    donorName:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    amount:{
        type: Number,
        required:true,
        min:1 //donation amount is positive
    },
    paymentMethod:{
        type:String,
        required:true,
        enum:['PhonePe', 'Google Pay', 'Paytm', 'Credit Card','cash']
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Donation =mongoose.model('Donation', donationSchema)

module.exports = Donation;