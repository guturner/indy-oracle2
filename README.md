
# indy-oracle2
Web application for organizing cosplay safety.

# Intro
Demonstrates knowledge of:
- Java
- JavaScript
- Spring Boot 2
- React
- Kong
- Kubernetes
- Docker
- Google Cloud

# Setup Guide
Note: I am using Google Cloud as my Kubernetes provider, so these instructions will focus on that.

1. Create your [Google Cloud](https://cloud.google.com/) account.
2. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstart-windows).
3. Install kubectl via the Google Cloud SDK: `gcloud components install kubectl`
4. Create Kubernetes Deployments: `kubectl apply -f k8s/deployments/.`
5. Create Kubernetes Services: `kubectl apply -f k8s/services/.`

# Expose Publicly
1. Reserve a domain name (optional).
2. Create a static IP via the Google Cloud SDK: `gcloud compute create addresses indy-oracle-ip --global`
3. Create a Kubernetes Ingress and set, under annotations: `kubernetes.io/ingress.global-static-ip-name: indy-oracle-ip`
4. Switch your indy-oracle-ui-svc `type: LoadBalancer` to `type: NodePort` and redeploy.
5. If you reserved a domain name, create an `A Record` pointing to your static IP.
