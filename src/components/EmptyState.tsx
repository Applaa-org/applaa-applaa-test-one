import { FilterType } from '@/types/todo';
import { CheckCircle2, ListTodo, Circle } from 'lucide-react';

interface EmptyStateProps {
  filter: FilterType;
}

export const EmptyState = ({ filter }: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <CheckCircle2 size={64} className="text-green-500" />,
          title: 'No active tasks',
          description: 'Great job! You\'ve completed all your tasks or haven\'t created any yet.',
        };
      case 'completed':
        return {
          icon: <Circle size={64} className="text-muted-foreground" />,
          title: 'No completed tasks',
          description: 'Tasks you complete will appear here. Start checking off your to-dos!',
        };
      default:
        return {
          icon: <ListTodo size={64} className="text-muted-foreground" />,
          title: 'No tasks yet',
          description: 'Get started by creating your first task. Click the "Add Task" button above.',
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 opacity-50">
        {content.icon}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{content.title}</h3>
      <p className="text-muted-foreground max-w-md">{content.description}</p>
    </div>
  );
};