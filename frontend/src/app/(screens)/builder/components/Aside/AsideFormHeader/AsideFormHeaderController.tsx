import AsideFormHeaderClient from './AsideFormHeaderClient';
import AsideFormHeaderServer from './AsideFormHeaderServer';
import { User } from 'next-auth';

interface AsideFormHeaderControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormHeaderController = ({ resumeId, user }: AsideFormHeaderControllerProps) => {
	if (!user?.id) {
		return <AsideFormHeaderClient />;
	}

	return (
		<AsideFormHeaderServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormHeaderController;
