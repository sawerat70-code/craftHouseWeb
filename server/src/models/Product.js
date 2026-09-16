const mongoose=require('mongoose');

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
         required:true   
        },
        price:{
            type:Number,
            required:true,
            min:0,
        },
        category:{
            type:String,
            required:true,
            enum:['Crochet','Paintings','Sketches','Accessories','Custom craft'],
        },
        images:[
            {
            url:{type:String,required:true},
            public_id:{type:String,required:true},
        },
    ],
    stock:{
        type:Number,required:true,default:1
    },
    isCustomizable:{
        type:Boolean,
        default:false
    },

    }, {timestamps:true}
);
module.exports=mongoose.model('Product',productSchema);