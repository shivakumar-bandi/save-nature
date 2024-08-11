const Donation =require('../models/Donation')

exports.createDonation = async(req, res)=>{
    try {
        const {donorName, email, amount, paymentMethod} =req.body;
    if(!donorName || !email || !amount || !paymentMethod){
        return res.status(400).json({message: 'please provide all requored fields'});
    }

    const donation = new Donation({
   donorName,
   email,
   amount,
   paymentMethod
    })
    await donation.save();
    res.status(200).json({message: 'Donation recorded successfully!'});
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error!')
    }
}

// Controller for getting all donations

 exports.getDonations =async(req,res)=>{
    try {
        const donations = await Donation.find().sort({date : -1})  // Sort by date in descending order
    res.status(200).json(donations)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Internal server error!'})
    }
 }