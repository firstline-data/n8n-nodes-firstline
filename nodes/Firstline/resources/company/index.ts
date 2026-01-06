import type { INodeProperties } from 'n8n-workflow';
import { companyGetDescription } from './get';
import { companySearchDescription } from './search';

const showOnlyForCompanies = {
	resource: ['company'],
};

export const companyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCompanies,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a company',
				description: 'Get a single company by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/company/{{$parameter.companyId}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search companies',
				description: 'Search for companies with filters',
				routing: {
					request: {
						method: 'POST',
						url: '/search',
					},
				},
			},
		],
		default: 'search',
	},
	...companyGetDescription,
	...companySearchDescription,
];
