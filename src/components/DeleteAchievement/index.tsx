import { useDispatch } from 'react-redux';
import { deleteAchievement } from 'redux/reducers/achievements';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from 'components/ui/alert-dialog';
import { Button } from 'components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteAchievementProps {
  id: string;
}

const DeleteAchievement = ({ id }: DeleteAchievementProps) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteAchievement(id));
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Achievement</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this achievement? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAchievement;
