#!/usr/bin/env node
const {run} = require('./index.js');
function parseArgs(args){
  const options = {};
  for(let i=0;i<args.length;i++){
    const arg=args[i];
    if(arg.startsWith('--')){
      const eq=arg.indexOf('=');
      if(eq!==-1){
        const key=arg.slice(2,eq);
        const val=arg.slice(eq+1);
        options[key]=val;
      }else{
        const key=arg.slice(2);
        const val=args[i+1] && !args[i+1].startsWith('--') ? args[++i] : 'true';
        options[key]=val;
      }
    }
  }
  return options;
}
async function main(){
  const options=parseArgs(process.argv.slice(2));
  for(const [k,v] of Object.entries(options)){
    process.env[k]=v;
  }
  await run();
}
main().catch(err=>{console.error(err);process.exit(1);});
