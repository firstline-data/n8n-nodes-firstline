# n8n-nodes-firstline

This is an n8n community node that integrates [Firstline](https://firstline.sh) with your n8n workflows, allowing you to access company data for Germany and Austria.

[Firstline](https://firstline.sh) provides affordable company data via API, while [n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform that allows you to connect various services.

## Table of Contents

- [Installation (Self-Hosted)](#installation-self-hosted)
- [Installation (n8n Cloud)](#installation-n8n-cloud)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Troubleshooting](#troubleshooting)

## Installation (Self-Hosted)

To install the Firstline community node from the n8n Editor UI:

1. Open your n8n instance.
2. Go to **Settings > Community Nodes**.
3. Select **Install**.
4. Enter the npm package name: `n8n-nodes-firstline`.
5. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**.
6. The node is now available to use in your workflows.

## Installation (n8n Cloud)

If you're using n8n Cloud:

1. Go to the **Canvas** and open the **nodes panel**.
2. Search for **Firstline** in the community node registry.
3. Click **Install node** to add the Firstline node to your instance.

## Operations

### Company

- **Get**: Retrieve detailed company information by ID
  - Returns company name, legal form, status, foundation date, VAT ID
  - Headquarters address with coordinates
  - Contact data (emails, phones, websites, faxes)
  - Managers with positions and tenure
  - Industry codes (NACE, ISIC, NAICS, WZ, UK SIC)
  - Financial data (revenue, earnings, equity, and more)

- **Search**: Search for companies with filters
  - Query by company name
  - Filter by legal form (e.g., "GmbH", "AG")
  - Filter by location (country, state, city) or radius search
  - Filter by industry codes
  - Filter by founding date range
  - Filter by revenue range
  - Filter by earnings range
  - Filter by mandatory fields (e.g., website required)
  - Include/exclude non-active companies
  - Paginated results

## Credentials

### Getting your API Key

1. Sign up at [Firstline Dashboard](https://dashboard.firstline.sh)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key for use in n8n

### Configuring in n8n

1. In n8n, go to **Credentials**.
2. Click **Add Credential**.
3. Search for **Firstline API**.
4. Paste your API key.
5. Save the credential.

## Compatibility

This node has been tested with n8n version 1.57.0+.

## Usage

### Example: Get Company by ID

1. Add a **Firstline** node to your workflow.
2. Select **Get** operation.
3. Enter the company ID (UUID format).
4. Execute to retrieve company details.

### Example: Search Companies

1. Add a **Firstline** node to your workflow.
2. Select **Search** operation.
3. Enter a search query (e.g., "Volkswagen").
4. Optionally add filters (location, industry, revenue range, etc.).
5. Execute to get matching companies.

### Available Countries

- Germany (DE)
- Austria (AT)

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Firstline API Documentation](https://docs.firstline.sh)
- [Firstline Dashboard](https://dashboard.firstline.sh)

## Troubleshooting

### Common Issues

1. **Authentication errors**
   - Verify your API key is correct
   - Ensure the API key isn't deleted
   - Check that you have an active subscription

2. **No results returned**
   - Verify the company ID format (UUID)
   - Check your search filters aren't too restrictive
   - Ensure you're searching in supported countries (DE, AT)

3. **Rate limiting**
   - Check your plan limits in the Firstline Dashboard
   - Consider upgrading if you need higher limits

### Getting Help

If you encounter issues:
1. Check the [Firstline API Documentation](https://docs.firstline.sh)
2. Review the [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
3. Open an issue in the [GitHub repository](https://github.com/firstline-data/n8n-nodes-firstline)
