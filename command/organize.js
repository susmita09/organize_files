const fs = require("fs");
const path = require("path");
let types = require("../util");
// let types = {
//     media: ["mp4", "mp3", "mkv"],
//     archives: ["zip", "rar", "tar", "7z", "gz"],
//     documents: ["pdf", "txt", "docx", "doc", 'xlsx', "xls"],
//     app: ["exe", "dmg", "pkg"]
// }

function organizeHelper(src){
    //if path not present
    if(src == undefined){
        //it will give current working directry
        src = process.cwd();
    }
    organize(src);
}

function organize(src) {
    // src = E:\Prepcoding Devlopment\1_File system_11.10.21
    let folderToMake = path.join(src, "Organize_files")
    // foldertomake = E:\Prepcoding Devlopment\1_File system_11.10.21\Organized_files
    // src -folder create
    //check if not present create
    if (fs.existsSync(folderToMake) == false) {
        //create new
        fs.mkdirSync(folderToMake);
    }
    //organized files inside different folders
    // src = E:\Prepcoding Devlopment\1_File system_11.10.21
    // foldertomake = E:\Prepcoding Devlopment\1_File system_11.10.21\Organized_files
    organizeFiles(src, folderToMake);
}

function checkFileOrNot(src) {
    // let a = fs.lstatSync(src);
    // console.log(a);
    return fs.lstatSync(src).isFile();
}

function readContent(src) {
    return fs.readdirSync(src);
}


function checkExtension(src) {
    //to get the extension we can split the src string in base of . and get the last element
    let ext = src.split(".").pop();
    //traverse through all the element
    for (let type in types) {
        for (let i = 0; i < types[type].length; i++) {
            if (ext == types[type][i]) {
                return type;
            }
        }
    }
    return "other";
}


function sendFile(src, dest, foldername) {
    // check if folder exits if not create one

    let folderToMake = path.join(dest, foldername);
    if (fs.existsSync(folderToMake) == false) {
        fs.mkdirSync(folderToMake);
    }
    // copy from src to dest

    let destFilename = path.join(folderToMake, path.basename(src));
    // copyfile take src and destination

    //exits -- override
    //access
    fs.copyFileSync(src, destFilename);

}


function organizeFiles(src, dest) {
    //content read
    // src = E:\Prepcoding Devlopment\1_File system_11.10.21
    // dest = E:\Prepcoding Devlopment\1_File system_11.10.21\Organized_files
    let isFile = checkFileOrNot(src);
    if (isFile == true) {
        //file
        //copy to organized file folder -- seg
        //1. extension check 
        let foldername = checkExtension(src);
        //console.log(foldername, " -> ", path.basename(src));
        //2. copy file
        //dest name == folder name // to copy we will use src 
        sendFile(src, dest, foldername);
    }
    else {
        //folder
        // recursive call
        let fdirName = readContent(src);
        //console.log(fdirName);
        //recursively call all paths
        for (let i = 0; i < fdirName.length; i++) {
            let child = fdirName[i]
            let dirPath = path.join(src, child);
            organizeFiles(dirPath, dest);
        }

    }
}

//organize(process.argv[2]);


module.exports = {
    organizeHelper
}