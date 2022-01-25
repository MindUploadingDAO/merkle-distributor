import { program } from 'commander'
import fs from 'fs'
import { parseBalanceMap } from '../src/parse-balance-map'

program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing a map of account addresses to string balances'
  )
  .requiredOption(
    '-o, --output <path>',
    'output JSON file location '
  )

program.parse(process.argv)

const json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }))

if (typeof json !== 'object') throw new Error('Invalid JSON')
let maps = parseBalanceMap(json);

for(let i in maps.claims){
 fs.writeFileSync(program.output+"/"+i+".json", JSON.stringify(maps.claims[i]));
}

fs.writeFileSync(program.output+"/all.json", JSON.stringify(maps));
maps.claims={};
fs.writeFileSync(program.output+"/info.json", JSON.stringify(maps));
