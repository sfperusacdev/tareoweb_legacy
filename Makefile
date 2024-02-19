VERSION := $(shell cat version)
image:
	docker build -t sfwebservice:$(VERSION) .
run:
	docker run --rm --name sfwebservice -p 7081:7081 -p 7080:7080 sfwebservice:$(VERSION)
image-run:
	docker build -t sfwebservice:$(VERSION) . \
	&& docker run --rm --name sfwebservice -p 7081:7081 -p 7080:7080 sfwebservice:$(VERSION)

up:
	docker build -t sfwebservice:$(VERSION) . \
	&& docker compose up