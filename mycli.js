#! /usr/bin/env node

let viewFile = require("./command/view");
let organizeFile = require("./command/organize");
let help = require("./command/help");

// node mycli.js [view dirname tree] it returns an array

let input = process.argv.slice(2);

let command = input[0];
//path
switch (command){
    case "view" :
        //view comman executed
        //node mycli.js view "c;/dhjhfg/gh.js" tree
        //input1 -foldername, input2 = mode
        viewFile.viewHelper(input[1],input[2]);
        break;
    case "organize" :
        //node mycli.js organized "c://fhjhg/js.txt"
        //organize comman execuyted
        organizeFile.organizeHelper(input[1]);
        break;
    case "help":
        //help executed
         help.helpHelper();
        break;
    default:
        console.log("wrong command type help for all the commands");
        break;
}

//view 
//organized
//help

