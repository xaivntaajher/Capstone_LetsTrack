FROM python:alpine3.18
WORKDIR /user/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY . .
EXPOSE 8000