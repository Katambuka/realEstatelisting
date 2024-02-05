/*
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

const checkListingPermission = (req, res, next) => {
  // Assuming your user has a 'role' property indicating the user's role
  if (req.user && req.user.role === 'admin') {
    // Allow access for admin users
    return next();
  } else {
    res.status(403).send('Forbidden: Insufficient permissions');
  }
};

module.exports = { ensureAuthenticated, checkListingPermission };
/*/