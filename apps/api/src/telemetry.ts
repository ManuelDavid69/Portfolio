import { useAzureMonitor } from '@azure/monitor-opentelemetry';

/**
 * OpenTelemetry traces and logs sent to Application Insights.
 * Loaded with "node --import" before the app, so HTTP and PostgreSQL calls are traced automatically.
 * Nothing happens in local development, where the connection string is not set.
 */
if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  useAzureMonitor();
}
