interface ViewerResumeContainerProps {
	title?: string;
	children: React.ReactNode;
}

const ViewerResumeContainer = ({ children, title }: ViewerResumeContainerProps) => {
	return (
		<section className='relative px-5 py-3'>
			{title && (
				<div className='mb-3'>
					<h3 className='text-lg uppercase'>{title}</h3>
					<span className='block w-10 h-[1px] bg-gray-800' />
				</div>
			)}
			{children}
		</section>
	);
};

export default ViewerResumeContainer;
