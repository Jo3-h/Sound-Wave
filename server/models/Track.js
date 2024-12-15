// models/Track.js
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration_s: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // Define associations for Track model
  Track.associate = function (models) {
    // Track belongs to an album
    Track.belongsTo(models.Album, {
      foreignKey: "album_id",
      as: "trackAlbum",
    });

    // Many-to-many relationship between Track and Artist through Album
    Track.belongsToMany(models.Artist, {
      through: models.Album,
      foreignKey: "track_id",
      otherKey: "artist_id",
      as: "trackArtists",
    });

    // Track can have many reviews
    Track.hasMany(models.Review, {
      foreignKey: "entity_id",
      constraints: false,
      scope: { entity_type: "track" },
      as: "trackReviews",
    });
  };

  return Track;
};
