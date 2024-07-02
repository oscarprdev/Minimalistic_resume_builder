import { User } from 'next-auth';
import LogOutButton from '../buttons/LogOutButton';
import AuthModal from '../modals/AuthModal';

interface AuthSectionProps {
	user?: User;
}

const AuthSection = ({ user }: AuthSectionProps) => {
	return <>{user ? <LogOutButton /> : <AuthModal />}</>;
};

export default AuthSection;
