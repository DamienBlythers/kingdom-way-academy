"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Trash, FlaskConical } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Lab {
  id: string;
  title: string;
  description: string;
  instructions: string;
  requiresText: boolean;
  requiresFileUpload: boolean;
  requiresPhoto: boolean;
  requiresVideo: boolean;
  isGraded: boolean;
  maxPoints?: number;
}

interface LabsSectionProps {
  lessonId: string;
  courseId: string;
  chapterId: string;
  initialLabs: Lab[];
}

export function LabsSection({
  lessonId,
  courseId,
  chapterId,
  initialLabs,
}: LabsSectionProps) {
  const [labs, setLabs] = useState<Lab[]>(initialLabs);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const [newLab, setNewLab] = useState({
    title: "",
    description: "",
    instructions: "",
    requiresText: true,
    requiresFileUpload: false,
    requiresPhoto: false,
    requiresVideo: false,
    isGraded: true,
    maxPoints: 100,
  });

  const handleCreate = async () => {
    try {
      const response = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/labs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLab),
        }
      );

      if (!response.ok) throw new Error("Failed to create lab");

      const lab = await response.json();
      setLabs([...labs, lab]);
      setIsCreating(false);
      setNewLab({
        title: "",
        description: "",
        instructions: "",
        requiresText: true,
        requiresFileUpload: false,
        requiresPhoto: false,
        requiresVideo: false,
        isGraded: true,
        maxPoints: 100,
      });
      toast.success("Lab created successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create lab");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" /> Kingdom Labs
        </span>
        <Button onClick={() => setIsCreating(true)} variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Lab
        </Button>
      </div>

      {isCreating && (
        <div className="mt-4 space-y-4 bg-white p-4 rounded-md border">
          <div>
            <Label>Title</Label>
            <Input
              value={newLab.title}
              onChange={(e) => setNewLab({ ...newLab, title: e.target.value })}
              placeholder="e.g., Kingdom Passport Activity"
            />
          </div>
          <div>
            <Label>Short Description</Label>
            <Textarea
              value={newLab.description}
              onChange={(e) => setNewLab({ ...newLab, description: e.target.value })}
              placeholder="Brief overview of the assignment"
            />
          </div>
          <div>
            <Label>Instructions</Label>
            <Textarea
              value={newLab.instructions}
              onChange={(e) => setNewLab({ ...newLab, instructions: e.target.value })}
              placeholder="Step-by-step instructions for the student..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Submission Requirements</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={newLab.requiresText} onCheckedChange={(c) => setNewLab({...newLab, requiresText: !!c})} />
                  <span className="text-sm">Text Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={newLab.requiresPhoto} onCheckedChange={(c) => setNewLab({...newLab, requiresPhoto: !!c})} />
                  <span className="text-sm">Photo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={newLab.requiresVideo} onCheckedChange={(c) => setNewLab({...newLab, requiresVideo: !!c})} />
                  <span className="text-sm">Video</span>
                </div>
             </div>
             
             <div className="space-y-2">
                <Label>Grading</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={newLab.isGraded} onCheckedChange={(c) => setNewLab({...newLab, isGraded: !!c})} />
                  <span className="text-sm">Graded Assignment</span>
                </div>
                {newLab.isGraded && (
                    <Input 
                        type="number" 
                        value={newLab.maxPoints} 
                        onChange={(e) => setNewLab({...newLab, maxPoints: parseInt(e.target.value)})}
                        placeholder="Max Points"
                    />
                )}
             </div>
          </div>

          <div className="flex items-center gap-x-2">
            <Button onClick={handleCreate} disabled={!newLab.title}>Create</Button>
            <Button onClick={() => setIsCreating(false)} variant="ghost">Cancel</Button>
          </div>
        </div>
      )}

      {!isCreating && labs.length === 0 && (
        <div className="text-sm text-muted-foreground mt-2 italic">
          No labs added to this lesson yet.
        </div>
      )}

      {labs.length > 0 && (
        <div className="space-y-2 mt-4">
          {labs.map((lab) => (
            <div
              key={lab.id}
              className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-2 text-sm p-2"
            >
              <FlaskConical className="h-4 w-4 mr-2" />
              <span className="font-semibold">{lab.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                 {lab.isGraded ? "Graded" : "Practice"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}