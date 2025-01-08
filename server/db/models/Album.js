// models/Album.js
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Album",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
      as: "albumArtist",
    });

    // Album can have many tracks
    Album.hasMany(models.Track, {
      foreignKey: "album_id",
      as: "albumTracks",
    });

    // Album can have many reviews
    Album.hasMany(models.Review, {
      foreignKey: "entity_id",
      constraints: false,
      scope: { entity_type: "album" },
      as: "albumReviews",
    });
  };

  return Album;
};
