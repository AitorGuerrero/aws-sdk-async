import {S3} from 'aws-sdk';
import {IS3Async} from '../';
import {LogLevel} from './log-level.enum';
import Logger from './logger.class';

export default class S3AsyncLogger extends Logger<IS3Async> implements IS3Async {

	public async putObject(input: S3.PutObjectRequest) {
		return this.callServiceFunction('putObject', input);
	}

	public async upload(input: S3.PutObjectRequest) {
		return this.callServiceFunction('upload', input);
	}

	public async getObject(input: S3.GetObjectRequest) {
		return this.callServiceFunction('getObject', input);
	}

	public async copyObject(input: S3.CopyObjectRequest) {
		return this.callServiceFunction('copyObject', input);
	}

	protected parseFuncInput(input: any) {
		return Object.assign({}, input, {
			Body: '[file-body]',
		});
	}

	protected parseFuncOutput(input: any) {
		return Object.assign({}, input, {
			Body: '[file-body]',
		});
	}

	protected async callPutPostFunction(functionName: string, input: any) {
		const callNumber = this.callsCount++;
		const tag = Logger.toTag(functionName);
		let response: any;
		this.log(tag, callNumber, `[CALLED] ${input}`, LogLevel.basic);
		try {
			response = await ((this.service as any)[functionName] as (input: any) => any)(input);
		} catch (err) {
			this.log(tag, callNumber, `[ERROR] ${err.stack}`, LogLevel.error);
			throw err;
		}
		this.log(tag, callNumber, `[OK]`, LogLevel.basic);

		return response;
	}
}
