import {S3} from 'aws-sdk';

export interface IS3Async {
	putObject(i: S3.PutObjectRequest): Promise<S3.PutObjectOutput>;
}

export class S3Async implements IS3Async {

	constructor(private s3: S3) {}

	public async putObject(i: S3.PutObjectRequest) {
		return new Promise<S3.PutObjectOutput>(
			(rs, rj) => this.s3.putObject(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}
}
