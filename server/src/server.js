const express =require('express');
const cors=require("cors");
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes');
const orderRoutes=require('./routes/orderRoutes');
dotenv.config();

connectDB();
const app=express();

app.use(cors({origin:process.env.CLIENT_URL || 'http://localhost:5173' , credentials:true}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders' , orderRoutes);

    app.get('/api/health',(req,res)=>{
        res.status(200).json({status:'OK', message:"Backend is running correctly"});
    });
    app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
    const PORT=process.env.PORT || 5000;
    app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
