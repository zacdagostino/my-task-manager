"use client";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

// Define the structure for tasks.
// Each task has an 'id' and 'content' (the task's text).
interface Task {
  id: string;
  content: string;
}

// Define the structure for a column.
// Each column has a 'title' and an array of tasks.
interface Column {
  title: string;
  tasks: Task[];
}

// Define the structure for the entire Kanban board (all columns).
// The keys are strings (like 'todo', 'inProgress'), and the values are 'Column' objects.
interface Columns {
  [key: string]: Column;
}

// Initial data for the Kanban board with three columns: 'todo', 'inProgress', and 'done'.
// Each column has a title and an array of tasks with their 'id' and 'content'.
const initialData: Columns = {
  todo: {
    title: 'Todo',
    tasks: [{ id: '1', content: 'Task 1' }, { id: '2', content: 'Task 2' }],
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


export default function KanbanBoard() {
  // Set up state for the columns using the initial data.
  // 'columns' holds the current state of the board (all columns and tasks).
  // 'setColumns' is the function used to update the state.
  const [columns, setColumns] = useState<Columns>(initialData);

  // Function to handle what happens when a task is dropped after dragging.
  const onDragEnd = (result: any) => {
    // Extract 'destination' and 'source' from the result.
    // 'source' is where the task was dragged from.
    // 'destination' is where the task was dropped.
    const { destination, source } = result;
    
    // If there's no valid destination (i.e., the task was dropped outside a column), return early.
    if (!destination) return;

    // Get the source and destination columns based on their droppableId.
    // The droppableId is the ID of the column (e.g., 'todo', 'inProgress').
    const sourceColumn: Column = columns[source.droppableId];
    const destinationColumn: Column = columns[destination.droppableId];

    // Create a copy of the tasks in the source column to avoid mutating state directly.
    const sourceTasks = Array.from(sourceColumn.tasks);
    
    // Remove the task from the source column's task array using splice.
    // This also returns the task that was moved.
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // If the task is being moved within the same column (source and destination column are the same).
    if (source.droppableId === destination.droppableId) {
      // Insert the moved task at the new position within the same column's task array.
      sourceTasks.splice(destination.index, 0, movedTask);
      
      // Create a new column object, with the updated task order.
      const newColumn: Column = {
        ...sourceColumn, // Copy everything from the source column.
        tasks: sourceTasks, // Replace the tasks array with the updated array.
      };
      
      // Update the state with the new column, while preserving other columns.
      setColumns((prev) => ({
        ...prev, // Copy the existing columns.
        [source.droppableId]: newColumn, // Replace the updated column.
      }));
    } else {
      // If the task is being moved between different columns.
      
      // Create a copy of the tasks in the destination column.
      const destinationTasks = Array.from(destinationColumn.tasks);
      
      // Insert the moved task into the destination column's task array.
      destinationTasks.splice(destination.index, 0, movedTask);

      // Update both the source column (without the moved task) and the destination column (with the new task).
      setColumns((prev) => ({
        ...prev, // Copy the existing columns.
        [source.droppableId]: { ...sourceColumn, tasks: sourceTasks }, // Update the source column.
        [destination.droppableId]: { ...destinationColumn, tasks: destinationTasks }, // Update the destination column.
      }));
    }
  };

  // Render the Kanban board.
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {/* Map over each column in the 'columns' state and render a Column component for each */}
        {Object.entries(columns).map(([columnId, column]) => (
          <Column key={columnId} columnId={columnId} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}

// Component to render a single column.
// It receives the 'columnId' and 'column' data as props.
function Column({ columnId, column }: { columnId: string; column: any }) {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-2">{column.title}</h2>
      
      {/* Droppable area where tasks can be dropped */}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef} // Provided by react-beautiful-dnd to link the droppable area.
            {...provided.droppableProps} // Props needed for the droppable area.
            className="min-h-[200px] space-y-2" // Tailwind CSS for minimum height and spacing between tasks.
          >
            {/* Map over each task in the column and render a Task component */}
            {column.tasks.map((task: any, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {/* Placeholder needed for proper spacing when tasks are dragged */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// Component to render a single task.
// It receives the 'task' data and its position 'index' as props.
function Task({ task, index }: { task: any; index: number }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 rounded shadow-sm"
          ref={provided.innerRef} // Link the task element to the Draggable.
          {...provided.draggableProps} // Props needed for dragging the task.
          {...provided.dragHandleProps} // Props for the drag handle (the part of the task the user clicks on to drag).
        >
          {task.content} {/* Display the task's content */}
        </div>
      )}
    </Draggable>
  );
}

