import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { describeResumeListAction } from '@/app/actions/resume/describe-resume-list';
import { setResumeId } from '@/app/actions/resume/set-resume-id';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { IconLayoutGrid, IconLoader2 } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRef } from 'react';

type SelectResumeModalProps = {
	userLogged?: User;
};

const SelectResumeModal = ({ userLogged }: SelectResumeModalProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const router = useRouter();

	const dialogTrigger = useRef<HTMLButtonElement>(null);
	const { data, isPending, error } = useQuery({
		queryKey: ['resume-list', userLogged, dialogOpen],
		queryFn: async () => {
			if (!userLogged?.id || !userLogged?.name || !dialogOpen) return [];

			const response = await describeResumeListAction(userLogged.id, userLogged.name);
			if (isError(response)) {
				toast({
					variant: 'destructive',
					description: response.error,
				});

				return [];
			}

			return response.success;
		},
	});

	const toggleDialogOpen = () => setDialogOpen(!dialogOpen);

	const handleSelectResume = (id: string) => {
		setDialogOpen(false);
		setResumeId(id);
	};

	return (
		<section className="w-full grid place-items-center">
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild className="text-zinc-600 group w-full">
					<Button
						ref={dialogTrigger}
						onClick={toggleDialogOpen}
						size={'sm'}
						className="w-full flex items-center gap-1 hover:bg-zinc-200/50 bg-transparent relative cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors group-hover:bg-zinc-100 group-hover:text-zinc-900 ">
						<IconLayoutGrid size={18} />
						<p className="text-xs">Select resume</p>
					</Button>
				</DialogTrigger>

				<DialogContent aria-describedby="" className={cn(isPending && 'w-56')}>
					<>
						{isPending ? (
							<div className="w-full grid place-items-center text-zinc-600 gap-1">
								<IconLoader2 className="animate-spin" size={32} />
								<DialogHeader>
									<DialogTitle className="text-sm">Fetching resumes...</DialogTitle>
								</DialogHeader>
							</div>
						) : error ? (
							<p>{error.message}</p>
						) : (
							<>
								<DialogHeader>
									<DialogTitle>Select resume</DialogTitle>
								</DialogHeader>
								<div className="flex flex-col items-center justify-center gap-2">
									{data.map(resume => (
										<Button
											onClick={() => handleSelectResume(resume.id)}
											className="w-full capitalize flex items-center gap-4 rounded-lg text-zinc-600 bg-zinc-200/50 hover:bg-zinc-200 duration-200 cursor-pointer h-auto"
											key={resume.id}>
											{resume.title}
											<Badge
												variant={
													Object.values(resume).some(val => !Boolean(val))
														? 'working'
														: 'success'
												}>
												{Object.values(resume).some(val => !Boolean(val)) ? 'WIP' : 'Ready'}
											</Badge>
										</Button>
									))}
								</div>
							</>
						)}
					</>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default SelectResumeModal;
