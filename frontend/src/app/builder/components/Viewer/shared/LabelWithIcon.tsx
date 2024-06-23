interface LabelWithIconProps {
	icon: React.ReactNode;
	label: string;
}

const LabelWithIcon = ({ label, icon }: LabelWithIconProps) => {
	return (
		<div className='w-full flex items-center justify-between'>
			<div className='flex space-x-1 items-center relative'>
				{icon}
				<p
					id='li-title'
					className='uppercase text-sm'>
					{label}
				</p>
			</div>
		</div>
	);
};

export default LabelWithIcon;
