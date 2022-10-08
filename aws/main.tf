terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.33.0"
    }
  }
}

// Variables
variable "region" {
  type    = string
  default = "eu-central-1"
}
// ---

// Resources
provider "aws" {
  region = var.region
}

resource "aws_vpc" "tch_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "tch"
  }
}

resource "aws_subnet" "tch_subnet" {
  vpc_id                  = aws_vpc.tch_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "tch"
  }
}

// ---