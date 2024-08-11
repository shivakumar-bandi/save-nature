const Event =require('../models/Event')


// Controller for creating an event
exports.createEvent =async(req, res)=>{
try {
    const {eventName, descrption, eventDate, location,createdBy} =req.body;
if(!eventName || !descrption || !eventDate || !location || !createdBy){
    return res.status(400).json({message: 'Please provide the all required fields'});
}
const event =new Event({
    eventName,
    descrption,
    eventDate,
    location,
    createdBy
})
await event.save();
res.status(201).json({message: 'Event created successfully!', event});
} catch (error) {
    console.error(error.message)
    res.status(500).json({message: 'Internal server error'});
}
}

// Controller for getting all events
exports.getEvents =async(req, res)=>{
    try {
        const events = await Event.find().populate('createdBy', 'name email').sort({eventDate: 1});
        res.status(200).json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Internal server error'})
    }
}

exports.updateEvent =async(req, res)=>{
    try {
    const {id} =req.params;
    const {eventName, descrption, eventDate, location} =req.body;

     // Find the event by ID and update it
     const updateEvent =await Event.findByIdAndUpdate(
        id,
        {eventName, descrption, eventDate, location},
        {new:true, runValidators:true}
     );
     if(!updateEvent){
        return res.status(400).json({message: 'Event not found!'})
     }
     res.status(200).json({message: 'Event Updated successfully!', event: updateEvent});
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: 'Internal server error'})
    }
}

// Controller for deleting an event

exports.deleteEvent =async(req, res)=>{
    try {
        const {id} =req.params;
        // Find the event by ID and delete it

        const deleteEvent =await  Event.findByIdAndDelete(id);
        if(!deleteEvent){
            return res.status(404).json({message: 'Event not found!'})
        }
        res.status(200).json({messsage: 'Event deleted successfully!'});
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: 'Internal server error'})
    }
}
