import { Router, RouterType } from 'itty-router';
import { RouterInput, RouterStrategy } from '../../../core/domain/interfaces';
import { UserApplication } from '../../application';
import { Env } from '../../../..';
import { DefaultErrorEntity } from '../../../core/domain/entities/Error';

const USER_COMMON_PATH = '/user';

export class UserRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor(private readonly userApplication: UserApplication) {
		this.internalRouter = Router();
	}

	router({ env }: RouterInput): RouterType {
		if (!env) {
			return new DefaultErrorEntity().sendError('ENV not found', 404, 'router');
		}

		this.routeController(env);

		return this.internalRouter;
	}

	async handle(request: Request): Promise<Response> {
		return this.internalRouter.handle(request);
	}

	private routeController(env: Env) {
		this.internalRouter.post(`${USER_COMMON_PATH}/login`, (req) =>
			this.userApplication.authUsecase().login().handleRequest(req, { secret: env.SECRET, salt: env.SALT })
		);

		this.internalRouter.post(`${USER_COMMON_PATH}/register`, (req) =>
			this.userApplication.authUsecase().register().handleRequest(req, { salt: env.SALT })
		);
	}
}
