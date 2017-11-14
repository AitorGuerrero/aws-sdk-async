import {S3} from 'aws-sdk';

export interface IS3Async {
	putObject(i: S3.PutObjectRequest): Promise<S3.PutObjectOutput>;
	upload(i: S3.PutObjectRequest, options?: S3.ManagedUpload.ManagedUploadOptions): Promise<S3.ManagedUpload.SendData>;
	getObject(r: S3.GetObjectRequest): Promise<S3.GetObjectOutput>;
	copyObject(r: S3.CopyObjectRequest): Promise<S3.CopyObjectOutput>;
}

export class S3Async implements IS3Async {

	constructor(private s3: S3) {}

	public async putObject(i: S3.PutObjectRequest) {
		return new Promise<S3.PutObjectOutput>(
			(rs, rj) => this.s3.putObject(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public async upload(i: S3.PutObjectRequest, options?: S3.ManagedUpload.ManagedUploadOptions) {
		return new Promise<S3.ManagedUpload.SendData>(
			(rs, rj) => this.s3.upload(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public async getObject(i: S3.GetObjectRequest) {
		return new Promise<S3.GetObjectOutput>(
			(rs, rj) => this.s3.getObject(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}

	public async copyObject(i: S3.CopyObjectRequest) {
		return new Promise<S3.CopyObjectOutput>(
			(rs, rj) => this.s3.copyObject(i, (err, r) => err ? rj(err) : rs(r)),
		);
	}
}
