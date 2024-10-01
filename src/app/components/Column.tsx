// src/components/Column.tsx
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

interface ColumnProps {
  columnId: string;
  column: {
    title: string;
    tasks: { id: string; content: string }[];
  };
  openModal: (columnId: string) => void; // Function to open the modal for task addition
}

const Column = ({ columnId, column, openModal }: ColumnProps) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{column.title}</h2>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => openModal(columnId)} // Open the modal when clicked
        >
          Add Task
        </button>
      </div>
      
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

export default Column;
