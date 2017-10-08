interface JSZipUtils {
    
    getBinaryContent(path:string, callback:Function): void;
   
}

declare var JSZipUtils: {
    /**
     * Create JSZip instance
     */
    (): JSZipUtils;
    /**
     * Create JSZip instance
     */
    new (): JSZipUtils;
    
	
    prototype: JSZipUtils;
	
	getBinaryContent(path:string, callback:Function): void;
    
}

declare module "JSZipUtils" {
    export = JSZipUtils;
}
