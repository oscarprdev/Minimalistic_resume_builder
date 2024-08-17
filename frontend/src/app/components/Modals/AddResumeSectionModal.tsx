'use client';

import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { updateEducationAction } from '@/app/actions/resume/update-education';
import { updateExperienceAction } from '@/app/actions/resume/update-experience';
import { updateLanguagesAction } from '@/app/actions/resume/update-languages';
import { updateSkillsAction } from '@/app/actions/resume/update-skills';
import { updateSummaryAction } from '@/app/actions/resume/update-summary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { defaultJob, defaultLanguage, defaultResume, defaultSchool, defaultSkill } from '@/data/default-resume';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { IconBriefcase, IconMessage, IconMessageLanguage, IconSchool, IconTools } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';

type AddResumeSectionModalProps = {
	userLogged?: User;
	resumeId: string;
	sectionsDisplayed: SectionSelected[];
};

export enum SectionSelected {
	summary = 'summary',
	experience = 'experience',
	education = 'education',
	skills = 'skills',
	languages = 'languages',
}

type Section = {
	name: SectionSelected;
	icon: ReactNode;
};

const SECTIONS: Section[] = [
	{
		name: SectionSelected.summary,
		icon: <IconMessage size={20} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.experience,
		icon: <IconBriefcase size={20} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.education,
		icon: <IconSchool size={20} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.skills,
		icon: <IconTools size={20} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.languages,
		icon: <IconMessageLanguage size={20} className="text-zinc-500" />,
	},
];

const AddResumeSectionModal = ({ userLogged, resumeId, sectionsDisplayed }: AddResumeSectionModalProps) => {
	const router = useRouter();

	const dialogTrigger = useRef<HTMLButtonElement>(null);

	const { updateSummary } = useResumeSummaryStore();
	const { updateExperience } = useResumeExperienceStore();
	const { updateEducation } = useResumeEducationStore();
	const { updateSkills } = useResumeSkillsStore();
	const { updateLanguage } = useResumeLanguageStore();

	const { mutate } = useMutation({
		mutationFn: async (section: SectionSelected) => {
			switch (section) {
				case SectionSelected.summary:
					if (userLogged) {
						await updateSummaryAction(
							{ ...defaultResume.summary, isHidden: false, id: crypto.randomUUID().toString() },
							resumeId
						);
					} else {
						updateSummary({ ...defaultResume.summary, isHidden: false });
					}
					break;
				case SectionSelected.experience:
					if (userLogged) {
						await updateExperienceAction(
							{ ...defaultResume.experience, isHidden: false, id: crypto.randomUUID().toString() },
							resumeId
						);
					} else {
						updateExperience({
							...defaultResume.experience,
							isHidden: false,
							jobList: [{ ...defaultJob, id: crypto.randomUUID().toString() }],
						});
					}
					break;
				case SectionSelected.education:
					if (userLogged) {
						await updateEducationAction(
							{ ...defaultResume.education, isHidden: false, id: crypto.randomUUID().toString() },
							resumeId
						);
					} else {
						updateEducation({
							...defaultResume.education,
							isHidden: false,
							educationList: [{ ...defaultSchool, id: crypto.randomUUID().toString() }],
						});
					}
					break;
				case SectionSelected.skills:
					if (userLogged) {
						await updateSkillsAction(
							{
								...defaultResume.skills,
								isHidden: false,
								id: crypto.randomUUID().toString(),
							},
							resumeId
						);
					} else {
						updateSkills({
							...defaultResume.skills,
							isHidden: false,
							skillList: [{ ...defaultSkill, id: crypto.randomUUID().toString() }],
						});
					}
					break;
				case SectionSelected.languages:
					if (userLogged) {
						await updateLanguagesAction(
							{
								...defaultResume.languages,
								isHidden: false,
								id: crypto.randomUUID().toString(),
							},
							resumeId
						);
					} else {
						updateLanguage({
							...defaultResume.languages,
							isHidden: false,
							languageList: [{ ...defaultLanguage, id: crypto.randomUUID().toString() }],
						});
					}
					break;
				default:
					toast({
						variant: 'destructive',
						description: 'Section selected is not valid',
					});
					break;
			}

			dialogTrigger.current?.click();
			router.refresh();
		},
	});

	return (
		<section className="w-full grid place-items-center">
			<Dialog>
				<DialogTrigger asChild>
					<Button ref={dialogTrigger} size={'sm'} className="w-1/3">
						Add section
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New section</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col items-center justify-center gap-2">
						{SECTIONS.map(section => (
							<Button
								key={section.name}
								disabled={sectionsDisplayed.includes(section.name)}
								onClick={() => mutate(section.name)}
								className="w-full grid place-items-center rounded-lg bg-zinc-200/50 hover:bg-zinc-200 duration-200 cursor-pointer h-auto">
								{section.icon}
								<p className="capitalize text-zinc-500 text-sm">{section.name}</p>
							</Button>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default AddResumeSectionModal;
