import "./css/ContentBackground.css";

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

export default function ContentBackground() {
  return (
    <>
      <div className="collage-background">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`collage-img-${index}`}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}
