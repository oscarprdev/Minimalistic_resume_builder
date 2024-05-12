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
		this.globalRouter();
		this.headerRouter();
		this.summaryRouter();
		this.experienceRouter();
		this.educationRouter();
		this.languagesRouter();
		this.skillsRouter();
	}

	private globalRouter() {
		this.internalRouter.get(`/resume/:userId/list`, (req) => this.resumeApplication.globalUsecase().listResume().handleRequest(req));
	}

	private headerRouter() {
		const headerPath = `${RESUME_COMMON_PATH}/header`;
		this.internalRouter.get(headerPath, (req) => this.resumeApplication.headerUsecase().describeHeader().handleRequest(req));
		this.internalRouter.post(headerPath, (req) => this.resumeApplication.headerUsecase().createHeader().handleRequest(req));
		this.internalRouter.delete(headerPath, (req) => this.resumeApplication.headerUsecase().deleteHeader().handleRequest(req));
	}

	private summaryRouter() {
		const summaryPath = `${RESUME_COMMON_PATH}/summary`;
		this.internalRouter.get(summaryPath, (req) => this.resumeApplication.summaryUsecase().describeSummary().handleRequest(req));
		this.internalRouter.post(summaryPath, (req) => this.resumeApplication.summaryUsecase().createSummary().handleRequest(req));
		this.internalRouter.delete(summaryPath, (req) => this.resumeApplication.summaryUsecase().deleteSummary().handleRequest(req));
	}

	private experienceRouter() {
		const experiencePath = `${RESUME_COMMON_PATH}/experience`;
		this.internalRouter.get(experiencePath, (req) => this.resumeApplication.experienceUsecase().describeExperience().handleRequest(req));
		this.internalRouter.post(experiencePath, (req) => this.resumeApplication.experienceUsecase().createExperience().handleRequest(req));
		this.internalRouter.delete(experiencePath, (req) => this.resumeApplication.experienceUsecase().deleteExperience().handleRequest(req));
	}

	private educationRouter() {
		const educationPath = `${RESUME_COMMON_PATH}/education`;
		this.internalRouter.get(educationPath, (req) => this.resumeApplication.educationUsecase().describeEducation().handleRequest(req));
		this.internalRouter.post(educationPath, (req) => this.resumeApplication.educationUsecase().createEducation().handleRequest(req));
		this.internalRouter.delete(educationPath, (req) => this.resumeApplication.educationUsecase().deleteEducation().handleRequest(req));
	}

	private languagesRouter() {
		const languagesPath = `${RESUME_COMMON_PATH}/languages`;
		this.internalRouter.get(languagesPath, (req) => this.resumeApplication.languagesUsecase().describeLanguages().handleRequest(req));
		this.internalRouter.post(languagesPath, (req) => this.resumeApplication.languagesUsecase().createLanguages().handleRequest(req));
		this.internalRouter.delete(languagesPath, (req) => this.resumeApplication.languagesUsecase().deleteLanguages().handleRequest(req));
	}

	private skillsRouter() {
		const skillsPath = `${RESUME_COMMON_PATH}/skills`;
		this.internalRouter.get(skillsPath, (req) => this.resumeApplication.skillsUsecase().describeSkills().handleRequest(req));
		this.internalRouter.post(skillsPath, (req) => this.resumeApplication.skillsUsecase().createSkills().handleRequest(req));
		this.internalRouter.delete(skillsPath, (req) => this.resumeApplication.skillsUsecase().deleteSkills().handleRequest(req));
	}
}
