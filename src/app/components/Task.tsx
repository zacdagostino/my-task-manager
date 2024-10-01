// src/components/Task.tsx
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
  task: { id: string; content: string };
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
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
