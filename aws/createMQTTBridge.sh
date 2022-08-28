# Pre-Conditions
# 1. AWS CLI is already configured
# 2. A policy iot:CreateKeysAndCertificate is created on IAM
# 3. A policy iot:AttachPrincipalPolicy is created on IAM
# 4. The user has the policies assigned

# Create an IAM policy for the bridge
aws iot create-policy --policy-name bridgeMQTT --policy-document '{"Version": "2012-10-17","Statement": [{"Effect": "Allow","Action": "iot:*","Resource": "*"}]}'

# Download the Amazon Root CA Certificate
mkdir -p /etc/mosquitto/certs
cd /etc/mosquitto/certs
sudo wget https://www.amazontrust.com/repository/AmazonRootCA1.pem -O rootCA.pem

# Create certificates and keys usted to encrypt the bridge.
# Make a note of the certificate ARN as it will be needed to configure the IoT Policy.
sudo aws iot create-keys-and-certificate --set-as-active --certificate-pem-outfile cert.crt --private-key-outfile private.key --public-key-outfile public.key --region eu-central-1

#Attach the IoT policy to the certificate
aws iot attach-principal-policy --policy-name bridgeMQTT <Certificate Arn>

#Add read permissions to the private key and the public certificate
sudo chmod 644 private.key
sudo chmod 644 cert.crt