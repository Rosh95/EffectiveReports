# Report Generation Service

This is a test project for generating Excel reports from customer data.

## Getting Started

### Prerequisites

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Rosh95/EffectiveReports.git
```
## 1.Install and Start Customer Service
Navigate to the customer-service directory:

```bash
cd customer-service
```
Install the dependencies:

```bash
npm install
```
Start the service:

```bash
npm run start:test
```
## 2.Install and Start Report Service
Open another terminal and navigate to the report-service directory:

```bash
cd report-service
```
Install the dependencies:

```bash
npm install
```
Start the service:

```bash
npm run start:test
```
## 3.Usage
Generate a Report
To generate a report, send a POST request to:

```bash
POST http://localhost:3001/reports
```
Include a JSON body like:

```json
{
  "serviceName": "customer-service",
  "endpoint": "http://localhost:3002/api/customers",
  "headers": ["Name", "Age", "Email"]
}
```
Check Report Status
To check the status of a report, send a GET request to:

```bash
GET http://localhost:3001/reports/{reportId}/status
```
Replace {reportId} with the ID of the report you want to check.
