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
// ---

provider "aws" {
  region = var.region
  shared_credentials_files = [ ".credentials" ]
}

