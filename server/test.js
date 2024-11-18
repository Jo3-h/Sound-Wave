const { sequelize, User } = require("./db");

(async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connected!");

    // Test User model
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
    console.log("User created:", user.toJSON());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
})();
