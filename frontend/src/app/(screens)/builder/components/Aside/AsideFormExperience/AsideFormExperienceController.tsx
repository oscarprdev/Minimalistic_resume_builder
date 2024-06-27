import AsideFormExperienceClient from './AsideFormExperienceClient';
import AsideFormExperienceServer from './AsideFormExperienceServer';
import { User } from 'next-auth';

interface AsideFormExperienceControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormExperienceController = ({ resumeId, user }: AsideFormExperienceControllerProps) => {
	if (!user?.id) {
		return <AsideFormExperienceClient />;
	}

	return (
		<AsideFormExperienceServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormExperienceController;
