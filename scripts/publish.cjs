'use strict';
const {execFileSync}=require('node:child_process'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function git(args,inherit=false){return execFileSync('git',args,{cwd:root,windowsHide:true,encoding:'utf8',stdio:inherit?'inherit':['ignore','pipe','inherit']})?.trim();}
try{
 if(git(['status','--porcelain']))throw Error('Build, test and commit the working tree before publishing.');
 if(git(['branch','--show-current'])!=='main')throw Error('Publish from main after reviewing and committing your changes.');
 const sha=git(['subtree','split','--prefix=dist','HEAD']);
 if(!/^[a-f0-9]{40}$/.test(sha))throw Error('Could not identify the website commit.');
 git(['push','origin',sha+':refs/heads/gh-pages'],true);
 console.log('Website pushed. GitHub Pages publishes gh-pages / (root). Check the deployment and live version.json before sharing.');
}catch(e){console.error(e.message);process.exitCode=1;}
