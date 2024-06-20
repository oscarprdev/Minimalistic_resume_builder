import { useUserLogged } from '@/hooks/use-user-logged';
import AsideFormExperienceClient from './AsideFormExperienceClient';
import AsideFormExperienceServer from './AsideFormExperienceServer';

interface AsideFormExperienceControllerProps {
	resumeId: string | null;
}

const AsideFormExperienceController = async ({ resumeId }: AsideFormExperienceControllerProps) => {
	const user = await useUserLogged();

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
