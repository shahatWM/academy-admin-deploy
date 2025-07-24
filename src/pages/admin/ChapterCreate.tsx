import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Upload, X, Tag, Clock, FileVideo } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChapterCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Mock data - replace with actual data fetching
  const courses = [
    { id: "1", title: "HTML & CSS Fundamentals" },
    { id: "2", title: "JavaScript Programming" },
    { id: "3", title: "React Fundamentals" },
  ];

  const modules = selectedCourse === "1" ? [
    { id: "1", title: "HTML Basics" },
    { id: "2", title: "CSS Styling" },
    { id: "3", title: "Advanced CSS" },
  ] : selectedCourse === "2" ? [
    { id: "4", title: "JavaScript Basics" },
    { id: "5", title: "DOM Manipulation" },
  ] : [];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error("Please select a valid video file");
        return;
      }
      
      // Validate file size (e.g., max 500MB)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 500MB");
        return;
      }
      
      setVideoFile(file);
      toast.success("Video file selected successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a chapter title");
      return;
    }
    
    if (!selectedCourse) {
      toast.error("Please select a course");
      return;
    }
    
    if (!selectedModule) {
      toast.error("Please select a module");
      return;
    }
    
    if (!videoFile) {
      toast.error("Please upload a video file");
      return;
    }
    
    // Simulate API call
    toast.success("Chapter created successfully!");
    navigate("/admin/chapters");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Chapter</h1>
        <p className="text-muted-foreground">Upload a new video chapter</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapter Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Video Upload</CardTitle>
                <CardDescription>Upload your chapter video content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-sm font-medium mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, WebM, AVI up to 500MB
                      </p>
                    </label>
                  </div>
                  
                  {videoFile && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <FileVideo className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{videoFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(videoFile.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => setVideoFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chapter Information */}
            <Card>
              <CardHeader>
                <CardTitle>Chapter Information</CardTitle>
                <CardDescription>Basic details about your chapter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Chapter Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter chapter title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this chapter covers"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 15 min"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Add tags to help organize and search your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                  </div>
                  <Button type="button" onClick={addTag}>
                    Add Tag
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeTag(tag)}
                        className="h-3 w-3 p-0 hover:bg-transparent"
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-sm text-muted-foreground">No tags added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course & Module Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Assignment</CardTitle>
                <CardDescription>Assign this chapter to a course and module</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Module</Label>
                  <Select 
                    value={selectedModule} 
                    onValueChange={setSelectedModule}
                    disabled={!selectedCourse}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="w-full">
                Create Chapter
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/admin/chapters")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChapterCreate;