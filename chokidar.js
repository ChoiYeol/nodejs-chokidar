const chokidar = require('chokidar');
const pathlib = require("path");
const fileordirpath =  [pathlib.normalize(" 당신의 경로 파일 경로")];

const watcherReq = chokidar.watch(fileordirpath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

     watcherReq
     .on('add', path => {
         console.log(`watcherReq: File ${path} has been added`);

         if (pathlib.dirname(path) == serverJobReqRpaDir) {
             FilePushMesg.data.DirId = "JobReqRpaDir";
             FilePushMesg.data.Path = path;
             FilePushMesg.data.Filename = pathlib.basename(path);
             multiWSServer.wsClientSend(FilePushMesg, "samWSS");
         }
     })

     .on('error', error => console.log(`watcherReq: watcherReq error: ${error}`))
     .on('ready', () => console.log('watcherReq: Initial scan complete. Ready for changes - ' + fileordirpath))
     // .on('change', path => log(`File ${path} has been changed`))
     .on('change', (path, stats) => {
         if (stats) console.log(`watcherReq: File ${path} changed size to ${stats.size}`);
     })
     .on('unlink', path => console.log(`watcherReq: File ${path} has been removed`))
     // Dir
     .on('addDir', path => {
        console.log(`watcherReq: Directory ${path} has been added`);
     })
     .on('unlinkDir', path => console.log(`watcherReq: Directory ${path} has been removed`));
 

 