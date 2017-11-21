import {LogLevel} from './log-level.enum';

export default abstract class Logger<S> {

	protected static toTag(str: string) {
		return str
			.replace(/([A-Z])([A-Z])/g, (a, pre, post) => `${pre}-${post}`)
			.replace(/([a-z])([A-Z])/g, (a, pre, post) => `${pre}-${post}`)
			.toUpperCase();
	}

	protected callsCount: number;
	protected logLevel: LogLevel;
	private serviceName: string;

	constructor(
		protected service: S,
		private console: Console,
		logLevel?: LogLevel,
	) {
		this.serviceName = Logger.toTag(service.constructor.name);
		this.logLevel = (undefined === logLevel) ? LogLevel.basic : logLevel;
		this.callsCount = 0;
	}

	protected abstract parseFuncInput(input: any): any;
	protected abstract parseFuncOutput(input: any): any;

	protected async callServiceFunction(functionName: string, input: any) {
		const callNumber = this.callsCount++;
		const tag = Logger.toTag(functionName);
		let response: any;
		this.log(tag, callNumber, `[CALLED] ${this.parseFuncInput(input)}`, LogLevel.basic);
		try {
			response = await ((this.service as any)[functionName] as (input: any) => any)(input);
		} catch (err) {
			this.log(tag, callNumber, `[ERROR] ${err.stack}`, LogLevel.error);
			throw err;
		}
		this.log(tag, callNumber, `[OK] ${this.parseFuncOutput(response)}`, LogLevel.basic);

		return response;
	}

	protected log(tag: string, callNumber: number, message: string, level: LogLevel) {
		if (level > this.logLevel) {
			return;
		}
		const parsedMessage = typeof message === 'string' ? message : JSON.stringify(message);
		this.console.log(`[SERV:${this.serviceName}] [FUNC:${tag}] [CALL:${callNumber}] ${parsedMessage}`);
	}
}
