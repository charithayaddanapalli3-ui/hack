# LocalLink - Deployment Guide

##  Production Deployment Options

Choose the deployment platform that best suits your needs.

---

## 1. Heroku Deployment (Easiest)

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed
- Git repository initialized

### Backend Deployment

1. **Create Heroku app:**
```bash
heroku login
heroku create locallink-api
```

2. **Add MongoDB Add-on:**
```bash
heroku addons:create mongolab:sandbox --app locallink-api
```

3. **Set environment variables:**
```bash
heroku config:set JWT_SECRET=your_secure_secret --app locallink-api
heroku config:set NODE_ENV=production --app locallink-api
heroku config:set GOOGLE_MAPS_API_KEY=your_key --app locallink-api
```

4. **Deploy:**
```bash
git push heroku main
```

5. **View logs:**
```bash
heroku logs --tail --app locallink-api
```

### Frontend Deployment (Vercel)

1. **Create Vercel account** at vercel.com

2. **Deploy:**
```bash
npm install -g vercel
vercel
```

3. **Configure environment:**
```
REACT_APP_API_URL=https://locallink-api.herokuapp.com/api
```

---

## 2. AWS Deployment

### Architecture
- **Frontend:** S3 + CloudFront (CDN)
- **Backend:** EC2 or ECS
- **Database:** MongoDB Atlas
- **Storage:** S3 for file uploads

### Detailed Steps

#### Frontend on S3 + CloudFront

1. **Build the app:**
```bash
cd frontend
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://locallink-frontend
```

3. **Upload build files:**
```bash
aws s3 sync build/ s3://locallink-frontend/
```

4. **Create CloudFront distribution:**
   - Use S3 bucket as origin
   - Set default root object to `index.html`
   - Enable HTTPS

**Cost:** ~$0.085/GB + CDN charges

#### Backend on EC2

1. **Launch EC2 instance:**
   - Ubuntu 20.04 LTS
   - t3.micro (free tier eligible)
   - Security group: Allow ports 22, 5000

2. **SSH into instance:**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

3. **Install dependencies:**
```bash
sudo apt update
sudo apt install nodejs npm git

# Install MongoDB
sudo apt install mongodb-org
```

4. **Setup backend:**
```bash
git clone your-repo
cd backend
npm install
```

5. **Create .env file:**
```bash
nano .env
# Add your configuration
```

6. **Start with PM2 (process manager):**
```bash
npm install -g pm2
pm2 start server.js --name "locallink"
pm2 startup
pm2 save
```

7. **Configure Nginx as reverse proxy:**
```bash
sudo apt install nginx

# Edit /etc/nginx/sites-available/default
# Add proxy settings to port 5000
```

**Connect domains:**
- Use Route53 for DNS
- Point to CloudFront for frontend
- Point to EC2 instance for backend

---

## 3. DigitalOcean Deployment

### Cost Effective Alternative

1. **Create Droplet:**
   - 1GB RAM / 25GB SSD: $5/month
   - Ubuntu 20.04
   - Enable IPv6

2. **SSH Access:**
```bash
ssh root@your_droplet_ip
```

3. **Initial Setup:**
```bash
# Update system
apt update && apt upgrade -y

# Create new user
adduser appuser
usermod -aG sudo appuser

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
curl https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt-get update
apt-get install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod
```

4. **Deploy Application:**
```bash
git clone your-repo
cd backend
npm install
```

5. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start server.js --name locallink
pm2 startup
pm2 save
```

6. **Setup Nginx:**
```bash
apt install nginx

# Configure proxy to port 5000
systemctl enable nginx
systemctl start nginx
```

7. **SSL Certificate (Let's Encrypt):**
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

---

## 4. Docker + Container Deployment

### AWS ECS (Elastic Container Service)

1. **Push images to ECR:**
```bash
# Create ECR repositories
aws ecr create-repository --repository-name locallink-backend
aws ecr create-repository --repository-name locallink-frontend

