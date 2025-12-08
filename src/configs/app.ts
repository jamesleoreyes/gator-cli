import fs from 'fs';
import os from 'os';
import path from 'path';
import type { Config } from "../types/index.js";

function getConfigFilePath() {
  const homeDir = os.homedir();
  return `${homeDir}/.gatorconfig.json`;
};

function getJsonFromDisk<T>(path: string): T {
  const file = fs.readFileSync(path, 'utf8');
  const json: T = JSON.parse(file)
  return json;
};

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  const rawConfig = JSON.stringify(config, null, 2);
  writeConfig(rawConfig);
};

export function readConfig(): Config {
  const configPath = getConfigFilePath();
  const config = getJsonFromDisk<Config>(configPath);
  return config;
};

function writeConfig(newConfig: string) {
  const configPath = getConfigFilePath();
  fs.writeFileSync(configPath, newConfig);
};