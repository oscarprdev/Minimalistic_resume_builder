import { strToCapitalized } from '@/lib/utils';

interface ViewerTitleProps {
	resumeTitle: string;
}

const ViewerTitle = ({ resumeTitle }: ViewerTitleProps) => {
	return <p>{strToCapitalized(resumeTitle)}</p>;
};

export default ViewerTitle;
