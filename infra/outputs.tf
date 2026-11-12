output "api_url" {
  description = "Public address of the API. Point api.davidmanuel.fr to it with a CNAME."
  value       = "https://${azurerm_container_app.api.ingress[0].fqdn}"
}

output "web_url" {
  description = "Address of the website before the custom domain is set. Point davidmanuel.fr to it."
  value       = "https://${azurerm_container_app.web.ingress[0].fqdn}"
}

output "function_app_name" {
  value = azurerm_function_app_flex_consumption.main.name
}

output "database_url" {
  description = "Used by the deploy workflow to run the Prisma migrations."
  value       = local.db_url
  sensitive   = true
}

output "github_client_id" {
  description = "AZURE_CLIENT_ID secret on GitHub."
  value       = azurerm_user_assigned_identity.github.client_id
}

output "github_tenant_id" {
  description = "AZURE_TENANT_ID secret on GitHub."
  value       = azurerm_user_assigned_identity.github.tenant_id
}

output "environment_ip" {
  description = "A record of davidmanuel.fr at OVH."
  value       = azapi_resource.environment.output.properties.staticIp
}

output "domain_verification_id" {
  description = "TXT records asuid, asuid.www and asuid.api at OVH."
  value       = azapi_resource.environment.output.properties.customDomainConfiguration.customDomainVerificationId
}
