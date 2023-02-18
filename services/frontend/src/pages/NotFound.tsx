import { useNavigate } from 'react-router-dom';

import Button from '../components/Atomic/Button';

function NotFound() {
  const errorMessage = 'Not found !';

  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen flex-col place-content-center place-items-center">
      <h1 className="my-4 text-5xl font-bold">Oops!</h1>
      <p className="my-4">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back{' '}
      </Button>
    </div>
  );
}

export default NotFound;
