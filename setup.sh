#!/bin/bash
# PostgreSQL o'rnatish
sudo apt update && sudo apt install -y postgresql

# DB yaratish
sudo -u postgres psql -c "CREATE DATABASE uzum_db;"
sudo -u postgres psql -c "CREATE USER uzum_user WITH PASSWORD 'uzum_pass123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE uzum_db TO uzum_user;"

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

# Frontend build
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/

# Nginx
sudo apt install -y nginx
sudo cp ../nginx.conf /etc/nginx/sites-available/default
sudo systemctl restart nginx

# SSL (ixtiyoriy)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sizning_domen.uz  # Domen bo'lsa

echo "✅ Dashboard tayyor! http://server_ip ga kiring"