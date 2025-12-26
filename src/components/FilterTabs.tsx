import { FilterType } from '@/types/todo';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
}

export const FilterTabs = ({ 
  filter, 
  onFilterChange, 
  activeCount, 
  completedCount,
  totalCount 
}: FilterTabsProps) => {
  return (
    <Tabs value={filter} onValueChange={(value) => onFilterChange(value as FilterType)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">
          All ({totalCount})
        </TabsTrigger>
        <TabsTrigger value="active">
          Active ({activeCount})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Completed ({completedCount})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};