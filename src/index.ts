import { readConfig, setUser } from "./configs/app";


function main() {
  setUser('James');
  const config = readConfig();
  console.log(JSON.stringify(config, null, 2));
};

main();
