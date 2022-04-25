## Traffic Analysis

### Basic Setup
```
make setup
make install
make dev
```


### Useful docker commands
```
docker ps -a
docker exec -it e6eb2e12145f bash
docker system prune
docker-compose down --volumes
```

### Git Semantics Key
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests


### TODO:
#### v1
- [ ] Replace pipe with comma, save as CSV and pipe into rawdata with IP as primary key
- [ ] Create list of unique IPs from rawData index 
- [ ] Copy to an array to stream requests to HTTP server, store in CSV and stream into dedata
- [ ] Create queries
- [ ] Repeat for each day

#### v2
- [ ] Refactor
- [ ] Replace array with streams 
- [ ] Multi-thread parsing, requests and batch inserts 

