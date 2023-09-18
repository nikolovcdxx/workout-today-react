import './notFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="track">
          <div className="runner" />
        </div>
        <p className="not-found-message">404</p>
        <p className="sub-message">
          Hitting a Dead End? Your Fitness Journey Doesn't Have to!
        </p>
      </div>
    </div>
  );
}
