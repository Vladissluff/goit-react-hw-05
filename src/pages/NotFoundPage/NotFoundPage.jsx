import { Link } from 'react-router-dom';


export default function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Сторінка не знайдена. Поверніться на <Link to="/">головну</Link>.</p>
    </div>
  );
}