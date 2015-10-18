# grepnet-server

> Server for any grepnet client.

## Install

```
npm install
npm start
```

## Usage

```
POST /

Request:
    Body params:
        url {string}
        phrase {string}

Response:
    {
        url {string}
        phrase {string}
        status {boolean
    }
```

## License

[The MIT License](http://piecioshka.mit-license.org)
