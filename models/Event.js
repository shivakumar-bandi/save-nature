const mongoose =require('mongoose')

const eventSchema =new mongoose.Schema({
    eventName:{
        type:String,
        required: true,
        trim: true
    },
    descrption:{
        type:String,
        required:true,
        trim:true
    },
    eventDate:{
        type: Date,
        required: true
    },
    location:{
        type:String,
        required: true,
        trim: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
    type: Date,
    default: Date.now
    }
});

const Event =mongoose.model('Event', eventSchema);

module.exports =Event;