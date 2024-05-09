const validateProduct = (product) => {
    const errors = {};
    
    
    if (!product.name || product.name.trim() === "") {
        errors.name = "Product name is required";
    }

    if (!product.image || !Array.isArray(product.image) || product.image.length === 0) {
        errors.image = "Please provide at least one image for the product";
    } else {
        product.image.forEach((img, index) => {
            const fileType = img.substring(img.lastIndexOf('.') + 1).toLowerCase();
            if (!['jpg', 'jpeg', 'png', 'gif','webp'].includes(fileType)) {
                errors[`image${index}`] = "Invalid file type. Please select a valid image file (jpg, jpeg, png, gif)";
            }
        });
    }
    if (product.stock === undefined || isNaN(product.stock) || product.stock < 0) {
        errors.stock = "Invalid stock quantity";
    }

    if (product.price === undefined || isNaN(product.price) || product.price <= 0) {
        errors.price = "Invalid product price";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

module.exports = validateProduct;
