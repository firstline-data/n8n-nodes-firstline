import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { BASE_URL } from '../nodes/Firstline/constants';

export class FirstlineApi implements ICredentialType {
	name = 'firstlineApi';

	displayName = 'Firstline API';

	documentationUrl = 'https://docs.firstline.sh';

	icon = {
		light: 'file:../nodes/Firstline/firstline.svg',
		dark: 'file:../nodes/Firstline/firstline.dark.svg',
	} as const;

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: BASE_URL,
			url: '/health',
		},
	};
}
