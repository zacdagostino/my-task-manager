// src/components/Column.tsx
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';

interface ColumnProps {
  columnId: string;
  column: {
    title: string;
    tasks: { id: string; title: string; content: string; priority: 'urgent' | 'high' | 'normal' | 'low' }[];
  };
  openModal: (columnId: string) => void;
  editTask: (taskId: string, newTitle: string, newContent: string, priority: 'urgent' | 'high' | 'normal' | 'low') => void; // Pass the edit function
}

const Column = ({ columnId, column, openModal, editTask }: ColumnProps) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800">{column.title}</h2>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => openModal(columnId)}
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
              <Task key={task.id} task={task} index={index} editTask={editTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
