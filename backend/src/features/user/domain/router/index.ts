import { Router, RouterType } from 'itty-router';
import { RouterStrategy } from '../../../core/domain/interfaces';
import { UserApplication } from '../../application';

const USER_COMMON_PATH = '/user';

export class UserRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor(private readonly userApplication: UserApplication) {
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
		this.internalRouter.post(`${USER_COMMON_PATH}/login`, (req) => this.userApplication.authUsecase().login().handleRequest(req));
	}
}
