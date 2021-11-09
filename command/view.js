
const fs = require("fs");
const path = require("path");

function viewHelper(dirName, mode){
  if(mode == "tree"){
      //console.log("tree view will be shown for this",dirName);
      viewTree(dirName,"");
  }
  else if(mode == "flat"){
    //console.log("flat view will be shown for this",dirname);
     viewFlat(dirName);
  }
  else{
      console.log("wrong mode type \"help\" for support");
  }
}





function checkFileOrNot(src){
  // let a = fs.lstatSync(src);
  // console.log(a);
 return fs.lstatSync(src).isFile();
}

function readContent(src){
  return fs.readdirSync(src);
}

function viewFlat(src){
  let isFile = checkFileOrNot(src);
  if(isFile == true){
      console.log(src +"*")
  }
  else{
      console.log(src);
      //read content of src
      let childPath = readContent(src);
      //recursively call all paths
      for(let i =0;i<childPath.length;i++){
          let dirPath = path.join(src,childPath[i]);
          viewFlat(dirPath);
      }
  }

}


function viewTree(src,indent){
  let isFile = checkFileOrNot(src);
  if(isFile == true){
      console.log(indent, path.basename(src),"*");
  }
  else{
      console.log(indent, path.basename(src));
      //read content of src
      let childPath = readContent(src);
      //recursively call all paths
      for(let i =0;i<childPath.length;i++){
          let dirPath = path.join(src,childPath[i]);
          viewTree(dirPath, indent+"\t");
      }
  }

}




module.exports = {
   viewHelper
}  


