# Azure infrastructure of davidmanuel.fr
#
#   Container App (web)  -> Angular site (static HTML served by nginx)
#   Container App (api)  -> NestJS API (scales to zero when nobody uses it)
#   PostgreSQL Flexible  -> database shared by the API and the functions
#   Function App (Flex)  -> C# functions: contact e-mail and nightly GitHub sync
#   Storage account      -> queue between the API and the e-mail function
#   Application Insights -> logs and traces of the API and the functions

terraform {
  required_version = ">= 1.9"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.13"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

locals {
  name = "davidmanuel"
  tags = { project = "portfolio" }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${local.name}"
  location = var.location
  tags     = local.tags
}

# ---------------------------------------------------------------- monitoring

resource "azurerm_log_analytics_workspace" "main" {
  name                = "log-${local.name}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = local.tags
}

resource "azurerm_application_insights" "main" {
  name                = "appi-${local.name}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"
  tags                = local.tags
}

# ------------------------------------------------------------------ database

resource "random_password" "db" {
  length  = 32
  special = false
}

# B1ms is the smallest size, and it is included in the Azure free account for 12 months.
# PostgreSQL is restricted in Germany West Central for student subscriptions, so the database lives in Switzerland North.
resource "azurerm_postgresql_flexible_server" "main" {
  name                          = "psql-${local.name}"
  resource_group_name           = azurerm_resource_group.main.name
  location                      = var.db_location
  version                       = "17"
  sku_name                      = "B_Standard_B1ms"
  storage_mb                    = 32768
  administrator_login           = "portfolio"
  administrator_password        = random_password.db.result
  public_network_access_enabled = true
  zone                          = "1"
  tags                          = local.tags
}

resource "azurerm_postgresql_flexible_server_database" "portfolio" {
  name      = "portfolio"
  server_id = azurerm_postgresql_flexible_server.main.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

# Lets Azure services (Container Apps, Functions, GitHub Actions for migrations) reach the server.
resource "azurerm_postgresql_flexible_server_firewall_rule" "azure" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

locals {
  db_host = azurerm_postgresql_flexible_server.main.fqdn
  db_url  = "postgresql://portfolio:${random_password.db.result}@${local.db_host}:5432/portfolio?sslmode=require"
  db_npgsql = join(";", [
    "Host=${local.db_host}",
    "Database=portfolio",
    "Username=portfolio",
    "Password=${random_password.db.result}",
    "SSL Mode=Require",
  ])
}

# ------------------------------------------------------------------- storage

resource "azurerm_storage_account" "main" {
  name                            = "st${local.name}${var.suffix}"
  resource_group_name             = azurerm_resource_group.main.name
  location                        = azurerm_resource_group.main.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  min_tls_version                 = "TLS1_2"
  allow_nested_items_to_be_public = false
  tags                            = local.tags
}

resource "azurerm_storage_queue" "contact" {
  name               = "contact-messages"
  storage_account_id = azurerm_storage_account.main.id
}

# The Flex Consumption plan stores the function package in a blob container.
resource "azurerm_storage_container" "functions" {
  name                  = "function-releases"
  storage_account_id    = azurerm_storage_account.main.id
  container_access_type = "private"
}

# ----------------------------------------------------------------------- API

resource "azurerm_container_app_environment" "main" {
  name                       = "cae-${local.name}"
  resource_group_name        = azurerm_resource_group.main.name
  location                   = azurerm_resource_group.main.location
  logs_destination           = "log-analytics"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                       = local.tags

  # Azure adds this pay-per-use profile anyway. Declaring it avoids a useless change at each apply.
  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
  }
}

resource "azurerm_container_app" "api" {
  name                         = "ca-${local.name}-api"
  resource_group_name          = azurerm_resource_group.main.name
  container_app_environment_id = azurerm_container_app_environment.main.id
  revision_mode                = "Single"
  workload_profile_name        = "Consumption"
  tags                         = local.tags

  secret {
    name  = "database-url"
    value = local.db_url
  }

  secret {
    name  = "storage-connection"
    value = azurerm_storage_account.main.primary_connection_string
  }

  template {
    # Zero replicas when nobody uses the API: it costs nothing between visits.
    min_replicas = 0
    max_replicas = 1

    container {
      name   = "api"
      image  = var.api_image
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
      }
      env {
        name        = "STORAGE_CONNECTION_STRING"
        secret_name = "storage-connection"
      }
      env {
        name  = "CONTACT_QUEUE"
        value = azurerm_storage_queue.contact.name
      }
      env {
        name  = "CORS_ORIGINS"
        value = "https://${var.domain},https://www.${var.domain}"
      }
      env {
        name  = "APPLICATIONINSIGHTS_CONNECTION_STRING"
        value = azurerm_application_insights.main.connection_string
      }

      readiness_probe {
        transport = "HTTP"
        path      = "/health"
        port      = 3000
      }
    }
  }

  # After the first apply, the deploy workflow sets the image of each release. Terraform must not undo it.
  lifecycle {
    ignore_changes = [template[0].container[0].image]
  }

  ingress {
    external_enabled = true
    target_port      = 3000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
}

# ----------------------------------------------------------------- functions

resource "azurerm_service_plan" "functions" {
  name                = "asp-${local.name}-func"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "FC1"
  tags                = local.tags
}

resource "azurerm_function_app_flex_consumption" "main" {
  name                = "func-${local.name}-${var.suffix}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.functions.id

  storage_container_type      = "blobContainer"
  storage_container_endpoint  = "${azurerm_storage_account.main.primary_blob_endpoint}${azurerm_storage_container.functions.name}"
  storage_authentication_type = "StorageAccountConnectionString"
  storage_access_key          = azurerm_storage_account.main.primary_access_key

  runtime_name           = "dotnet-isolated"
  runtime_version        = "10.0"
  maximum_instance_count = 40
  instance_memory_in_mb  = 512

  app_settings = {
    StorageConnection = azurerm_storage_account.main.primary_connection_string
    Database          = local.db_npgsql
    Smtp__Host        = var.smtp.host
    Smtp__Port        = tostring(var.smtp.port)
    Smtp__User        = var.smtp.user
    Smtp__Password    = var.smtp.password
    Smtp__From        = var.smtp.from
    Smtp__To          = var.smtp.to
    GitHub__Repos     = join(",", var.github_repos)
  }

  site_config {
    application_insights_connection_string = azurerm_application_insights.main.connection_string
  }

  tags = local.tags
}

# ------------------------------------------------------------------- website

# Azure Static Web Apps does not exist in the regions allowed by my student subscription,
# so the static pages are served by a small nginx container in the same environment as the API.
# One replica always on: a recruiter must never wait for a cold start on the home page.
resource "azurerm_container_app" "web" {
  name                         = "ca-${local.name}-web"
  resource_group_name          = azurerm_resource_group.main.name
  container_app_environment_id = azurerm_container_app_environment.main.id
  revision_mode                = "Single"
  workload_profile_name        = "Consumption"
  tags                         = local.tags

  template {
    min_replicas = 1
    max_replicas = 2

    container {
      name   = "web"
      image  = var.web_image
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  lifecycle {
    ignore_changes = [template[0].container[0].image]
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
}

# ------------------------------------------------------------ GitHub deploys

# Identity used by the GitHub Actions deploy workflow. GitHub proves who it is with a short-lived
# OpenID Connect token, so no password or secret key is stored on GitHub.
resource "azurerm_user_assigned_identity" "github" {
  name                = "id-${local.name}-github"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tags                = local.tags
}

resource "azurerm_federated_identity_credential" "github_main" {
  name                      = "github-main"
  user_assigned_identity_id = azurerm_user_assigned_identity.github.id
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${var.github_oidc_repo}:ref:refs/heads/main"
  audience                  = ["api://AzureADTokenExchange"]
}

# Only this resource group, nothing else in the subscription.
resource "azurerm_role_assignment" "github" {
  scope                = azurerm_resource_group.main.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.github.principal_id
}
