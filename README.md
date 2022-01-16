# pokedex

* Prequites for this project
    - Install docker and docker-compose on your machine
    - Install nodejs and npm

* Cmd to run Pokedex
    - docker compose up -d


* Cmd to run test suite
    - npm test


* Curl to get pokemon data for ditto
    - curl --request GET 'localhost:7000/pokemon/ditto' -v 


* Curl to get translated pokemon data for ditto
    - curl --request GET 'localhost:7000/pokemon/translate/ditto' -v 

* Client is created with sigleton pattern. 
