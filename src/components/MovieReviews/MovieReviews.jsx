import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/ApiKey';


export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>Немає відгуків для цього фільму.</p>;
  }

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p><strong>{author}</strong></p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}