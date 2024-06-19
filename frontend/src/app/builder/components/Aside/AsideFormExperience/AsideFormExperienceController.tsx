import { useUserLogged } from '@/hooks/use-user-logged';
import AsideFormExperienceClient from './AsideFormExperienceClient';
import AsideFormExperienceServer from './AsideFormExperienceServer';

interface AsideFormexperienceControllerProps {
	resumeId: string | null;
}

const AsideFormexperienceController = async ({ resumeId }: AsideFormexperienceControllerProps) => {
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

export default AsideFormexperienceController;
