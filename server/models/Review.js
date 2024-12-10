// models/review.js
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entity_type: {
        type: DataTypes.ENUM("album", "track"),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      favourite_track: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // define associations for Review model
  Review.associate = function (models) {
    // Review belongs to a User
    Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Review belongs to an Album
    Review.belongsTo(models.Album, {
      foreignKey: "album_id",
      constraints: false,
      as: "albumReview",
      scope: { entity_type: "album" },
    });

    // Review belongs to a Track
    Review.belongsTo(models.Track, {
      foreignKey: "entity_id",
      constraints: false,
      as: "trackReview",
      scope: { entity_type: "track" },
    });
  };

  return Review;
};
