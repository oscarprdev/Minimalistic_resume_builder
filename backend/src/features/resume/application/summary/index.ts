import { CommonResumeDatabase } from '../../infrastructure/common';
import { SummaryResumeDatabase } from '../../infrastructure/summary';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateSummaryAdapter } from './create/create_summary.adapter';
import { CreateSummaryHandler, DefaultCreateSummaryHandler } from './create/create_summary.handler';
import { DefaultCreateSummaryUsecase } from './create/create_summary.use_case';

export interface SumaryUsecase {
	// describeSumary(): DescribeSumaryHandler;
	createSumary(): CreateSummaryHandler;
}

export class DefaultSumaryUsecase implements SumaryUsecase {
	constructor(private readonly database: SummaryResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	// describeSumary() {
	// 	const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
	// 	const describeSumaryAdapter = new DescribeSumaryAdapter(this.database);
	// 	const describeSumaryUsecase = new DefaultDescribeSumaryUsecase(describeSumaryAdapter, commonResumeAdapter);

	// 	return new DefaultDescribeSumaryHandler(describeSumaryUsecase);
	// }

	createSumary() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createSumaryAdapter = new CreateSummaryAdapter(this.database);
		const createSumaryUsecase = new DefaultCreateSummaryUsecase(createSumaryAdapter, commonResumeAdapter);

		return new DefaultCreateSummaryHandler(createSumaryUsecase);
	}
}
