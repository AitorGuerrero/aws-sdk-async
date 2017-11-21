import {SNS} from 'aws-sdk';
import {ISnsAsync} from '../';
import Logger from './logger.class';

export default class SnsAsyncLogger extends Logger<ISnsAsync> implements ISnsAsync {
	public publish(input: SNS.PublishInput) {
		return this.callServiceFunction('invoke', input);
	}

	protected parseFuncInput(input: any) {
		return input;
	}

	protected parseFuncOutput(input: any) {
		return input;
	}
}
