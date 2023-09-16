# README telServer

A local CLI that runs a data collection server locally for the telClient library to connect to

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

## Installation

`npx telServer -p <port number> -f <filename>`

port is 9000 if excluded and filename is teldata if excluded

## Usage

run the CLI command above to start the telserver PRIOR to running your client app...

If the client app cannot find the server, it will not run the telClient telemetry library

## Support

Please [open an issue](https://github.com/fraction/readme-boilerplate/issues/new) for support.
