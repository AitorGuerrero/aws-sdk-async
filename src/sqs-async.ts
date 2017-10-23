import {SQS} from 'aws-sdk';

export interface ISqsAsync {
	sendMessageBatch(input: SQS.SendMessageBatchRequest): Promise<SQS.SendMessageBatchResult>;
	receiveMessage(input: SQS.ReceiveMessageRequest): Promise<SQS.ReceiveMessageResult>;
	deleteMessage(input: SQS.DeleteMessageRequest): Promise<{}>;
	deleteMessageBatch(input: SQS.DeleteMessageBatchRequest): Promise<SQS.DeleteMessageBatchResult>;
}

export class SqsAsync implements ISqsAsync {

	constructor(private sqs: SQS) {}

	public sendMessageBatch(req: SQS.SendMessageBatchRequest) {
		return new Promise<SQS.SendMessageBatchResult>(
			(rs, rj) => this.sqs.sendMessageBatch(req, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public receiveMessage(req: SQS.ReceiveMessageRequest) {
		return new Promise<SQS.ReceiveMessageResult>(
			(rs, rj) => this.sqs.receiveMessage(req, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public deleteMessage(req: SQS.DeleteMessageRequest) {
		return new Promise<{}>(
			(rs, rj) => this.sqs.deleteMessage(req, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public deleteMessageBatch(req: SQS.DeleteMessageBatchRequest) {
		return new Promise<SQS.DeleteMessageBatchResult>(
			(rs, rj) => this.sqs.deleteMessageBatch(req, (err, r) => err ? rj(err) : rs(r)),
		);
	}
}
