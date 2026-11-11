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
