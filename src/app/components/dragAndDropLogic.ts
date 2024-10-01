// src/components/dragAndDropLogic.ts

// Define the structure for tasks
export interface Task {
    id: string;
    title: string; // Separate title
    content: string; // Separate content
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
        { id: '1', title: 'Task 1', content: 'Description of Task 1' },
        { id: '2', title: 'Task 2', content: 'Description of Task 2' },
      ],
    },
    inProgress: {
      title: 'In Progress',
      tasks: [{ id: '3', title: 'Task 3', content: 'Description of Task 3' }],
    },
    done: {
      title: 'Done',
      tasks: [{ id: '4', title: 'Task 4', content: 'Description of Task 4' }],
    },
  };
  