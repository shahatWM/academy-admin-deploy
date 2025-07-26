import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const BundlesList = () => {
  // Mock data - replace with actual data fetching
  const bundles = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Complete guide to modern web development including HTML, CSS, JavaScript, and React.",
      courseCount: 8,
      duration: "24 hours",
      status: "Published",
      courses: [
        { id: 1, title: "HTML & CSS Basics", duration: "3 hours" },
        { id: 2, title: "JavaScript Fundamentals", duration: "4 hours" },
        { id: 3, title: "React Components", duration: "5 hours" },
        { id: 4, title: "State Management", duration: "3 hours" },
        { id: 5, title: "API Integration", duration: "4 hours" },
        { id: 6, title: "Testing & Deployment", duration: "3 hours" },
        { id: 7, title: "Performance Optimization", duration: "2 hours" },
      ],
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      description: "Comprehensive data science training with Python, pandas, and machine learning.",
      courseCount: 12,
      duration: "36 hours",
      status: "Draft",
      courses: [
        { id: 8, title: "Python Basics", duration: "3 hours" },
        { id: 9, title: "NumPy & Pandas", duration: "4 hours" },
        { id: 10, title: "Data Visualization", duration: "3 hours" },
        { id: 11, title: "Machine Learning Intro", duration: "5 hours" },
        { id: 12, title: "Supervised Learning", duration: "4 hours" },
        { id: 13, title: "Unsupervised Learning", duration: "3 hours" },
        { id: 14, title: "Deep Learning", duration: "6 hours" },
        { id: 15, title: "Model Deployment", duration: "4 hours" },
        { id: 16, title: "Data Engineering", duration: "4 hours" },
      ],
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Learn to build mobile apps for iOS and Android using React Native.",
      courseCount: 6,
      duration: "18 hours",
      status: "Published",
      courses: [
        { id: 17, title: "React Native Setup", duration: "2 hours" },
        { id: 18, title: "Navigation & Routing", duration: "3 hours" },
        { id: 19, title: "UI Components", duration: "4 hours" },
        { id: 20, title: "State Management", duration: "3 hours" },
        { id: 21, title: "Native APIs", duration: "3 hours" },
        { id: 22, title: "App Store Publishing", duration: "3 hours" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bundles</h1>
          <p className="text-muted-foreground">Manage your course bundles</p>
        </div>
        <Link to="/admin/bundles/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Bundle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <Card key={bundle.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{bundle.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={bundle.status === "Published" ? "default" : "secondary"}>
                      {bundle.status}
                    </Badge>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{bundle.description}</CardDescription>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Courses in this bundle:</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {bundle.courses.map((course) => (
                    <div key={course.id} className="flex justify-between items-center text-xs p-2 rounded bg-muted/50">
                      <span className="font-medium">{course.title}</span>
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{bundle.courseCount} courses</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{bundle.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BundlesList;