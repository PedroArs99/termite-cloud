terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.33.0"
    }
  }
}

// Variables
variable "region" {
  type = string
  default = "eu-central-1"
}

variable "credentials" {
  type = object({
    access_key = string
    secret_key = string
  })

  sensitive = true
}
// ---

provider "aws" {
  region = var.region
  access_key = var.credentials.access_key
  secret_key = var.credentials.secret_key
}

