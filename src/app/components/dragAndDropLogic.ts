// src/components/dragAndDropLogic.ts

// Define the structure for tasks
export interface Task {
    id: string;
    content: string;
  }
  
  // Define the structure for a column
  export interface Column {
    title: string;
    tasks: Task[];
  }
  
  // Define the structure for the entire Kanban board
  export interface Columns {
    [key: string]: Column;
  }
  
  // Initial data for the Kanban board
  export const initialData: Columns = {
    todo: {
      title: 'Todo',
      tasks: [
        { id: '1', content: 'Task 1' },
        { id: '2', content: 'Task 2' },
      ],
    },
    inProgress: {
      title: 'In Progress',
      tasks: [{ id: '3', content: 'Task 3' }],
    },
    done: {
      title: 'Done',
      tasks: [{ id: '4', content: 'Task 4' }],
    },
  };
  