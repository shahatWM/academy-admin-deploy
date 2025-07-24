import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, GripVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BundleCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock available courses
  const availableCourses = [
    { id: 1, title: "HTML & CSS Basics", duration: "4 hours" },
    { id: 2, title: "JavaScript Fundamentals", duration: "6 hours" },
    { id: 3, title: "React Introduction", duration: "8 hours" },
    { id: 4, title: "Node.js Backend", duration: "10 hours" },
    { id: 5, title: "Database Design", duration: "5 hours" },
  ];

  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedCourses.find(selected => selected.id === course.id)
  );

  const addCourse = (course: any) => {
    setSelectedCourses([...selectedCourses, course]);
    setSearchQuery("");
  };

  const removeCourse = (courseId: number) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a bundle title");
      return;
    }
    
    // Simulate API call
    toast.success("Bundle created successfully!");
    navigate("/admin/bundles");
  };

  const totalDuration = selectedCourses.reduce((total, course) => {
    const hours = parseInt(course.duration);
    return total + hours;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Bundle</h1>
        <p className="text-muted-foreground">Create a new course bundle</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bundle Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bundle Information</CardTitle>
                <CardDescription>Basic details about your bundle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Bundle Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter bundle title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this bundle covers"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Add Courses</CardTitle>
                <CardDescription>Search and add courses to this bundle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {searchQuery && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => addCourse(course)}
                      >
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Selected Courses & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selected Courses ({selectedCourses.length})</CardTitle>
                <CardDescription>Total Duration: {totalDuration} hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-2 p-2 bg-secondary rounded-lg"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.duration}</p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeCourse(course.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {selectedCourses.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No courses selected
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="w-full">
                Create Bundle
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/admin/bundles")}
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

export default BundleCreate;