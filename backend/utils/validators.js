const validator = require('validator');


function validateSignupInput({ name, email, password }) {
const errors = {};
if (!name || typeof name !== 'string' || name.trim().length < 2) {
errors.name = 'Name must be at least 2 characters';
}
if (!email || !validator.isEmail(email)) {
errors.email = 'Valid email is required';
}
if (!password || typeof password !== 'string' || password.length < 6) {
errors.password = 'Password must be at least 6 characters';
}
return { valid: Object.keys(errors).length === 0, errors };
}


function validateLoginInput({ email, password }) {
const errors = {};
if (!email || !validator.isEmail(email)) {
errors.email = 'Valid email is required';
}
if (!password || typeof password !== 'string') {
errors.password = 'Password is required';
}
return { valid: Object.keys(errors).length === 0, errors };
}

function validateProductInput({ name, price, stock }) {
const errors = {};
if (!name || typeof name !== 'string' || name.trim().length < 2) {
errors.name = 'Name must be at least 2 characters';
}
if (price === undefined || typeof price !== 'number' || price < 0) {
errors.price = 'Valid price is required';
}
if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
errors.stock = 'Stock must be a non-negative integer';
}
return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateSignupInput, validateLoginInput, validateProductInput };