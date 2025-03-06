const crypto = require("crypto");
const Admin = require("../../models/Admin");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const validRoles = ["admin", "moderator", "editor"];

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists." });
    }

     // Hash the password before storing
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);
 
     const verificationToken = crypto.randomBytes(32).toString("hex");
 
     const newAdmin = new Admin({
       name,
       email,
       password: hashedPassword,  // Store hashed password
       role,
       isVerified: false,
       verificationToken,
     });

    await newAdmin.save();

    await sendVerificationEmail(newAdmin);

    res.status(201).json({
      message: "Admin registered successfully. Awaiting verification.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendVerificationEmail = async (admin) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SUPER_ADMIN_EMAIL, 
      pass: process.env.SUPER_ADMIN_PASS,
    },
  });

  const verificationLink = `${process.env.APP_BASE_URL}/verify-admin?token=${admin.verificationToken}`;
  const mailOptions = {
    from: `${admin.email}`,
    to: process.env.SUPER_ADMIN_EMAIL,
    subject: "New Admin Verification Request",
    text: `Please verify the new admin:
         Name: ${admin.name}
         Email: ${admin.email}
         Click the link to verify: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = registerAdmin;
