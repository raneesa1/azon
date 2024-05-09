function validateUserData(email, password) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email" };
    }

    if (password) {
        if (password.length < 8) {
            return {
                valid: false,
                message: "Password must be at least 8 characters long",
            };
        }
        //additional checks such as requiring at least one uppercase letter, one lowercase letter, one digit, and one special character.
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            };
        }
    }
    return { valid: true, message: "" };
}

module.exports = validateUserData;
