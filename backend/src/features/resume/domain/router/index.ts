import { Router, RouterType } from 'itty-router';
import { RouterStrategy } from '../../../core/domain/interfaces';
import { ResumeApplication } from '../../application';

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
		// this.internalRouter.get('/resume/:userId/:resumeId/header', this.resumeApplication.headerUsecase().describeHeader().handleRequest);
		this.internalRouter.post('/resume/:userId/:resumeId/header', this.resumeApplication.headerUsecase().createHeader().handleRequest);
	}
}
