// models/Album.js
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Album",
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
      release_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
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

  // define associations for Album model
  Album.associate = function (models) {
    // Album belongs to an Artist
    Album.belongsTo(models.Artist, {
      foreignKey: "artist_id",
    });

    // Album can have many tracks
    Album.hasMany(models.Track, {
      foreignKey: "album_id",
    });

    // Album can have many reviews
    Album.hasMany(models.Review, {
      foreignKey: "entity_id",
      constraints: false,
      as: "reviews",
      scope: { entity_type: "album" },
    });
  };

  return Album;
};
