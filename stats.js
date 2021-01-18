var fs = require('fs');
// const path = require('path');

let pathDir = process.argv[2];
let maxDepth = process.argv[3]; // если указана максимальная вложенность для отображения
let depthArray = []; // Preparing lines and gaps from previous levels
let leyPrint = "";  // Lines and spaces from previous levels before drawing the current item
let isFolder = true; // work with folder as default
 
function stat(pathDir) {  ////// stat -> folder or file ? (return true or false)
    // I did not use the ternary operator for reasons of functional expansion
    let workDirFile = fs.statSync(pathDir);
 if(workDirFile.isDirectory(pathDir)){
     return true;
     } 
  if(workDirFile.isFile(pathDir)) {
    return false;
     }   
 }

function printDir(dir, depth='start') {  ///// printDir - out items to consol
    try {
         if(depth === 'start') { // Just getting started! This is layer zero
            depth = 0;
            console.log(`[ ${dir} ]`); // We display the starting directory
            isFolder = stat(dir);
            if(!isFolder) return;
            if((dir[dir.length - 1] != "/")) { // Last symbol mast be "/" !!!
                dir = dir + "/";
             };
            if(maxDepth) console.log("Show " + maxDepth + "  nesting");
        } else {
            depth++
        };
        
        
        const files = fs.readdirSync(dir); // all files from folder

        for (let i=0; i<files.length; i++) {

            let filePath = dir + files[i];
            
            leyPrint = ""; // Preparing lines and gaps from previous levels 
            for (let i=0; i<depth; i++) { // from 0 to current layer
                leyPrint = leyPrint + depthArray[i];
            }
            
            let inPrint = "├" + "─".repeat(2); // Not the LAST element by default
            depthArray[depth] = "│" + " ".repeat(4);
            
            if(!((i+1)<files.length)) {
                inPrint = "└" + "─".repeat(2); // LAST element
                depthArray[depth] = " ".repeat(5); // no more vertical line
            };

            isFolder = stat(filePath);                      

            if(isFolder) { // iа folder - to recursion...
                if(maxDepth && (depth >= maxDepth)) {
                    console.log(leyPrint + inPrint + (`[ ${files[i]} ]`) + " - <<< Limit of Nesting!");
                    return;
                }
                console.log(leyPrint + inPrint + (`[ ${files[i]} ]`));
                let filePathSlash = filePath + '/'; //  "/" at the end of the folder name
                printDir(filePathSlash, depth); 
            }else {
                console.log(leyPrint + inPrint + (` ${files[i]}`));
            };
        }
    } catch (error) {
        console.error(error)
    }
}
////////////////////////////////////////////////////////

printDir(pathDir);





    