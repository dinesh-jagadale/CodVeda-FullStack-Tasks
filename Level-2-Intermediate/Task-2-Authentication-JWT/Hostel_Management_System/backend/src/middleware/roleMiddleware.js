//Hostel_Management_System\backend\src\middleware\roleMiddleware.js
export const rectorOnly = (req, res, next) => {
  if (req.user.role !== "rector")
    return res.status(403).json({ message: "Rector only" });
  next();
};
