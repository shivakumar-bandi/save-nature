const User =require('../models/User')
const bcrypt =require('bcrypt')

// Controller for registering a new user

exports.userRegister =async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

// Check if user already exists
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        // Hash the password before saving the user
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        user =new User({
            name,
            email,
            password:hashedPassword
        });
        await user.save();
        
        res.status(201).json({message: 'User registered successfully!'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
};

// Controller for logging in a user
exports.userLogin =async(req,res)=>{
    try {
        const {email,password}=req.body;

// Check if user exists
let user= await User.findOne({email})
if(!user){
   return res.status(400).json({message: 'Invalid username or password'});
}
// Compare the entered password with the hashed password in the database
const isMatch =await bcrypt.compare(password, user.password);
if(!isMatch){
    return res.status(400).json({message: 'Invalid username or password'});
}
res.status(200).json({message: 'user register successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}


// Controller for getting all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select('-password'); // Exclude the password field for security

        // Check if users exist
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Return the list of users
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};
