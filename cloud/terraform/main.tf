resource "aws_vpc" "tch_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = var.resourceName
  }
}

resource "aws_internet_gateway" "tch_igw" {
  vpc_id = aws_vpc.tch_vpc.id

  tags = {
    Name = var.resourceName
  }
}

resource "aws_route_table" "tch_main_rt" {
  vpc_id = aws_vpc.tch_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.tch_igw.id
  }

  tags = {
    Name = var.resourceName
  }
}

resource "aws_subnet" "tch_pub_subnet" {
  vpc_id                  = aws_vpc.tch_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = var.resourceName
  }
}

// pub_subnet with main_rt association
resource "aws_route_table_association" "tch_rt_association" {
  subnet_id      = aws_subnet.tch_pub_subnet.id
  route_table_id = aws_route_table.tch_main_rt.id
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.tch_vpc.id

  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
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
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
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

resource "aws_security_group" "allow_mqtt" {
  name        = "allow_mqtt"
  description = "Allow MQTT inbound traffic"
  vpc_id      = aws_vpc.tch_vpc.id

  ingress {
    description = "MQTT from VPC"
    from_port   = 1883
    to_port     = 1883
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_mqtt"
  }
}
