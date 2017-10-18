import {SNS} from 'aws-sdk';

export interface ISnsAsync {
	publish(i: SNS.PublishInput): Promise<SNS.PublishResponse>;
}

export class SnsAsync implements ISnsAsync {
	constructor(private sns: SNS) {}
	public async publish(i: SNS.PublishInput) {
		return new Promise<SNS.PublishResponse>(
			(rs, rj) => this.sns.publish(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}
}
