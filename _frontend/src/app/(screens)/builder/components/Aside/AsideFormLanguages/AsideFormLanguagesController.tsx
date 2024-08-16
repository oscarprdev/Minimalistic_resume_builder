import { User } from 'next-auth';
import AsideLanguagesClient from './AsideFormLanguagesClient';
import AsideLanguagesServer from './AsideFormLanguagesServer';

interface AsideFormLanguagesControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormLanguagesController = ({ resumeId, user }: AsideFormLanguagesControllerProps) => {
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
