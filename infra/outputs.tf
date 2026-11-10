output "api_url" {
  description = "Public address of the API. Point api.davidmanuel.fr to it with a CNAME."
  value       = "https://${azurerm_container_app.api.ingress[0].fqdn}"
}

output "static_web_app_hostname" {
  description = "Default address of the website before the custom domain is set."
  value       = azurerm_static_web_app.site.default_host_name
}

output "static_web_app_token" {
  description = "Deployment token to store as the AZURE_STATIC_WEB_APPS_TOKEN secret on GitHub."
  value       = azurerm_static_web_app.site.api_key
  sensitive   = true
}

output "function_app_name" {
  value = azurerm_function_app_flex_consumption.main.name
}

output "database_url" {
  description = "Used by the deploy workflow to run the Prisma migrations."
  value       = local.db_url
  sensitive   = true
}
