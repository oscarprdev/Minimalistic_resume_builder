import { useUserLogged } from '@/hooks/use-user-logged';
import AsideLanguagesClient from './AsideFormLanguagesClient';
import AsideLanguagesServer from './AsideFormLanguagesServer';

interface AsideFormLanguagesControllerProps {
	resumeId: string | null;
}

const AsideFormLanguagesController = async ({ resumeId }: AsideFormLanguagesControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <AsideLanguagesClient />;
	}

	return (
		<AsideLanguagesServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormLanguagesController;
