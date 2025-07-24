import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, GripVertical, FolderOpen, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Chapter {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
}

const CourseCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [showModuleForm, setShowModuleForm] = useState(false);

  const addModule = () => {
    if (!newModuleTitle.trim()) return;
    
    const newModule: Module = {
      id: Date.now().toString(),
      title: newModuleTitle,
      chapters: []
    };
    
    setModules([...modules, newModule]);
    setNewModuleTitle("");
    setShowModuleForm(false);
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  const addChapter = (moduleId: string, chapterTitle: string, duration: string) => {
    if (!chapterTitle.trim() || !duration.trim()) return;

    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: chapterTitle,
      duration: duration
    };

    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, chapters: [...module.chapters, newChapter] }
        : module
    ));
  };

  const removeChapter = (moduleId: string, chapterId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, chapters: module.chapters.filter(chapter => chapter.id !== chapterId) }
        : module
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a course title");
      return;
    }
    
    toast.success("Course created successfully!");
    navigate("/admin/courses");
  };

  const totalChapters = modules.reduce((total, module) => total + module.chapters.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Course</h1>
        <p className="text-muted-foreground">Create a new course with modules and chapters</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Basic details about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this course covers"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Modules ({modules.length})</CardTitle>
                    <CardDescription>Organize your course content into modules</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModuleForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showModuleForm && (
                  <div className="flex gap-2 p-4 border rounded-lg bg-muted/50">
                    <Input
                      placeholder="Module title"
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addModule()}
                    />
                    <Button type="button" onClick={addModule}>Add</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowModuleForm(false);
                        setNewModuleTitle("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {modules.map((module, index) => (
                  <ModuleEditor
                    key={module.id}
                    module={module}
                    onRemove={() => removeModule(module.id)}
                    onAddChapter={addChapter}
                    onRemoveChapter={removeChapter}
                  />
                ))}

                {modules.length === 0 && !showModuleForm && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No modules added yet</p>
                    <p className="text-sm">Click "Add Module" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Modules:</span>
                    <span className="font-medium">{modules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Chapters:</span>
                    <span className="font-medium">{totalChapters}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="w-full">
                Create Course
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/admin/courses")}
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

interface ModuleEditorProps {
  module: Module;
  onRemove: () => void;
  onAddChapter: (moduleId: string, title: string, duration: string) => void;
  onRemoveChapter: (moduleId: string, chapterId: string) => void;
}

const ModuleEditor = ({ module, onRemove, onAddChapter, onRemoveChapter }: ModuleEditorProps) => {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDuration, setChapterDuration] = useState("");

  const handleAddChapter = () => {
    if (chapterTitle.trim() && chapterDuration.trim()) {
      onAddChapter(module.id, chapterTitle, chapterDuration);
      setChapterTitle("");
      setChapterDuration("");
      setShowChapterForm(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
          <FolderOpen className="h-4 w-4" />
          {module.title}
        </h4>
        <div className="flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setShowChapterForm(true)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {showChapterForm && (
        <div className="flex gap-2 p-3 bg-muted/30 rounded">
          <Input
            placeholder="Chapter title"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Duration (e.g., 15 min)"
            value={chapterDuration}
            onChange={(e) => setChapterDuration(e.target.value)}
            className="w-32"
          />
          <Button type="button" size="sm" onClick={handleAddChapter}>
            Add
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            onClick={() => {
              setShowChapterForm(false);
              setChapterTitle("");
              setChapterDuration("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {module.chapters.map((chapter) => (
          <div key={chapter.id} className="flex items-center justify-between p-2 bg-background rounded border">
            <div className="flex items-center gap-2">
              <Play className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{chapter.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{chapter.duration}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onRemoveChapter(module.id, chapter.id)}
                className="h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        {module.chapters.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            No chapters added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCreate;