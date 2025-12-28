export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isValid = 
      (username === process.env.ADMIN_EMAIL || username === 'BarbachiFarouk') && 
      password === process.env.ADMIN_PASSWORD;

    if (isValid) {
      res.status(200).json({
        success: true,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};