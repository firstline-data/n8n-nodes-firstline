import type { IHttpRequestOptions, INodeProperties, PreSendAction } from 'n8n-workflow';

const showOnlyForCompanySearch = {
	operation: ['search'],
	resource: ['company'],
};

// Helper to remove empty values from request body
const removeIfEmpty = (property: string): PreSendAction => async function (
	this,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as Record<string, unknown> | undefined;
	if (body) {
		const value = body[property];
		if (value === '' || value === undefined || (Array.isArray(value) && value.length === 0)) {
			delete body[property];
		}
	}
	return requestOptions;
};

export const companySearchDescription: INodeProperties[] = [
	// Basic text search
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		description: 'Search by company name (contains logic, case-insensitive)',
		routing: {
			send: {
				type: 'body',
				property: 'query',
				preSend: [removeIfEmpty('query')],
			},
		},
	},
	{
		displayName: 'Legal Form',
		name: 'legalForm',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		description: 'Filter by legal form (e.g., "GmbH", "AG")',
		routing: {
			send: {
				type: 'body',
				property: 'legalForm',
				preSend: [removeIfEmpty('legalForm')],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		description: 'Page number for pagination',
		routing: {
			send: {
				type: 'body',
				property: 'page',
			},
		},
	},
	{
		displayName: 'Include Non-Active',
		name: 'includeNonActive',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		description:
			'Whether to include companies with non-active status (dissolved, liquidation, etc.)',
		routing: {
			send: {
				type: 'body',
				property: 'includeNonActive',
			},
		},
	},

	// Multi-select enum filters
	{
		displayName: 'Founding Date Ranges',
		name: 'foundingDateRanges',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		options: [
			{ name: 'Between 1 and 5 Years', value: 'between_1y_and_5y' },
			{ name: 'Between 10 and 25 Years', value: 'between_10y_and_25y' },
			{ name: 'Between 5 and 10 Years', value: 'between_5y_and_10y' },
			{ name: 'Less Than 1 Year', value: 'less_than_1y' },
			{ name: 'More Than 25 Years', value: 'more_than_25y' },
		],
		description: 'Filter by company age (multiple selections connected with OR)',
		routing: {
			send: {
				type: 'body',
				property: 'foundingDateRanges',
				preSend: [removeIfEmpty('foundingDateRanges')],
			},
		},
	},
	{
		displayName: 'Revenue Range',
		name: 'revenueRange',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		options: [
			{ name: 'Between 100M and 1B', value: 'between_100m_and_1b' },
			{ name: 'Between 10M and 100M', value: 'between_10m_and_100m' },
			{ name: 'Between 1M and 10M', value: 'between_1m_and_10m' },
			{ name: 'Less Than 1M', value: 'less_than_1m' },
			{ name: 'More Than 1B', value: 'more_than_1b' },
		],
		description: 'Filter by revenue range (multiple selections connected with OR)',
		routing: {
			send: {
				type: 'body',
				property: 'revenueRange',
				preSend: [removeIfEmpty('revenueRange')],
			},
		},
	},
	{
		displayName: 'Earnings Range',
		name: 'earningsRange',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		options: [
			{ name: 'Negative: 0 to 1M Loss', value: 'negative_between_0_and_1m' },
			{ name: 'Negative: 100M to 1B Loss', value: 'negative_between_100m_and_1b' },
			{ name: 'Negative: 10M to 100M Loss', value: 'negative_between_10m_and_100m' },
			{ name: 'Negative: 1M to 10M Loss', value: 'negative_between_1m_and_10m' },
			{ name: 'Negative: More Than 1B Loss', value: 'negative_more_than_1b' },
			{ name: 'Positive: 0 to 1M Profit', value: 'positive_between_0_and_1m' },
			{ name: 'Positive: 100M to 1B Profit', value: 'positive_between_100m_and_1b' },
			{ name: 'Positive: 10M to 100M Profit', value: 'positive_between_10m_and_100m' },
			{ name: 'Positive: 1M to 10M Profit', value: 'positive_between_1m_and_10m' },
			{ name: 'Positive: More Than 1B Profit', value: 'positive_more_than_1b' },
		],
		description: 'Filter by earnings range (multiple selections connected with OR)',
		routing: {
			send: {
				type: 'body',
				property: 'earningsRange',
				preSend: [removeIfEmpty('earningsRange')],
			},
		},
	},
	{
		displayName: 'Mandatory Fields',
		name: 'mandatoryFields',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		options: [{ name: 'Website', value: 'website' }],
		description: 'Only return companies that have these fields populated',
		routing: {
			send: {
				type: 'body',
				property: 'mandatoryFields',
				preSend: [removeIfEmpty('mandatoryFields')],
			},
		},
	},

	// Location filters (complex)
	{
		displayName: 'Location Filters',
		name: 'location',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		placeholder: 'Add Location Filter',
		options: [
			{
				name: 'locationFilter',
				displayName: 'Location',
				values: [
					{
						displayName: 'Country',
						name: 'country',
						type: 'options',
						options: [
							{ name: 'Austria', value: 'AT' },
							{ name: 'Germany', value: 'DE' },
						],
						default: 'DE',
						required: true,
						description: 'Country to filter by',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'State/region to filter by (optional)',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'City to filter by (optional)',
					},
				],
			},
			{
				name: 'radiusFilter',
				displayName: 'Radius Search',
				values: [
					{
						displayName: 'Latitude',
						name: 'latitude',
						type: 'number',
						typeOptions: {
							minValue: -90,
							maxValue: 90,
						},
						default: 48.2082,
						required: true,
						description: 'Latitude of the center point',
					},
					{
						displayName: 'Longitude',
						name: 'longitude',
						type: 'number',
						typeOptions: {
							minValue: -180,
							maxValue: 180,
						},
						default: 16.3738,
						required: true,
						description: 'Longitude of the center point',
					},
					{
						displayName: 'Radius (Km)',
						name: 'radius',
						type: 'number',
						typeOptions: {
							minValue: 0,
						},
						default: 10,
						required: true,
						description: 'Search radius in kilometers',
					},
				],
			},
		],
		description: 'Filter by location (country/city or radius search)',
		routing: {
			send: {
				type: 'body',
				property: 'location',
				preSend: [
					async function (this, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const body = requestOptions.body as Record<string, unknown> | undefined;
						if (!body) return requestOptions;

						const location = body.location as {
							locationFilter?: Array<{ country: string; state?: string; city?: string }>;
							radiusFilter?: Array<{ latitude: number; longitude: number; radius: number }>;
						} | undefined;

						if (!location) {
							delete body.location;
							return requestOptions;
						}

						const result: Array<object> = [];

						if (location.locationFilter?.length) {
							for (const l of location.locationFilter) {
								result.push({
									type: 'location',
									country: l.country,
									...(l.state && { state: l.state }),
									...(l.city && { city: l.city }),
								});
							}
						}

						if (location.radiusFilter?.length) {
							for (const r of location.radiusFilter) {
								result.push({
									type: 'radius',
									latitude: r.latitude,
									longitude: r.longitude,
									radius: r.radius,
								});
							}
						}

						if (result.length === 0) {
							delete body.location;
						} else {
							body.location = result;
						}

						return requestOptions;
					},
				],
			},
		},
	},

	// Industry filters (complex)
	{
		displayName: 'Industry Filters',
		name: 'industries',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: showOnlyForCompanySearch,
		},
		placeholder: 'Add Industry Filter',
		options: [
			{
				name: 'industryFilter',
				displayName: 'Industry',
				values: [
					{
						displayName: 'Standard',
						name: 'standard',
						type: 'options',
						options: [
							{ name: 'ISIC', value: 'isic' },
							{ name: 'NACE', value: 'nace' },
							{ name: 'NACE 2025', value: 'nace2025' },
							{ name: 'NAICS', value: 'naics' },
							{ name: 'UK SIC', value: 'uksic' },
							{ name: 'WZ (German)', value: 'wz' },
						],
						default: 'nace',
						required: true,
						description: 'Industry classification standard',
					},
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						required: true,
						description: 'Industry code (e.g., "62.01" for software development)',
					},
				],
			},
		],
		description: 'Filter by industry codes (multiple selections connected with OR)',
		routing: {
			send: {
				type: 'body',
				property: 'industries',
				preSend: [
					async function (this, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const body = requestOptions.body as Record<string, unknown> | undefined;
						if (!body) return requestOptions;

						const industries = body.industries as {
							industryFilter?: Array<{ standard: string; code: string }>;
						} | undefined;

						if (!industries?.industryFilter?.length) {
							delete body.industries;
						} else {
							body.industries = industries.industryFilter;
						}

						return requestOptions;
					},
				],
			},
		},
	},
];
