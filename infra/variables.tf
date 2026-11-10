variable "subscription_id" {
  description = "Azure subscription that receives the resources."
  type        = string
}

variable "location" {
  description = "Region of the resources. France Central is the closest to me."
  type        = string
  default     = "francecentral"
}

variable "static_web_app_location" {
  description = "Static Web Apps only exist in a few regions. The content is served worldwide anyway."
  type        = string
  default     = "westeurope"
}

variable "suffix" {
  description = "A few lowercase letters or digits to make global names unique (storage, function app)."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]{3,8}$", var.suffix))
    error_message = "Use 3 to 8 lowercase letters or digits."
  }
}

variable "domain" {
  description = "Domain of the website, used for CORS on the API."
  type        = string
  default     = "davidmanuel.fr"
}

variable "api_image" {
  description = "Docker image of the API, pushed by the GitHub Actions workflow."
  type        = string
  default     = "ghcr.io/manueldavid69/portfolio-api:latest"
}

variable "github_repos" {
  description = "Repositories synced every night by the C# function."
  type        = list(string)
  default     = ["ManuelDavid69/QRShield", "ManuelDavid69/PumpCast", "stonoly/CPE-iot_project-3IRC"]
}

variable "smtp" {
  description = "Mail server used by the function to forward contact messages to me."
  sensitive   = true
  type = object({
    host     = string
    port     = number
    user     = string
    password = string
    from     = string
    to       = string
  })
}
