// src/components/Column.tsx
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task'; // Ensure this is correctly imported

interface ColumnProps {
  columnId: string;
  column: {
    title: string;
    tasks: { id: string; content: string }[];
  };
}

const Column = ({ columnId, column }: ColumnProps) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-2">{column.title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-2"
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column; // Default export
