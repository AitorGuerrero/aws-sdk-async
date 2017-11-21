import {DynamoDB} from 'aws-sdk';
import {IDynamoDocumentClientAsync} from '../';
import {LogLevel} from './log-level.enum';
import Logger from './logger.class';

export default class DynamoAsyncDocumentClientLogger
	extends Logger<IDynamoDocumentClientAsync>
	implements IDynamoDocumentClientAsync {

	public get(input: DynamoDB.DocumentClient.GetItemInput) {
		return this.callServiceFunction('get', input);
	}

	public batchGet(input: DynamoDB.DocumentClient.BatchGetItemInput) {
		return this.callServiceFunction('batchGet', input);
	}

	public query(input: DynamoDB.DocumentClient.QueryInput) {
		const req = Object.assign(
			{
				ReturnConsumedCapacity: this.logLevel >= LogLevel.performance ? 'INDEXES' : 'NONE',
			},
			input,
		);
		return this.callServiceFunction('query', req);
	}

	public scan(input: DynamoDB.DocumentClient.ScanInput) {
		return this.callServiceFunction('scan', this.modifyRequestInput(input));
	}

	public update(input: DynamoDB.DocumentClient.UpdateItemInput) {
		return this.callServiceFunction('update', this.modifyRequestInput(input));
	}

	public put(input: DynamoDB.DocumentClient.PutItemInput) {
		return this.callServiceFunction('put', input);
	}

	protected parseFuncInput(input: any) {
		return input;
	}

	protected parseFuncOutput(input: any) {
		return Object.assign({}, input, {
			Item: undefined !== input.Item ? '[Item]' : undefined,
			Items: undefined !== input.Item ? '[Items]' : undefined,
			Responses: undefined !== input.Responses ? '[Responses]' : undefined,
		});
	}

	private modifyRequestInput(input: any) {
		return Object.assign(
			{
				ReturnConsumedCapacity: this.logLevel >= LogLevel.performance ? 'INDEXES' : 'NONE',
			},
			input,
		);
	}
}
