// models/Artist.js
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.VARCHAR,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // define associations for Artist model
  Artist.associate = function (models) {
    // Artist can have many albums
    Artist.hasMany(models.Album, {
      foreignKey: "artist_id",
    });

    // Many-to-many relationship between Artist and Track through Album
    Artist.belongsToMany(models.Track, {
      through: models.Album,
      foreignKey: "artist_id",
      otherKey: "track_id",
    });
  };

  return Artist;
};
