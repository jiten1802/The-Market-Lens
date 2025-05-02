
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  FileUp, 
  File, 
  X, 
  Check, 
  FileSpreadsheet 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface DataFile {
  name: string;
  size: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
  file?: File;
}

interface Props {
  onSuccess?: () => void;
  onViewDashboard?: () => void;
  onGenerateReport?: () => void;
}

export const DataUploadCard: React.FC<Props> = ({ onSuccess, onViewDashboard, onGenerateReport }) => {
  const [files, setFiles] = useState<DataFile[]>([]);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        status: 'idle' as const,
        file: file,
      }));
      
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    // Check if user exists
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload data.",
        variant: "destructive"
      });
      return;
    }

    // Mark all files as uploading
    setFiles(prevFiles => 
      prevFiles.map(file => ({
        ...file,
        status: 'uploading',
        progress: 0
      }))
    );

    // Process each file
    for (let index = 0; index < files.length; index++) {
      const fileData = files[index];
      const file = fileData.file;
      
      if (!file) continue;

      try {
        // Set up progress tracking
        let progressInterval = setInterval(() => {
          setFiles(prevFiles => 
            prevFiles.map((f, i) => 
              i === index ? { 
                ...f, 
                progress: Math.min((f.progress || 0) + Math.random() * 10, 90) 
              } : f
            )
          );
        }, 200);

        // 1. Upload file to Supabase Storage with UUID
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `user-files/${fileName}`;
        
        // Upload the file to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
          .from('csv_files')  // Changed from 'marketing_data' to 'csv_files'
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          });
          
        clearInterval(progressInterval);
        
        if (storageError) throw new Error(storageError.message);
        
        // Update progress to 95%
        setFiles(prevFiles => 
          prevFiles.map((f, i) => 
            i === index ? { ...f, progress: 95 } : f
          )
        );
        
        // 2. Create dataset entry in the database with all required fields
        const datasetInsert = {
          name: file.name,
          description: `Uploaded on ${new Date().toLocaleString()}`,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
        };
        
        // Add owner_id if user exists and has a valid UUID
        if (user?.uid && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.uid)) {
          Object.assign(datasetInsert, { owner_id: user.uid });
        }
        
        const { data: datasetData, error: datasetError } = await supabase
          .from('datasets')
          .insert(datasetInsert)
          .select()
          .single();
          
        if (datasetError) throw new Error(datasetError.message);
        
        // Update progress to 100% and mark as success
        setFiles(prevFiles => 
          prevFiles.map((f, i) => 
            i === index ? { ...f, status: 'success', progress: 100 } : f
          )
        );
      } catch (error) {
        console.error('Error uploading file:', error);
        
        // Mark file as error
        setFiles(prevFiles => 
          prevFiles.map((f, i) => 
            i === index ? { ...f, status: 'error', progress: 0 } : f
          )
        );
        
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive"
        });
      }
    }

    // Check if all files are uploaded successfully
    const allUploaded = files.every(file => file.status === 'success');
    if (allUploaded) {
      toast({
        title: "Upload complete",
        description: "All files have been successfully uploaded.",
      });
      
      // Update localStorage to indicate user has uploaded data
      localStorage.setItem('uploadedData', 'true');
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const allFilesUploaded = files.length > 0 && files.every(file => file.status === 'success');

  // In the return statement, update the CardFooter:
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Upload Your Data</CardTitle>
        <CardDescription>
          Upload your marketing data files to generate insights
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">Drag & drop your files here or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: CSV, Excel, and text files
          </p>
          <input 
            id="file-upload" 
            type="file" 
            multiple 
            accept=".csv,.xlsx,.xls,.txt" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Files ({files.length})</p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                >
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-5 w-5 text-marketing-primary mr-2" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[180px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {file.status === 'uploading' && (
                      <div className="w-20 h-1 bg-muted rounded-full overflow-hidden mr-2">
                        <div 
                          className="h-full bg-marketing-primary" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    {file.status === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : file.status === 'error' ? (
                      <X className="h-5 w-5 text-destructive" />
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="h-5 w-5 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <Button 
          variant="outline" 
          onClick={() => setFiles([])}
          disabled={files.length === 0}
        >
          Clear All
        </Button>
        
        <div className="flex flex-wrap gap-2">
          {allFilesUploaded && onViewDashboard && (
            <Button 
              onClick={onViewDashboard}
              variant="default"
            >
              View Dashboard
            </Button>
          )}
          
          {allFilesUploaded && onGenerateReport && (
            <Button 
              onClick={onGenerateReport}
              variant="outline"
            >
              Generate Report
            </Button>
          )}
          
          {!allFilesUploaded && (
            <Button 
              onClick={handleUpload} 
              disabled={files.length === 0 || allFilesUploaded}
            >
              {allFilesUploaded ? 'Uploaded' : 'Upload Files'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
