var myFS = 0;
var myFileEntry = 0;
function failFS(evt) {
    console.log(evt.target.error.code);
    $('#file-system-text').html("<strong>File System Error: " + evt.target.error.code + "</strong>");  
}
function writeFail(error) {
    console.log("Create/Write Error: " + error.code);
    $('#file-status').html("Create/Write <strong>Error: " + error.code + "</strong>");   
}

// api-file  Create
function createGotNewFile(file){
    $('#file-status').html("Created: <strong>" + file.fullPath + "</strong>");
    $('#file-read-text').empty();  
    $('#file-read-dataurl').empty();
}
function createGotFileEntry(fileEntry) {
    myFileEntry = fileEntry;
    fileEntry.file(createGotNewFile, writeFail);
}
function gotFS(fileSystem) {
    myFS = fileSystem;
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    $('#file-system-text').html("File System: <strong>" + fileSystem.name + "</strong> " +
            "Root: <strong>" + fileSystem.root.name + "</strong>");
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, createGotFileEntry, writeFail);
}
function createFile() { // button onclick function
    if (myFS) {
        gotFS(myFS);
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
    }
}

//api-file  FileWriter
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        $('#file-contents').html("<br/>Contents: <strong>some sample text</strong>");
        writer.truncate(11);  
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            $('#file-contents').html("<br/>Contents: <strong>some sample</strong>");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
                $('#file-contents').html("<br/>Contents: <strong>some different text</strong>");
            };
        };
    };
    writer.write("some sample text");
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writeFail);
}
function writeFile() { // button onclick function
    if (myFileEntry) {
        gotFileEntry(myFileEntry);        
    } else {
        $('#file-status').html("Status: <strong>Error: File Not Created!</strong>");
    }
}

// api-file  FileReader
function readFail(error) {
    console.log("Read Error: " + error.code);
    $('#file-read-text').html("<strong>Read Error: " + error.code + "</strong>");
    $('#file-read-dataurl').empty();
}
function readerreadDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
        $('#file-read-dataurl').html("<strong>" + evt.target.result.slice(0, 38) + "...</strong>");
    };
    reader.readAsDataURL(file);
}
function readerreadAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as text");
        console.log(evt.target.result);
        $('#file-read-text').html("<strong>" + evt.target.result + "</strong>");
    };
    reader.readAsText(file);
}
function readerGotFile(file){
    readerreadDataUrl(file);
    readerreadAsText(file);
}
function readerGotFileEntry(fileEntry) {
    fileEntry.file(readerGotFile, readFail);
}
function readFile() { // button onclick function
    if (myFileEntry) {
        readerGotFileEntry(myFileEntry);        
    } else {
        $('#file-status').html("Status: <strong>Error: File Not Created!</strong>");
        return false;
    }    
}

// api-file  Remove File
function removeSuccess(entry) {
    $('#file-status').html("Removed: <strong>readme.txt</strong>"); 
    $('#file-contents').html("<br/>Contents:");
    $('#file-read-dataurl').empty();    
    $('#file-read-text').empty();
}
function removeFail(error) {
    console.log("Remove File Error: " + error.code);
    $('#file-status').html("Status: <strong>Remove Error: " + error.code + "</strong>");       
}
function removeFileEntry(fileEntry) {
    fileEntry.remove(removeSuccess, removeFail);
}
function removeFile() { // button onclick function
    if (myFileEntry) {
        removeFileEntry(myFileEntry);        
    } else {
        $('#file-status').html("Status: <strong>Error: File Not Created!</strong>");
    }    
}
