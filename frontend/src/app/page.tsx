import Header from './components/Header/Header';
import ResumeEducationSkeleton from './components/Resume/ResumeEducation/ResumeEducationSkeleton';
import ResumeExperienceSkeleton from './components/Resume/ResumeExperience/ResumeExperienceSkeleton';
import ResumeHeaderSkeleton from './components/Resume/ResumeHeader/ResumeHeaderSkeleton';
import ResumeLanguagesSkeleton from './components/Resume/ResumeLanguages/ResumeLanguagesSkeleton';
import ResumeSkillsSkeleton from './components/Resume/ResumeSkills/ResumeSkillsSkeleton';
import ResumeSummarySkeleton from './components/Resume/ResumeSummary/ResumeSummarySkeleton';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export default async function Home() {
	const id = cookies().get('id')?.value;
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
