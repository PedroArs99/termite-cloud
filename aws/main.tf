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

resource "aws_internet_gateway" "tch_gateway" {
  vpc_id = aws_vpc.tch_vpc.id

  tags = {
    Name = "tch"
  }
}

resource "aws_route_table" "tch_route_table" {
  vpc_id = aws_vpc.tch_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.tch_gateway.id
  }

  tags = {
    Name = "tch"
  }
}

resource "aws_route_table_association" "tch_rt_association" {
  subnet_id      = aws_subnet.tch_subnet.id
  route_table_id = aws_route_table.tch_route_table.id
}
// ---