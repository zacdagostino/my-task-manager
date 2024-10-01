// src/components/Task.tsx
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
  task: { id: string; title: string; content: string }; // Separate title and content
  index: number;
}

const Task = ({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 rounded shadow-sm"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* Display the task title in bold */}
          <h3 className="font-bold text-lg">{task.title}</h3>

          {/* Display the task content with a lighter style */}
          <p className="text-gray-600">{task.content}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
