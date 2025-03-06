const User = require('../../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

module.exports = registerUser;
