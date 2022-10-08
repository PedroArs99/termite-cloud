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

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.tch_vpc.id

  ingress {
    description      = "SSH from VPC"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = [aws_vpc.tch_vpc.cidr_block]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_ssh"
  }
}

resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"
  vpc_id      = aws_vpc.tch_vpc.id

  ingress {
    description      = "HTTP from VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = [aws_vpc.tch_vpc.cidr_block]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_http"
  }
}

resource "aws_key_pair" "tch_key_pair" {
  key_name = "tch_key"
  public_key = file("~/.ssh/tch_rsa.pub")
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Amazon
}

// ---