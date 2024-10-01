// src/components/Task.tsx
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskModal from './TaskModal'; // Import TaskModal for editing tasks

interface TaskProps {
  task: { id: string; title: string; content: string };
  index: number;
  editTask: (taskId: string, newTitle: string, newContent: string) => void; // Function to edit task
}

const Task = ({ task, index, editTask }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  // Open the modal in edit mode
  const openEditModal = () => {
    setIsEditing(true);
  };

  // Close the modal
  const closeEditModal = () => {
    setIsEditing(false);
  };

  const [taskName, setTaskName] = useState(task.title); // State for editing task name
  const [taskContent, setTaskContent] = useState(task.content); // State for editing task content

  // Save the edited task
  const saveTask = () => {
    editTask(task.id, taskName, taskContent); // Call parent function to update task
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
          {/* Edit button in the top-right corner */}
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-gray-800"
            onClick={openEditModal}
          >
            ✏️
          </button>

          {/* Task title and description */}
          <h3 className="font-bold text-lg text-gray-700">{task.title}</h3>
          <p className="text-gray-600">{task.content}</p>

          {/* Task Modal for editing */}
          {isEditing && (
            <TaskModal
              isOpen={isEditing}
              closeModal={closeEditModal}
              saveTask={saveTask}
              taskName={taskName}
              setTaskName={setTaskName}
              taskContent={taskContent}
              setTaskContent={setTaskContent}
              isEdit={true} // Mark this modal as editing
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
