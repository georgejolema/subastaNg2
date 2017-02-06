import {Component, OnInit, Directive, Input, Output, ViewChildren, QueryList, EventEmitter} from '@angular/core';


@Component({
    selector:'upload-multiple',
     template:`
     <div>
        <input type="file" multiple (change)="OnChange($event.target.files)"/>        
        <upload-simple-file  #ups *ngFor="let file of loadedFiles" [selectedFile]="file" (onChunkLoaded)="loadChunk($event)"></upload-simple-file>
        <button class="btn btn-default" (click)="uploadFiles()">Upload</button>
     <div>
    `,
    styles:[`
        button{
            margin-top:5px;
        }
    `]
})
export class UploadComponent implements OnInit {
    @Output() onChunkLoaded=new EventEmitter();
    @ViewChildren('ups') 
    loadedViews:QueryList< UploadFileDirective>;
    
    loadedFiles:SelectedFile[];
    
    ngOnInit(){
        this.loadedFiles=[];
    }
    OnChange(files: FileList){
        for(let i = 0 ; i < files.length ; i++)
          this.loadedFiles.push({
              name:files.item(i).name,
              size: files.item(i).size,
              progress:0,
              status:FileStatusId.NEW,
              data:files.item(i)
          });
    }
    uploadFiles(){
        this.loadedViews.forEach(fileItem => fileItem.upload());
    }
    loadChunk(data:IBlob){
        this.onChunkLoaded.emit(data);
    }
}

@Component({
    selector:'upload-simple-file',
    template:`
    <div class="row">
        <div class="col-md-12"><label>{{selectedFile.name}}</label></div>
        <div class="col-md-12">
            <ngb-progressbar type="success" [value]="progressFileUploaded">{{progressFileUploaded}}%</ngb-progressbar>
        </div>
    </div>
    `
})
export class UploadFileDirective implements OnInit {
     @Input() selectedFile:SelectedFile;
     @Output() onChunkLoaded=new EventEmitter();
     private startChunk:number = -1;
     private endChunk:number = 0;
     private fileChunkSize:number = 1024 * 5;
     private chunkCount:number = 0;
     public get progressFileUploaded(){
         if(this.selectedFile.status==FileStatusId.NEW)
            return 0;
         return Math.round( 100 * this.selectedFile.progress / this.selectedFile.size );
     }
     ngOnInit(){
         this.configureNextChunk();
     }

     upload(){        
        if(this.endChunk < this.selectedFile.data.size)
            this.selectedFile.status = FileStatusId.PROGRESS;
        else{
            this.selectedFile.status = FileStatusId.END;
        }
        setTimeout(this.uploadChunk.bind(this), 100);
        
     }

     private uploadChunk(){
        let chunk = this.selectedFile.data[this.getSliceMethod()](this.startChunk, this.endChunk);
        this.selectedFile.progress += (this.endChunk - this.startChunk)
        this.onChunkLoaded.emit(<IBlob>{
            name: this.selectedFile.name,
            blobNumber: this.chunkCount++,
            data: chunk,
            progress: this.progressFileUploaded
        });
        if(this.selectedFile.status == FileStatusId.PROGRESS){
            this.configureNextChunk();            
            this.upload();
        }
     }

     private getSliceMethod(){
        let slice_method="";
        if ('mozSlice' in this.selectedFile.data) slice_method = 'mozSlice';
        else if ('webkitSlice' in this.selectedFile.data) slice_method = 'webkitSlice';
        else slice_method = 'slice';
        return slice_method;
     }

     private configureNextChunk(){
         if(this.startChunk == -1)this.startChunk=0;
         else this.startChunk = this.endChunk;
         this.endChunk = this.endChunk + this.fileChunkSize;
         if(this.endChunk > this.selectedFile.data.size) this.endChunk = this.selectedFile.data.size;
     }

  
}

export interface IBlob{
    name:string;
    blobNumber:number;
    data:any;
    progress:number;
}

interface SelectedFile{
    name:string;
    size:number;
    progress:number;
    status:number;
    data:File
}
enum FileStatusId{
    NEW=1,
    PROGRESS,
    END
}

