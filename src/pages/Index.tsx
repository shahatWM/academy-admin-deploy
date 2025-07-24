import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Settings, Play, Users, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Learning Management System
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Create, manage, and deliver educational content with our comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link to="/admin" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:border-primary">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>
                  Manage courses, bundles, and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Access Admin
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="h-full opacity-75">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <Play className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-muted-foreground">Student Portal</CardTitle>
              <CardDescription>
                Access courses and learning materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full opacity-75">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-muted-foreground">User Management</CardTitle>
              <CardDescription>
                Manage students and instructors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full opacity-75">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-muted-foreground">Analytics</CardTitle>
              <CardDescription>
                Track progress and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
