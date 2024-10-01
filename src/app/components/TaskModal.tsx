interface TaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addTask: () => void;
    taskName: string;
    setTaskName: (name: string) => void;
    taskContent: string;
    setTaskContent: (content: string) => void;
  }
  
  const TaskModal = ({
    isOpen,
    closeModal,
    addTask,
    taskName,
    setTaskName,
    taskContent,
    setTaskContent,
  }: TaskModalProps) => {
    if (!isOpen) return null; // Only render modal if it's open
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl mb-4">Add a New Task</h2>
          
          {/* Task Name Input */}
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} // Update task name state
          />
          
          {/* Task Content Input */}
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Task Content"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)} // Update task content state
          />
          
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={addTask}>
              Add Task
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
  