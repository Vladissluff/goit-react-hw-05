import { useParams, useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import { getMovieDetails } from '../../services/ApiKey';


const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/movies');
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <p>User score: {Math.round(movie.vote_average * 10)}%</p>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={250}
      />
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast" state={location.state}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={location.state}>Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading section...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}