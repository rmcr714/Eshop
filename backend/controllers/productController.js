import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc  Fetch all products
// @route  GET /api/products             Search functionalty will come at GET /api/products?keyword= (whatevers passed in productlist action)
// @access public
const getProducts = asyncHandler(async(req,res) =>{
       const pageSize = 10
       const page = Number(req.query.pageNumber) || 1                        //Pagination functionality
    
    const keyword = req.query.keyword ? {      //Search functionality
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}



    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.json({products,page,pages:Math.ceil(count/pageSize)})

})



// @desc  Fetch single products
// @route  GET /api/products/:id
// @access public 
const getProductById = asyncHandler(async(req,res) =>{

    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not found')

    } 

})


// @desc  Delete a products
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async(req,res) =>{

    const product = await Product.findById(req.params.id)
    if (product) {

        await product.remove()
        res.json({message:'Product removed'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')

    } 

})



// @desc  Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async(req,res) =>{

    const product = new Product({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})




// @desc  Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async(req,res) =>{

    const {name,price,description,image,brand,category,countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

    

})




// @desc  Create new review
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async(req,res) =>{

    const {rating , comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString() )
       if(alreadyReviewed){
        //    res.status(400)
        //    throw new Error("Product already reviewed")

        console.log("Insode jane")
        alreadyReviewed.remove()

        
       }

       const review = {
           name:req.user.name,
           rating :Number(rating),
           comment:comment,
           user:req.user._id
       }

       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc,item)=>item.rating + acc,0)/product.reviews.length

       await product.save()
       res.status(201).json({message:"Review Added!!"})

    }else{
        res.status(404)
        throw new Error('Product not found')
    }

    

})





// @desc  Get customer Reviews
// @route  GET /api/products/:id/reviews
// @access Private
const editProductReview = asyncHandler(async(req,res) =>{


    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString() )
       if(alreadyReviewed){
           res.status(200).json(alreadyReviewed)

           
        // console.log("Insode jane")
        // alreadyReviewed.remove()

       }else{
           res.status(400).json({messsage:"Customer hasnt Reviewed"})
           
       }

      

    }else{
        res.status(404)
        throw new Error('Product not found')
    }

    

})




// @desc  Get top rated products
// @route  GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async(req,res) =>{
 console.log("inside top")
    const products = await Product.find({}).sort({rating:-1}).limit(3)
    res.json(products)

})




export {getProductById,getProducts,deleteProduct,createProduct,updateProduct,createProductReview,editProductReview,getTopProducts} 