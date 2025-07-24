import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, GraduationCap, Video, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Bundles", count: 12, icon: Package, href: "/admin/bundles" },
    { title: "Total Courses", count: 45, icon: GraduationCap, href: "/admin/courses" },
    { title: "Total Modules", count: 128, icon: FolderOpen, href: "/admin/modules" },
    { title: "Total Chapters", count: 342, icon: Video, href: "/admin/chapters" },
  ];

  const quickActions = [
    { title: "Add New Bundle", href: "/admin/bundles/create", icon: Package },
    { title: "Add New Course", href: "/admin/courses/create", icon: GraduationCap },
    { title: "Add New Chapter", href: "/admin/chapters/create", icon: Video },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your learning content from here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Create new content quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Button variant="outline" className="h-24 w-full flex flex-col gap-2">
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;