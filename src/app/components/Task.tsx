// src/components/Task.tsx
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskModal from './TaskModal'; // Import TaskModal for editing tasks

interface TaskProps {
  task: { id: string; title: string; content: string; priority: 'urgent' | 'high' | 'normal' | 'low' };
  index: number;
  editTask: (taskId: string, newTitle: string, newContent: string, newPriority: 'urgent' | 'high' | 'normal' | 'low' ) => void; // Function to edit task
}

// Function to get the appropriate class for each priority
const getPriorityClass = (priority: 'urgent' | 'high' | 'normal' | 'low') => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white'; // Urgent priority with red background
      case 'high':
        return 'bg-orange-400 text-white'; // High priority with orange background
      case 'normal':
        return 'bg-blue-400 text-white'; // Normal priority with blue background
      case 'low':
        return 'bg-green-500 text-white'; // Low priority with green background
      default:
        return '';
    }
  };

const Task = ({ task, index, editTask }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [taskName, setTaskName] = useState(task.title); // State for editing task name
  const [taskContent, setTaskContent] = useState(task.content); // State for editing task content
  const [taskPriority, setTaskPriority] = useState(task.priority)

  // Open the modal in edit mode
  const openEditModal = () => {
    setIsEditing(true);
  };

  // Close the modal
  const closeEditModal = () => {
    setIsEditing(false);
  };

  // Save the edited task
  const saveTask = () => {
    editTask(task.id, taskName, taskContent, taskPriority); // Call parent function to update task
    closeEditModal();
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white p-4 rounded shadow-sm relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
            {/* Priority Label with dynamic styling */}
          <span className={`absolute left-3 text-xs font-bold py-1 px-2 rounded ${getPriorityClass(task.priority)}`}>
            {task.priority.toUpperCase()}
          </span>

          {/* Task title with added margin-top to prevent overlap */}
          <h3 className="font-bold text-lg text-gray-700 mt-8">{task.title}</h3> {/* Added margin-top of 8 for spacing */}

          {/* Task content */}
          <p className="text-gray-600">{task.content}</p>

          {/* Edit button in the top-right corner */}
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-gray-800"
            onClick={openEditModal}
          >
            ✏️
          </button>


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
              taskPriority={taskPriority}
              setTaskPriority={setTaskPriority}
              isEdit={true} // Mark this modal as editing
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
