import AsideFormSummaryClient from './AsideFormSummaryClient';
import AsideFormSummaryServer from './AsideFormSummaryServer';
import { User } from 'next-auth';

interface AsideFormSummaryControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormSummaryController = ({ resumeId, user }: AsideFormSummaryControllerProps) => {
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
