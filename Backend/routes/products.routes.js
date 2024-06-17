const express = require('express')

const {productModel} = require("../model/products.model")

const productRouter = express.Router()


productRouter.post("/",async(req,res)=>{
    try{
         const {id,top,title,images,description,price,rating,discount,category,color,Stock,size,productType}=req.body
         const newcoat = await productModel ({id,top,title,images,description,price,rating,discount,category,color,Stock,size,productType})
         await newcoat.save()
         res.status(201).json({msg:"Coats are stored sucessfully..."})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something Went Wrong To Posting The Details Of Coats"})
    }
})

productRouter.get('/',async(req,res)=>{
    try{
        const getdata = await productModel.find()
        res.status(201).json({msg:"All the Coat Products are Here...",getdata})

    }
    catch(err){
        console.log('Something went wrong')
        res.status(501).json({msg:"Something went wrong to getting the Coat Data"})
    }
})

//find by the specific ID

productRouter.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const product = await productModel.findById(id)
        res.status(201).json({msg:"Your Specific Products are here...",product})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something went wrong To Find this specific products"})
    }
})


//find by product Type
productRouter.get('/:productType', async (req, res) => {
    const productType = req.params.productType;

    try {
        console.log('Searching for products with productType:', productType);
        const products = await productModel.find({ productType: productType });
        console.log('Products found:', products);
  
        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the specified productType.' });
        }
  
        // Return the products
        res.status(200).json({ message: 'The specific Products are here', products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});





productRouter.get('/:productType', async (req, res) => {
    const productType = req.params.productType;

    try {
        const products = await productModel.find({ productType: productType });

        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({ message: `No products found for the specified productType '${productType}'.` });
        }

        // Return the products
        res.status(200).json({ message: `Products with productType '${productType}' found.`, products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

productRouter.get('/filter/:productType', async (req, res) => {
    const productType = req.params.productType;

    try {
        const products = await productModel.find({ productType: productType });

        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({ message: `No products found for the specified productType '${productType}'.` });
        }

        // Return the products
        res.status(200).json({ message: `Products with productType '${productType}' found.`, products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});


productRouter.delete('/:id',async(req,res)=>{
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }

})

productRouter.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body; // New data to update the product
  
      // Find the product by ID and update it with the new data
      const updatedProduct = await productModel.findByIdAndUpdate(id, newData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      res.json(updatedProduct); // Send back the updated product
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong' });
    }
  });
  






module.exports = {
    productRouter
}