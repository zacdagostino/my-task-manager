// src/components/TaskModal.tsx
interface TaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  saveTask: () => void; // Save task (either create or update)
  taskName: string;
  setTaskName: (name: string) => void;
  taskContent: string;
  setTaskContent: (content: string) => void;
  isEdit?: boolean; // Check if this is an edit operation
}

const TaskModal = ({
    isOpen,
    closeModal,
    saveTask,
    taskName,
    setTaskName,
    taskContent,
    setTaskContent,
    isEdit = false,
  }: TaskModalProps) => {
    if (!isOpen) return null; // Only render modal if it's open
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Ensure high z-index
      >
        <div className="bg-white p-6 rounded shadow-md z-50">
          <h2 className="text-xl mb-4">{isEdit ? 'Edit Task' : 'Add a New Task'}</h2>
          
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Task Content"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
          
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={saveTask}>
              {isEdit ? 'Save Changes' : 'Add Task'}
            </button>
            <button className="bg-gray-500 text-white p-2 rounded" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskModal;
  