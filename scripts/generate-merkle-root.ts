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
let map1 = new Map();

for(let i in maps.claims){
  let name = i.substring(0,5).toUpperCase()
   if(map1.get(name)){
     let map2 = map1.get(name)
     map2.set(i,maps.claims[i])
     map1.set(name,map2)
   }else{
    let map2 = new Map();
    map2.set(i,maps.claims[i])
    map1.set(name,map2)
   }
 //fs.writeFileSync(program.output+"/"+i+".json", JSON.stringify(maps.claims[i]));
}

map1.forEach((value, key) => { 
  fs.writeFileSync(program.output+"/"+key+".json", JSON.stringify(Object.fromEntries(value)));
})  

fs.writeFileSync(program.output+"/total.json", JSON.stringify(maps));
maps.claims={};
fs.writeFileSync(program.output+"/merkle_root.json", JSON.stringify(maps));
