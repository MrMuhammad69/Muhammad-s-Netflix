import AuthPage from "./AuthPage";
import HomeScreen from "./HomeScreen";
import { useAuthStore } from '../../store/authUser';

function Homepage() {
  const { user } = useAuthStore();

  return (
    <div>
      {user ? <HomeScreen /> : <AuthPage />}
    </div>
  );
}

export default Homepage;
