import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { companyDescription } from './resources/company';
import { BASE_URL } from './constants';

export class Firstline implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Firstline',
		name: 'firstline',
		icon: { light: 'file:firstline.svg', dark: 'file:firstline.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Firstline API',
		defaults: {
			name: 'Firstline',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'firstlineApi', required: true }],
		requestDefaults: {
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'company',
			},
			...companyDescription,
		],
	};
}
