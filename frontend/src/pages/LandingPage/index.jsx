import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export function LandingPage(props) {
  const login = () => window.location.href = 'http://jjab6.ml:3000/api/auth/discord';
  return (
    <div>
      <Button
        onClick={login}
        colorScheme="orange"
      >
        Login
      </Button>
      <Link to={`/menu`} >Menu</Link>
    </div>
  );
}