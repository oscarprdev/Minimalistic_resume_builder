import Header from './components/Header/Header';
import ResumeEducationSkeleton from './components/Resume/ResumeEducation/ResumeEducationSkeleton';
import ResumeExperienceSkeleton from './components/Resume/ResumeExperience/ResumeExperienceSkeleton';
import ResumeHeaderSkeleton from './components/Resume/ResumeHeader/ResumeHeaderSkeleton';
import ResumeLanguagesSkeleton from './components/Resume/ResumeLanguages/ResumeLanguagesSkeleton';
import ResumeSkillsSkeleton from './components/Resume/ResumeSkills/ResumeSkillsSkeleton';
import ResumeSummarySkeleton from './components/Resume/ResumeSummary/ResumeSummarySkeleton';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { Suspense } from 'react';

type HomeProps = {
	searchParams: {
		id: string;
	};
};

export const dynamic = 'force-dynamic';
export default async function Home({ searchParams: { id } }: HomeProps) {
	return (
		<>
			<Header resumeId={id} />
			<Suspense
				fallback={
					<section className="w-full flex flex-col gap-2">
						<ResumeHeaderSkeleton />
						<ResumeSummarySkeleton />
						<ResumeExperienceSkeleton />
						<ResumeEducationSkeleton />
						<ResumeSkillsSkeleton />
						<ResumeLanguagesSkeleton />
					</section>
				}>
				<HomeScreen resumeId={id} />
			</Suspense>
		</>
	);
}
