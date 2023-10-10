VERSION := $(shell cat version)
image:
	docker build -t sfwebservice:$(VERSION) .
run:
	docker run --rm --name sfwebservice -p 80:80 sfwebservice:$(VERSION)
image-run:
	docker build -t sfwebservice:$(VERSION) . \
	&& docker run --rm --name sfwebservice -p 80:80 sfwebservice:$(VERSION)

up:
	docker build -t sfwebservice:$(VERSION) . \
	&& docker compose up