const User=require('../models/User');
const generateToken=require('../utils/generateToken');

    // @desc    Register a new user (customer, employee, or admin)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Assign role safely (defaulting to 'customer' if not provided)
    const assignedRole = role || 'customer';

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id,user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('REGISTER ERROR',error);
    res.status(500).json({ message: error.message });
  }
};
const loginUser=async(req,res)=>{
    const {email, password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token: generateToken(user._id,user.role),
            });
        }else{
            res.status(401).json({message:'Invalid email or password'});
        }

    }catch(error){
      console.error('LOGIN ERROR',error);
        res.status(500).json({message:error.message});
    }
};

const getUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(user){
            res.json({
            _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,

        });
    }else{
        res.status(404).json({message:'User not found'});
    }
}catch(error){
    res.status(500).json({message:error.message});
}
};
module.exports={registerUser,loginUser,getUserProfile};