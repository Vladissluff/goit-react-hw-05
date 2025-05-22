import { useParams, useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, Suspense, useRef, lazy } from 'react';
import { getMovieDetails } from '../../services/ApiKey';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Не вдалося завантажити деталі фільму.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>

      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={250}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkRef.current }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkRef.current }}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Завантаження секції…</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
