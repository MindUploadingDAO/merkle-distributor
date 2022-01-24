import { program } from 'commander'
import fs from 'fs'
import axios from 'axios'

const BATCH_SIZE = 10_000

program
  .version('0.0.0')
  .requiredOption('-i, --input <path>', 'input JSON file location')
  .requiredOption('-i, --output <path>', 'output JSON file location')
program.parse(process.argv)

const json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }))

if (typeof json !== 'object') throw new Error('Invalid JSON')

  let list = json.data.get_result_by_job_id;
  interface KV {
     [key: string]: string;
  }
  let kv:KV={};
  let num=0
  let address=""
  for (let ent of list){
	let creator=ent.data.creator.replace(/\\/,"0");
  	kv[creator]="100";
	if(ent.data.contract>num){
	num= ent.data.contract
	address=creator
	}
  }
  fs.writeFileSync(program.output, JSON.stringify(kv));


