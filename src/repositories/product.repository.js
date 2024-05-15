const ProductModel = require("../models/products.models.js");
const logger = require("../utils/loggers.js")

class ProductRepository {
  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
    owner
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
       logger.info("Todos los campos son obligatorios");
        return;
      }
      const existProduct = await ProductModel.findOne({ code: code });
      if (existProduct) {
       logger.info("El código debe ser único!!!");
        return;
      }
      logger.info("Owner", owner);
      const newProduct = new ProductModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || [],
        owner
      });

      await newProduct.save();

      return newProduct;
    } catch (error) {
    logger.info("Error");
    }
  }

  async getProducts(limit = 10, page = 1, sort, query) {
    try {
      const skip = (page - 1) * limit;
      let queryOptions = {};
      if (query) {
        queryOptions = { category: query };
      }
      const sortOptions = {};
      if (sort) {
        if (sort === "asc" || sort === "desc") {
          sortOptions.price = sort === "asc" ? 1 : -1;
        }
      }
      const products = await ProductModel.find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
      const totalProducts = await ProductModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      return {
        docs: products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&query=${query}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      throw new Error("Error");
    }
  }

  async getProductsById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
       logger.info("Producto no encontrado");
        return null;
      }
     logger.info("Producto encontrado!!");
      return product;
    } catch (error) {
      throw new Error("Error");
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(id, updatedProduct);
      if (!updated) {
       logger.info("No se encuentra el producto");
        return null;
      }
     logger.info("Producto actualizado con exito!");
      return updated;
    } catch (error) {
      throw new Error("Error");
    }
  }

  async deleteProduct(id) {
    try {
      const removed = await ProductModel.findByIdAndDelete(id);
      if (!removed) {
       logger.info("El Producto no fue encontrado");
        return null;
      }
     logger.info("Producto eliminado correctamente!");
      return removed;
    } catch (error) {
      throw new Error("Error");
    }
  }
}

module.exports = ProductRepository;
