import { Sweet } from "../database/model/SweetModel.js";

export const getAllSweet = async (req, res) => {
  try {
    const all_sweet = await Sweet.find();
    res.status(201).json({
      all_sweet: all_sweet,
    });
  } catch (error) {
    console.log("Error in getAllSweet : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const getSearchedSweet = async (req, res) => {
  try {
    const sweet_name = req.params.search;

    const sweets = await Sweet.find({
      name: { $regex: sweet_name, $options: "i" },
    });

    if (sweets.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json(sweets);
  } catch (error) {
    console.log("Error in search sweet : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const createNewSweet = async (req, res) => {
  try {
    const { name, description, price, image_link, quantity, category } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image_link ||
      !quantity ||
      !category
    ) {
      return res.status(404).json({
        message: "Please fill all the details",
      });
    }

    // FIX: Changed to correctly query the database for an existing sweet.
    const existingSweet = await Sweet.findOne({ name: name });

    // FIX: Changed to check if a document was found (not array length).
    if (existingSweet) {
      return res.status(400).json({
        message: "This Sweet already exist",
      });
    }

    const new_sweet = await Sweet.create({
      name: name,
      description: description,
      price: price,
      image_link: image_link,
      quantity: quantity,
      category: category,
    });

    return res.status(201).json({
      message: "Sweet added Successfully",
      sweet_detail: new_sweet,
    });
  } catch (error) {
    console.log("Error in createNewSweet : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const data = req.params.id;
    const { name, description, price, image_link, quantity, category } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image_link ||
      !quantity ||
      !category
    ) {
      return res.status(404).json({
        message: "Please fill all the details",
      });
    }

    await Sweet.findByIdAndUpdate(data, {
      name: name,
      description: description,
      price: price,
      image_link: image_link,
      quantity: quantity, // FIX: Added missing quantity field
      category: category,
    });

    res.status(200).json({
      message: "Sweet updated successfully",
    });
  } catch (error) {
    console.log("Error in updateSweet : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSweet = await Sweet.findByIdAndDelete(id);

    if (!deletedSweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSweet:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const data = req.params.id;

    const sweet = await Sweet.findById(data); // Use findById for efficiency
    if (!sweet) {
      return res.status(404).json({
        message: "Sweet not found",
      });
    }

    const num = sweet.quantity;
    if (num === 0) {
      return res.status(400).json({
        message: "Not in stock",
      });
    }

    await Sweet.findByIdAndUpdate(data, {
      quantity: num - 1,
    });

    res.status(200).json({
      message: "Purchase successfully",
    });
  } catch (error) {
    console.log("Error in purchase sweet : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const data = req.params.id;
    const { new_quantity } = req.body;

    if (new_quantity === undefined || new_quantity < 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid quantity" });
    }

    const sweet = await Sweet.findById(data);
    if (!sweet) {
      return res.status(404).json({
        message: "Sweet not found",
      });
    }

    await Sweet.findByIdAndUpdate(data, {
      quantity: new_quantity,
    });

    res.status(200).json({
      message: "Restock the sweet successfully",
    });
  } catch (error) {
    console.log("Error in restock sweet : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
