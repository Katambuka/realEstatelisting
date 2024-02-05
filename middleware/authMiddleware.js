
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  next();
};

const checkRoles = requiredRoles => (req, res, next) => {
  // If no roles are required for this route then just move on to the next middleware function in line
  if (!requiredRoles || !Array.isArray(requiredRoles)) {
    return next();
  }

  const userRoles = req.user.roles;

  // Checks if the current logged in users role matches any of the required roles and returns a response if they don't match
  // Checks if the user has any of the required roles and returns a response if they don't
  if (!userRoles.some((role) => requiredRoles.includes(role))) {
    return res.status(403).send('You do not have permission to view this resource');
  }

  return next();
};

module.exports = {
  isAuthenticated,
  checkRoles,
};