import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, Play, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ChaptersList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data fetching
  const chapters = [
    {
      id: 1,
      title: "Introduction to HTML",
      duration: "15 min",
      tags: ["html", "beginner", "fundamentals"],
      course: "HTML & CSS Fundamentals",
      module: "HTML Basics",
      status: "Published",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      title: "CSS Selectors Deep Dive",
      duration: "22 min",
      tags: ["css", "selectors", "intermediate"],
      course: "HTML & CSS Fundamentals",
      module: "CSS Styling",
      status: "Published",
      uploadDate: "2024-01-16",
    },
    {
      id: 3,
      title: "JavaScript Variables Explained",
      duration: "20 min",
      tags: ["javascript", "variables", "basics"],
      course: "JavaScript Programming",
      module: "JavaScript Basics",
      status: "Draft",
      uploadDate: "2024-01-17",
    },
    {
      id: 4,
      title: "Flexbox Layout Mastery",
      duration: "35 min",
      tags: ["css", "flexbox", "layout", "advanced"],
      course: "HTML & CSS Fundamentals",
      module: "CSS Styling",
      status: "Published",
      uploadDate: "2024-01-18",
    },
    {
      id: 5,
      title: "React Components Introduction",
      duration: "28 min",
      tags: ["react", "components", "jsx"],
      course: "React Fundamentals",
      module: "React Basics",
      status: "Published",
      uploadDate: "2024-01-19",
    },
  ];

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chapter.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chapter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chapters</h1>
          <p className="text-muted-foreground">Manage your video chapters and content</p>
        </div>
        <Link to="/admin/chapters/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Chapter
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Chapters Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chapter</TableHead>
              <TableHead>Course & Module</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChapters.map((chapter) => (
              <TableRow key={chapter.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{chapter.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-sm">{chapter.course}</div>
                    <div className="text-xs text-muted-foreground">{chapter.module}</div>
                  </div>
                </TableCell>
                <TableCell>{chapter.duration}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {chapter.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {chapter.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{chapter.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={chapter.status === "Published" ? "default" : "secondary"}>
                    {chapter.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(chapter.uploadDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-8">
          <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No chapters found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first chapter"}
          </p>
          {!searchQuery && (
            <Link to="/admin/chapters/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Chapter
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ChaptersList;