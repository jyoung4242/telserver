#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import * as fs from "fs";
let port = 9000;
let filename = "teldata";
const app = express();
const server = http.createServer(app);
let outputfilename;
let stream;
const program = new Command();
const io = new Server(server, {
    allowEIO3: true,
    cors: { credentials: true, origin: "http://localhost" },
});
program
    .version("1.0.0")
    .description("Local Telemetry Server")
    .option("-p, --port <port>", "accessible port to run server on")
    .option("-f, --filename <filename>", "filename to write telemetry data to")
    .action(cmd => {
    console.log(cmd);
    if (cmd.port)
        port = cmd.port;
    if (cmd.filename)
        filename = cmd.filename;
    outputfilename = `${performance.now()}_${filename}.bin`;
    stream = fs.createWriteStream(outputfilename, { flags: "w" });
    io.on("connection", socket => {
        console.log(chalk.blue(`Client connected`));
        // Send an acknowledgment message to the client
        socket.emit("acknowledgment", "Server is running and you are connected.");
        socket.on("verification", (msg) => { });
        socket.on("datasend", (msg) => {
            stream.write(Buffer.from(msg));
        });
        socket.on("disconnect", () => {
            console.log(chalk.blue(`Client disconnected`));
            stream.end();
        });
    });
    server.listen(port, () => {
        console.log(chalk.blueBright(`Starting Server, port ${port}, and writing to base filename: ${filename}`));
    });
});
program.parse(process.argv);
