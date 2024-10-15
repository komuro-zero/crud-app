import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY || 'defaultSecretKey'; // Make sure you have a secret key in your environment

const hashPassword = async (password: string): Promise<string> => {
  if (secretKey === 'defaultSecretKey') {
    return '';
  } else {
    // Add the secret key to the password before hashing (optional, adds a layer of security)
    const passwordWithSecret = password + secretKey;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(passwordWithSecret, salt);

    return hashedPassword;
  }
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  if (secretKey === 'defaultSecretKey') {
    throw new Error('Secret key not set');
  }

  // Add the secret key to the password before comparing
  const passwordWithSecret = password + secretKey;

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(passwordWithSecret, hashedPassword);

  return isMatch;
};

export { hashPassword, comparePassword };
