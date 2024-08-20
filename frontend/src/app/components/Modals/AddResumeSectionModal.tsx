'use client';

import { Section, SectionSelected } from '../types/types';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { updateEducationAction } from '@/app/actions/resume/update-education';
import { updateExperienceAction } from '@/app/actions/resume/update-experience';
import { updateLanguagesAction } from '@/app/actions/resume/update-languages';
import { updateSkillsAction } from '@/app/actions/resume/update-skills';
import { updateSummaryAction } from '@/app/actions/resume/update-summary';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog';
import { defaultJob, defaultLanguage, defaultResume, defaultSchool, defaultSkill } from '@/data/default-resume';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import {
	IconBriefcase,
	IconLoader2,
	IconMessage,
	IconMessageLanguage,
	IconSchool,
	IconTools,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type AddResumeSectionModalProps = {
	userLogged?: User;
	resumeId: string;
	sectionsDisplayed: SectionSelected[];
};

const SECTIONS: Section[] = [
	{
		name: SectionSelected.summary,
		icon: <IconMessage size={18} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.experience,
		icon: <IconBriefcase size={18} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.education,
		icon: <IconSchool size={18} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.skills,
		icon: <IconTools size={18} className="text-zinc-500" />,
	},
	{
		name: SectionSelected.languages,
		icon: <IconMessageLanguage size={18} className="text-zinc-500" />,
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

	const { mutate, isPending } = useMutation({
		mutationFn: async (section: SectionSelected) => {
			switch (section) {
				case SectionSelected.summary:
					const summaryPayload = {
						...defaultResume.summary,
						isHidden: false,
						id: crypto.randomUUID().toString(),
					};

					if (userLogged) {
						await updateSummaryAction(summaryPayload, resumeId);
					} else {
						updateSummary(summaryPayload);
					}
					break;
				case SectionSelected.experience:
					const experiencePayload = {
						...defaultResume.experience,
						id: crypto.randomUUID().toString(),
						isHidden: false,
						jobList: [{ ...defaultJob, id: crypto.randomUUID().toString() }],
					};

					if (userLogged) {
						await updateExperienceAction(experiencePayload, resumeId);
					} else {
						updateExperience(experiencePayload);
					}
					break;
				case SectionSelected.education:
					const educationPayload = {
						...defaultResume.education,
						id: crypto.randomUUID().toString(),
						isHidden: false,
						educationList: [{ ...defaultSchool, id: crypto.randomUUID().toString() }],
					};

					if (userLogged) {
						await updateEducationAction(educationPayload, resumeId);
					} else {
						updateEducation(educationPayload);
					}
					break;
				case SectionSelected.skills:
					const skillsPayload = {
						...defaultResume.skills,
						id: crypto.randomUUID().toString(),
						isHidden: false,
						skillList: [{ ...defaultSkill, id: crypto.randomUUID().toString() }],
					};

					if (userLogged) {
						await updateSkillsAction(skillsPayload, resumeId);
					} else {
						updateSkills(skillsPayload);
					}
					break;
				case SectionSelected.languages:
					const languagesPayload = {
						...defaultResume.languages,
						isHidden: false,
						id: crypto.randomUUID().toString(),
						languageList: [{ ...defaultLanguage, id: crypto.randomUUID().toString() }],
					};

					if (userLogged) {
						await updateLanguagesAction(languagesPayload, resumeId);
					} else {
						updateLanguage(languagesPayload);
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
		<section id="add-section-section" className="w-full grid place-items-center">
			<Dialog>
				<DialogTrigger asChild>
					<Button ref={dialogTrigger} size={'sm'} className="w-1/3" data-testid="add-section-button">
						Add section
					</Button>
				</DialogTrigger>
				{isPending ? (
					<DialogContent data-testid="add-section-modal-content" className="grid place-items-center w-56">
						<DialogHeader>
							<DialogTitle className="text-sm">Creating new section...</DialogTitle>
						</DialogHeader>
						<IconLoader2 size={20} className="text-zinc-500 animate-spin" />
					</DialogContent>
				) : (
					<DialogContent data-testid="add-section-modal-content">
						<DialogHeader>
							<DialogTitle>New section</DialogTitle>
							<DialogDescription className="text-zinc-600">
								Choose the section to include into your resume.
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col items-center justify-center gap-2">
							{SECTIONS.map(section => (
								<Button
									key={section.name}
									data-testid={`section-${section.name}-button`}
									disabled={sectionsDisplayed.includes(section.name)}
									onClick={() => mutate(section.name)}
									className="w-full grid place-items-center rounded-lg bg-zinc-200/50 hover:bg-zinc-200 duration-200 cursor-pointer h-auto">
									{section.icon}
									{isPending ? (
										<IconLoader2 size={20} className="text-zinc-500 animate-spin" />
									) : (
										<p className="capitalize text-zinc-500 text-xs">{section.name}</p>
									)}
								</Button>
							))}
						</div>
					</DialogContent>
				)}
			</Dialog>
		</section>
	);
};

export default AddResumeSectionModal;
