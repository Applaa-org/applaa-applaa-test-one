import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AddTodoDialog } from '@/components/AddTodoDialog';
import { EditTodoDialog } from '@/components/EditTodoDialog';
import { TodoItem } from '@/components/TodoItem';
import { FilterTabs } from '@/components/FilterTabs';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/todo';
import { Trash2, Keyboard } from 'lucide-react';
import { MadeWithApplaa } from '@/components/made-with-applaa';
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
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { showSuccess } from '@/utils/toast';

const Index = () => {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    activeCount,
    completedCount,
    todos,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingTodo(null);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    showSuccess('Completed tasks cleared!');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus on add task (for future enhancement)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // This would trigger the add dialog to open
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Card */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">My Tasks</h2>
              <p className="text-muted-foreground">
                {activeCount === 0 
                  ? 'All done! Time to relax 🎉' 
                  : `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} remaining`
                }
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <AddTodoDialog onAdd={addTodo} />
              {completedCount > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Trash2 size={18} />
                      Clear Completed ({completedCount})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Completed Tasks</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete all {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearCompleted}>
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Keyboard size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Keyboard Shortcuts</DialogTitle>
                    <DialogDescription>
                      Use these shortcuts to work faster
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Toggle task completion</span>
                      <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                        Click on task
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quick edit</span>
                      <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                        Click edit icon
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delete task</span>
                      <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                        Click delete icon
                      </kbd>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={todos.length}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={handleEdit}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <EditTodoDialog
          todo={editingTodo}
          open={isEditDialogOpen}
          onClose={handleCloseEdit}
          onUpdate={updateTodo}
        />
      </main>

      <MadeWithApplaa />
    </div>
  );
};

export default Index;