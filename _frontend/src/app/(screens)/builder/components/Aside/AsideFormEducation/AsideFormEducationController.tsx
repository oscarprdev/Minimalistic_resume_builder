import AsideEducationClient from './AsideFormEducationClient';
import AsideEducationServer from './AsideFormEducationServer';
import { User } from 'next-auth';

interface AsideFormEducationControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormEducationController = ({ resumeId, user }: AsideFormEducationControllerProps) => {
	if (!user?.id) {
		return <AsideEducationClient />;
	}

	return (
		<AsideEducationServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormEducationController;
