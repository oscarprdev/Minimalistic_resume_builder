import { useUserLogged } from '@/hooks/use-user-logged';
import AsideFormHeaderClient from './AsideFormHeaderClient';
import AsideFormHeaderServer from './AsideFormHeaderServer';

interface AsideFormHeaderControllerProps {
	resumeId: string | null;
}

const AsideFormHeaderController = async ({ resumeId }: AsideFormHeaderControllerProps) => {
	const user = await useUserLogged();

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
