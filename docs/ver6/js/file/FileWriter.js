/// <reference path="../../scripts/typings/file-saver/index.d.ts" />
/////// http://www.dotnetfunda.com/articles/show/2970/filesystem-api-in-html5-working-with-files-in-the-browser
var FileWriter = (function () {
    function FileWriter() {
        if (FileWriter._instance) {
            throw new Error("Error: Config instead of new.");
        }
        FileWriter._instance = this;
        //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        //var form = document.getElementById('form1');
        //var zip = new JSZip();
        //zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, { base64: true });
        //zip.generateAsync({ type: "blob" })
        //    .then(function(content) {
        //        // see FileSaver.js
        //        saveAs(content, "example.zip");
        //    });
    }
    FileWriter.instance = function () {
        if (FileWriter._instance === null) {
            FileWriter._instance = new FileWriter();
        }
        return FileWriter._instance;
    };
    //public save(content): void {
    //    saveAs(content, "example.jpg");
    //}
    FileWriter.prototype.save = function (fileName, content) {
        saveAs(content, fileName);
    };
    return FileWriter;
}());
FileWriter._instance = null;
//# sourceMappingURL=FileWriter.js.map