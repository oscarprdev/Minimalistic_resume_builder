import AsideSkillsClient from './AsideFormSkillsClient';
import AsideSkillsServer from './AsideFormSkillsServer';
import { User } from 'next-auth';

interface AsideFormSkillsControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormSkillsController = ({ resumeId, user }: AsideFormSkillsControllerProps) => {
	if (!user?.id) {
		return <AsideSkillsClient />;
	}

	return (
		<AsideSkillsServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormSkillsController;
