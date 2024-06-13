interface ViewerSummaryProps {
	title: string;
	summary: string;
}

const ViewerSummary = async ({ title, summary }: ViewerSummaryProps) => {
	return (
		<section className='p-5'>
			<h3 className='font-bold'>{title}</h3>
			<p className='text-sm text-gray-700'>{summary}</p>
		</section>
	);
};

export default ViewerSummary;
