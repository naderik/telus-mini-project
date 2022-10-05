FROM python:3.8.2-alpine3.11

RUN apt update

COPY  requirements.txt  .

RUN pip install -r requirements.txt

COPY  .  .

EXPOSE  8080

CMD [ "flask" ,  "run", "--host=0.0.0.0", "--port=8080" ]