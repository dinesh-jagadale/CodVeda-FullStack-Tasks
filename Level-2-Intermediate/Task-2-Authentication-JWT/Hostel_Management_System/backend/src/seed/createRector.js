import User from "../models/User.js";

const createRector = async () => {

  const existingRector = await User.findOne({
    email: "rector@gmail.com",
  });

  if (!existingRector) {

    await User.create({
      name: "Rector",
      email: "rector@gmail.com",
      password: "123456",
      role: "rector",
      isApproved: true,
      status: "active",
    });

    console.log("✅ Rector Created");
  }
};

export default createRector;