# Build and push
docker build -t locallink-backend:latest backend/
docker tag locallink-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/locallink-backend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/locallink-backend:latest
```

2. **Create ECS cluster:**
   - Launch template with t3.micro
   - Auto-scaling group
   - Application Load Balancer

3. **Deploy with docker-compose:**
```bash
docker-compose -f docker-compose.prod.yml up
```

### Kubernetes (Scalable)

```bash
# Build images
docker build -t locallink-backend:latest backend/
docker build -t locallink-frontend:latest frontend/

# Deploy to Kubernetes
kubectl apply -f k8s/
```

---

## 5. MongoDB Atlas (Database Hosting)

### Cloud Database Setup

1. **Create account** at mongodb.com/cloud

2. **Create cluster:**
   - Free tier available
   - AWS/Azure/GCP
   - Region close to your app

3. **Configure whitelist:**
   - Allow your application IPs
   - Or use 0.0.0.0/0 (less secure)

4. **Get connection string:**
```
mongodb+srv://user:password@cluster.mongodb.net/locallink
```

5. **Update .env:**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/locallink
```

**Cost:** Free tier (up to 512MB) / $57/month for production

---

## 6. Environment Variables for Production

### Backend `.env` (Production)

```makefile
# Production
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/locallink

# JWT
JWT_SECRET=your_very_secure_random_key_at_least_32_chars

# CORS
FRONTEND_URL=https://yourdomain.com

# Google Maps
GOOGLE_MAPS_API_KEY=your_production_key

# Email (for notifications)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_key

# AWS S3 (for uploads)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=locallink-uploads

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend `.env` (Production)

```makefile
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_key
```

---

## 7. CI/CD Pipeline (GitHub Actions)

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build and Push Backend
        run: |
          docker build -t locallink-backend:latest backend/
          docker push ${{ secrets.DOCKER_USERNAME }}/locallink-backend:latest

      - name: Deploy to Production
        run: |
          ssh -i ${{ secrets.DEPLOY_KEY }} user@server
          docker pull ${{ secrets.DOCKER_USERNAME }}/locallink-backend:latest
          docker-compose up -d
```

---

## 8. SSL/HTTPS Setup

### For Heroku
Automatically provided with .herokuapp.com domain

### For Custom Domain
```bash
# Using Let's Encrypt (free)
sudo certbot certonly --standalone -d yourdomain.com

# Configure in Nginx
ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 9. Monitoring & Logging

### Application Monitoring
- **New Relic:** Application performance monitoring
- **Datadog:** Logs and monitoring
- **Sentry:** Error tracking

Example setup:
```bash
npm install @sentry/node
```

### Database Monitoring
- MongoDB Atlas dashboard
- Real-time metrics
- Performance insights

### Uptime Monitoring
- Pingdom
- UptimeRobot
- StatusPage

---

## 10. Scaling Strategy

### Horizontal Scaling
- Multiple backend instances behind load balancer
- Auto-scaling groups
- Read replicas for database

### Vertical Scaling
- Upgrade to larger instances
- Increase memory/CPU

### Caching
- Redis for session management
- CloudFront for static assets
- Database query caching

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] SSL/HTTPS enabled
- [ ] Database backed up
- [ ] Error logging setup
- [ ] Monitoring configured
- [ ] Firewall rules appropriate
- [ ] Backup strategy in place
- [ ] CI/CD pipeline working
- [ ] Load balancer configured
- [ ] CDN configured for static assets

---

## Cost Estimates (Monthly)

| Service | Cost |
|---------|------|
| Heroku (Dyno) | $7 |
| MongoDB Atlas | $0-57 |
| AWS EC2 | $10 |
| AWS S3 + CloudFront | $5-20 |
| DigitalOcean Droplet | $5 |
| Vercel (Frontend) | $0-20 |
| **Total** | **$27-120+** |

---

For more details, see the [README.md](./README.md) and [QUICK_START.md](./QUICK_START.md).
