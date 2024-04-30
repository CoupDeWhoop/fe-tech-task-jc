import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Student } from "@/app/columns";

interface Props {
  student: Student;
}
export function DeleteStudent({ student }: Props) {
  const router = useRouter();
  async function removeStudent() {
    const { id } = student;
    try {
      const response = await fetch(`http://localhost:9090/api/students/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="text-red-400">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            student record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeStudent}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
