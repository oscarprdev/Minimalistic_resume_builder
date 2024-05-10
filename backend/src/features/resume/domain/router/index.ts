import { Router, RouterType } from 'itty-router';
import { RouterStrategy } from '../../../core/domain/interfaces';
import { ResumeApplication } from '../../application';

const RESUME_COMMON_PATH = '/resume/:userId/:resumeId';

export class ResumeRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor(private readonly resumeApplication: ResumeApplication) {
		this.internalRouter = Router();
	}

	router(): RouterType {
		this.routeController();

		return this.internalRouter;
	}

	async handle(request: Request): Promise<Response> {
		return this.internalRouter.handle(request);
	}

	private routeController() {
		this.internalRouter.get(`${RESUME_COMMON_PATH}/header`, (req) =>
			this.resumeApplication.headerUsecase().describeHeader().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/header`, (req) =>
			this.resumeApplication.headerUsecase().createHeader().handleRequest(req)
		);

		this.internalRouter.get(`${RESUME_COMMON_PATH}/summary`, (req) =>
			this.resumeApplication.summaryUsecase().describeSumary().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/summary`, (req) =>
			this.resumeApplication.summaryUsecase().createSumary().handleRequest(req)
		);

		this.internalRouter.get(`${RESUME_COMMON_PATH}/experience`, (req) =>
			this.resumeApplication.experienceUsecase().describeExperience().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/experience`, (req) =>
			this.resumeApplication.experienceUsecase().createExperience().handleRequest(req)
		);

		this.internalRouter.get(`${RESUME_COMMON_PATH}/education`, (req) =>
			this.resumeApplication.educationUsecase().describeEducation().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/education`, (req) =>
			this.resumeApplication.educationUsecase().createEducation().handleRequest(req)
		);

		this.internalRouter.get(`${RESUME_COMMON_PATH}/languages`, (req) =>
			this.resumeApplication.languagesUsecase().describeLanguages().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/languages`, (req) =>
			this.resumeApplication.languagesUsecase().createLanguages().handleRequest(req)
		);
	}
}
