import AsideFormInfoClient from './AsideFormInfoClient';
import AsideFormInfoServer from './AsideFormInfoServer';
import { User } from 'next-auth';

interface AsideFormInfoControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormInfoController = ({ resumeId, user }: AsideFormInfoControllerProps) => {
	if (!user?.id) {
		return <AsideFormInfoClient />;
	}

	return (
		<AsideFormInfoServer
			userId={user.id}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormInfoController;
