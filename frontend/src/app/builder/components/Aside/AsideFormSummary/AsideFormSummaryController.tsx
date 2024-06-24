import { useUserLogged } from '@/hooks/useUserLogged';
import AsideFormSummaryClient from './AsideFormSummaryClient';
import AsideFormSummaryServer from './AsideFormSummaryServer';

interface AsideFormSummaryControllerProps {
	resumeId: string | null;
}

const AsideFormSummaryController = async ({ resumeId }: AsideFormSummaryControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <AsideFormSummaryClient />;
	}

	return (
		<AsideFormSummaryServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormSummaryController;
