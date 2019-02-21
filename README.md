
# indy-oracle2
Web application for organizing cosplay safety.

# Check it Out!
[the Indy Oracle](https://indy-oracle.com/)

# Intro
Demonstrates knowledge of:

- Docker
- Firebase
- Google Cloud
- Java
- JavaScript
- Kong
- Kubernetes
- React
- Redux
- Spring Boot 2
- Twilio

# Setup Guide
Note: I am using Google Cloud as my Kubernetes provider, so these instructions will focus on that.

1. Create your [Google Cloud](https://cloud.google.com/) account.
2. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstart-windows).
3. Install kubectl via the Google Cloud SDK: `gcloud components install kubectl`
4. Create Kubernetes Deployments: `kubectl apply -f k8s/deployments/.`
5. Create Kubernetes Services: `kubectl apply -f k8s/services/.`

# Firebase
At the root of indy-oracle-ui, provide a `.env` file to hold your Firebase config variables.

# Expose Publicly
1. Reserve a domain name (optional).
2. Deploy [Kong on Kubernetes](https://docs.konghq.com/install/kubernetes/).
3. Create a static IP via the Google Cloud SDK: `gcloud compute addresses create indy-oracle-ip --global`
4. Create a Kubernetes Ingress and set, under annotations: `kubernetes.io/ingress.global-static-ip-name: indy-oracle-ip`
5. Point your Kubernetes Ingress to the Kong-Proxy Service.
6. If you reserved a domain name, create an `A Record` pointing to your static IP.
