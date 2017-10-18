import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';

export interface IDynamoDocumentClientAsync {
	get(i: DocumentClient.GetItemInput): Promise<DocumentClient.GetItemOutput>;
	batchGet(i: DocumentClient.BatchGetItemInput): Promise<DocumentClient.BatchGetItemOutput>;
	query(i: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput>;
	scan(i: DocumentClient.ScanInput): Promise<DocumentClient.ScanOutput>;
	update(i: DocumentClient.UpdateItemInput): Promise<DocumentClient.UpdateItemOutput>;
	put(i: DocumentClient.PutItemInput): Promise<DocumentClient.PutItemOutput>;
}

export class DynamoDocumentClientAsync implements IDynamoDocumentClientAsync {
	constructor(
		private dc: DocumentClient,
	) {
	}

	public async get(input: DocumentClient.GetItemInput) {
		return new Promise<DocumentClient.GetItemOutput>(
			(rs, rj) => this.dc.get(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}

	public async batchGet(input: DocumentClient.BatchGetItemInput) {
		return new Promise<DocumentClient.BatchGetItemOutput>(
			(rs, rj) => this.dc.batchGet(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}

	public async query(input: DocumentClient.QueryInput) {
		return new Promise<DocumentClient.QueryOutput>(
			(rs, rj) => this.dc.scan(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}

	public async scan(input: DocumentClient.ScanInput) {
		return new Promise<DocumentClient.ScanOutput>(
			(rs, rj) => this.dc.scan(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}

	public async update(input: DocumentClient.UpdateItemInput) {
		return new Promise<DocumentClient.UpdateItemOutput>(
			(rs, rj) => this.dc.get(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}

	public async put(input: DocumentClient.PutItemInput) {
		return new Promise<DocumentClient.PutItemOutput>(
			(rs, rj) => this.dc.put(input, (err, data) => err ? rj(err) : rs(data)),
		);
	}
}
