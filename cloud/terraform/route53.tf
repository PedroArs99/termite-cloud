resource "aws_route53_zone" "termite_cloud" {
  name = "termite.cloud"

  tags = {
    Name = "termite.cloud"
  }
}

resource "aws_route53_record" "termite_cloud_root" {
  zone_id = aws_route53_zone.termite_cloud.zone_id
  name    = "termite.cloud"
  type    = "A"
  ttl     = 300
  records = [aws_instance.ec2.public_ip]
}

resource "aws_route53_record" "termite_cloud_wildcard" {
  zone_id = aws_route53_zone.termite_cloud.zone_id
  name    = "*.termite.cloud"
  type    = "A"
  ttl     = 300
  records = [aws_instance.ec2.public_ip]
}