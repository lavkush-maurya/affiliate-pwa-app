// pages/api/products/[id].js
import dbConnect from '../../../lib/dbConnect'; // Ensure the path is correct
import Product from '../../../models/Product'; // Ensure the path is correct

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Get the product ID from the query parameters

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Fetch a single product by ID
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
        try {
          const deletedProduct = await Product.findByIdAndDelete(id);
          if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
          }
          res.status(200).json({ success: true, data: deletedProduct });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;  

    default:
      res.status(400).json({ success: false });
      break;
  }
}
