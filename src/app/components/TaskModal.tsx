// src/components/TaskModal.tsx
interface TaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    saveTask: () => void;
    taskName: string;
    setTaskName: (name: string) => void;
    taskContent: string;
    setTaskContent: (content: string) => void;
    taskPriority: 'urgent' | 'high' | 'normal' | 'low';
    setTaskPriority: (priority: 'urgent' | 'high' | 'normal' | 'low') => void;
    isEdit?: boolean;
  }

  const TaskModal = ({
    isOpen,
    closeModal,
    saveTask,
    taskName,
    setTaskName,
    taskContent,
    setTaskContent,
    taskPriority,
    setTaskPriority,
    isEdit = false,
  }: TaskModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Ensure high z-index
      >
        <div className="bg-white p-6 rounded shadow-md z-50">
          <h2 className="text-xl mb-4 text-black">{isEdit ? 'Edit Task' : 'Add a New Task'}</h2>
          
          <label htmlFor="title" className="mb-2 font-bold text-gray-600">Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label htmlFor="Description" className="mb-2 font-bold text-gray-600">Description:</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            placeholder="Task Content"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />

          {/* Priority Dropdown */}
        <label htmlFor="priority" className="block mb-2 font-bold text-gray-600">Priority:</label>
        <select
          id="priority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value as 'urgent' | 'high' | 'normal' | 'low')}
          className="w-full p-2 border rounded mb-4 text-gray-500"
        >
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
          
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
  