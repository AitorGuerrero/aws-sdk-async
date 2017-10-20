import {Lambda} from 'aws-sdk';
import {InvocationRequest, InvocationResponse} from 'aws-sdk/clients/lambda';

export interface ILambdaAsync {
	invoke(r: InvocationRequest): Promise<InvocationResponse>;
}

export class LambdaAsync implements ILambdaAsync {
	constructor(private lambda: Lambda) {}

	public invoke(r: InvocationRequest) {
		return new Promise((rs, rj) => this.lambda.invoke(r, (err, data) => err ? rj(err) : rs(data)));
	}
}
