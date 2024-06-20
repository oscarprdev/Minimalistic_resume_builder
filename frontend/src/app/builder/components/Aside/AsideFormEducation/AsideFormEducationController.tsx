import { useUserLogged } from '@/hooks/use-user-logged';
import AsideEducationClient from './AsideFormEducationClient';
import AsideEducationServer from './AsideFormEducationServer';

interface AsideFormEducationControllerProps {
	resumeId: string | null;
}

const AsideFormEducationController = async ({ resumeId }: AsideFormEducationControllerProps) => {
	const user = await useUserLogged();

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
