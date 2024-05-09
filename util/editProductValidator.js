// productValidation.js
const validateEditProductInput = (data) => {
    const errors = {};

    if (!data) {
        errors.general = "Data is required";
        return errors;
    }

    if (data.name && data.name.trim() === "") {
        errors.name = "Product name cannot be empty";
    }

    if (data.stock && (isNaN(data.stock) || data.stock < 0)) {
        errors.stock = "Invalid stock quantity";
    }

    if (data.image && (!Array.isArray(data.image) || data.image.length === 0)) {
        errors.image = "Please provide at least one image for the product";
    }

    if (data.price && (isNaN(data.price) || data.price <= 0)) {
        errors.price = "Invalid product price";
    }

    return errors;
};

module.exports = validateEditProductInput