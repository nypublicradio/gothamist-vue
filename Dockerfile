FROM node:14

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y \
        curl \
        netcat \
        nginx-extras \
        python \
        python-pip \
        python-setuptools \
        unzip \
    && pip install supervisor \
    && mkdir -p /code

WORKDIR /code

COPY package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY . ./
RUN rm /etc/nginx/nginx.conf \
    && ln -sf /code/nginx/* /etc/nginx/

RUN ./scripts/devenv.sh
EXPOSE 3000
ENTRYPOINT ["./scripts/entrypoint.sh"]
