import { useUserLogged } from '@/hooks/useUserLogged';
import AsideSkillsClient from './AsideFormSkillsClient';
import AsideSkillsServer from './AsideFormSkillsServer';

interface AsideFormSkillsControllerProps {
	resumeId: string | null;
}

const AsideFormSkillsController = async ({ resumeId }: AsideFormSkillsControllerProps) => {
	const user = await useUserLogged();

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
