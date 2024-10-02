// src/components/TaskModal.tsx
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';

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

  const priorityOptions = ['urgent', 'high', 'normal', 'low'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4 text-gray-800">{isEdit ? 'Edit Task' : 'Add a New Task'}</h2>

        {/* Task Name Input */}
        <InputField
          label="Task Name"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />

        {/* Task Content Input */}
        <InputField
          label="Task Content"
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Enter task content"
        />

        {/* Priority Dropdown */}
        <SelectField
          label="Priority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value as 'urgent' | 'high' | 'normal' | 'low')}
          options={priorityOptions}
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
