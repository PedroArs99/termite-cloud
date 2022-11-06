data "aws_ami" "ubuntu_ami" {
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

resource "aws_key_pair" "ec2_key_pair" {
  key_name   = "tch_key"
  public_key = file("./keys/ubuntu@termite.cloud.pub")
}

resource "aws_network_interface" "ec2_nic" {
  subnet_id   = aws_subnet.tch_pub_subnet.id
  private_ips = ["10.0.1.4"]

  security_groups = [
    aws_security_group.allow_ssh.id,
    aws_security_group.allow_http.id,
    aws_security_group.allow_mqtt.id
  ]

  tags = {
    Name = "TC EC2 Primary NIC"
  }
}

resource "aws_instance" "ec2" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  key_name = aws_key_pair.ec2_key_pair.id

  tags = {
    Name = var.resourceName
  }

  network_interface {
    network_interface_id = aws_network_interface.tch_ec2_network_interface.id
    device_index         = 0
  }
}