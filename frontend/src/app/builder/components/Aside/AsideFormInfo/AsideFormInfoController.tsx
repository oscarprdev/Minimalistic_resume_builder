'use server';

import { useUserLogged } from '@/hooks/use-user-logged';
import AsideFormInfoClient from './AsideFormInfoClient';
import AsideFormInfoServer from './AsideFormInfoServer';

interface AsideFormInfoControllerProps {
	resumeId: string | null;
}

const AsideFormInfoController = async ({ resumeId }: AsideFormInfoControllerProps) => {
	const user = await useUserLogged();

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
