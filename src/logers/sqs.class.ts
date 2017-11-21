import {SQS} from 'aws-sdk';
import {ISqsAsync} from '../';
import Logger from './logger.class';

export default class SqsAsyncLogger extends Logger<ISqsAsync> implements ISqsAsync {
	public sendMessageBatch(input: SQS.SendMessageBatchRequest) {
		return this.callServiceFunction('sendMessageBatch', input);
	}

	public receiveMessage(input: SQS.ReceiveMessageRequest) {
		return this.callServiceFunction('receiveMessage', input);
	}

	public deleteMessage(input: SQS.DeleteMessageRequest) {
		return this.callServiceFunction('deleteMessage', input);
	}

	public deleteMessageBatch(input: SQS.DeleteMessageBatchRequest) {
		return this.callServiceFunction('deleteMessageBatch', input);
	}

	protected parseFuncInput(input: any): any {
		return input;
	}

	protected parseFuncOutput(input: any): any {
		return input;
	}
}
