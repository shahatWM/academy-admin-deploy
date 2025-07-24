import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Trash2, Clock, Play, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

const CoursesList = () => {
  // Mock data - replace with actual data fetching
  const courses = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of web development",
      duration: "4 hours",
      status: "Published",
      moduleCount: 3,
      chapterCount: 12,
      modules: [
        {
          id: 1,
          title: "HTML Basics",
          chapterCount: 4,
          chapters: [
            { id: 1, title: "Introduction to HTML", duration: "15 min" },
            { id: 2, title: "HTML Elements", duration: "20 min" },
            { id: 3, title: "Forms and Input", duration: "25 min" },
            { id: 4, title: "Semantic HTML", duration: "18 min" },
          ]
        },
        {
          id: 2,
          title: "CSS Styling",
          chapterCount: 5,
          chapters: [
            { id: 5, title: "CSS Selectors", duration: "22 min" },
            { id: 6, title: "Box Model", duration: "28 min" },
            { id: 7, title: "Flexbox Layout", duration: "35 min" },
            { id: 8, title: "Grid Layout", duration: "40 min" },
            { id: 9, title: "Responsive Design", duration: "30 min" },
          ]
        },
        {
          id: 3,
          title: "Advanced CSS",
          chapterCount: 3,
          chapters: [
            { id: 10, title: "CSS Animations", duration: "25 min" },
            { id: 11, title: "CSS Variables", duration: "20 min" },
            { id: 12, title: "Modern CSS Features", duration: "30 min" },
          ]
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript Programming",
      description: "Master JavaScript from basics to advanced concepts",
      duration: "8 hours",
      status: "Draft",
      moduleCount: 4,
      chapterCount: 16,
      modules: [
        {
          id: 4,
          title: "JavaScript Basics",
          chapterCount: 4,
          chapters: [
            { id: 13, title: "Variables and Data Types", duration: "20 min" },
            { id: 14, title: "Functions", duration: "25 min" },
            { id: 15, title: "Control Structures", duration: "30 min" },
            { id: 16, title: "Arrays and Objects", duration: "35 min" },
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage your courses and modules</p>
        </div>
        <Link to="/admin/courses/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="space-y-4">
          {courses.map((course) => (
            <AccordionItem key={course.id} value={course.id.toString()}>
              <Card>
                <AccordionTrigger className="hover:no-underline p-0">
                  <CardHeader className="flex-1">
                    <div className="flex justify-between items-start w-full">
                      <div className="space-y-2 text-left">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </div>
                        <CardDescription>{course.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <FolderOpen className="h-3 w-3" />
                            <span>{course.moduleCount} modules</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            <span>{course.chapterCount} chapters</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 mr-4">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {course.modules.map((module) => (
                        <div key={module.id} className="border rounded-lg p-4 bg-muted/30">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium flex items-center gap-2">
                              <FolderOpen className="h-4 w-4" />
                              {module.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline">{module.chapterCount} chapters</Badge>
                              <Button size="icon" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {module.chapters.map((chapter) => (
                              <div key={chapter.id} className="flex items-center justify-between p-2 bg-background rounded border">
                                <div className="flex items-center gap-2">
                                  <Play className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm">{chapter.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                                  <Button size="icon" variant="ghost" className="h-6 w-6">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CoursesList;