import { Router, RouterType } from 'itty-router';
import { RouterStrategy } from '../../../core/domain/interfaces';
import { ResumeApplication } from '../../application';

const RESUME_COMMON_PATH = '/resume/:userId/:resumeId';

export class ResumeRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor(private readonly resumeApplication: ResumeApplication) {
		this.internalRouter = Router();
	}

	router(request: Request): RouterType {
		this.routeController(request);

		return this.internalRouter;
	}

	async handle(request: Request): Promise<Response> {
		return this.internalRouter.handle(request);
	}

	private routeController(request: Request) {
		this.internalRouter.get(`${RESUME_COMMON_PATH}/header`, (req) =>
			this.resumeApplication.headerUsecase().describeHeader().handleRequest(req)
		);
		this.internalRouter.post(`${RESUME_COMMON_PATH}/header`, (req) =>
			this.resumeApplication.headerUsecase().createHeader().handleRequest(req)
		);

		this.internalRouter.post(`${RESUME_COMMON_PATH}/summary`, (req) =>
			this.resumeApplication.summaryUsecase().createSumary().handleRequest(req)
		);
	}
}
