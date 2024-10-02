// src/components/Task.tsx
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskModal from './TaskModal';
import PriorityLabel from './PriorityLabel'; // Import PriorityLabel
import Button from '../common/Button'; // Import reusable Button component

interface TaskProps {
  task: { id: string; title: string; content: string; priority: 'urgent' | 'high' | 'normal' | 'low' };
  index: number;
  editTask: (taskId: string, newTitle: string, newContent: string, newPriority: 'urgent' | 'high' | 'normal' | 'low') => void;
}

const Task = ({ task, index, editTask }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.title);
  const [taskContent, setTaskContent] = useState(task.content);
  const [taskPriority, setTaskPriority] = useState(task.priority);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const saveTask = () => {
    editTask(task.id, taskName, taskContent, taskPriority);
    closeEditModal();
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 rounded shadow-sm relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* Reusing the PriorityLabel component */}
          <PriorityLabel priority={task.priority} />

          <h3 className="font-bold text-lg text-gray-700 mt-8">{task.title}</h3>
          <p className="text-gray-600">{task.content}</p>

          {/* Reusing the Button component */}
          <Button onClick={openEditModal} className="absolute top-1 right-2 text-gray-500 hover:text-gray-800">
            ✏️
          </Button>

          {isEditing && (
            <TaskModal
              isOpen={isEditing}
              closeModal={closeEditModal}
              saveTask={saveTask}
              taskName={taskName}
              setTaskName={setTaskName}
              taskContent={taskContent}
              setTaskContent={setTaskContent}
              taskPriority={taskPriority}
              setTaskPriority={setTaskPriority}
              isEdit={true}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
