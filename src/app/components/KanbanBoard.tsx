// src/components/KanbanBoard.tsx
"use client";

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import Column from './Column'; // Import the Column component
import TaskModal from './TaskModal'; // Import TaskModal component
import { Columns, initialData } from './dragAndDropLogic'; // Import logic and data structure

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null); // Track current column
  const [taskName, setTaskName] = useState(''); // Task name state
  const [taskContent, setTaskContent] = useState(''); // Task content state

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTasks = Array.from(sourceColumn.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newColumn = { ...sourceColumn, tasks: sourceTasks };
      setColumns((prev) => ({ ...prev, [source.droppableId]: newColumn }));
    } else {
      const destinationTasks = Array.from(destinationColumn.tasks);
      destinationTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
        [destination.droppableId]: { ...destinationColumn, tasks: destinationTasks },
      }));
    }
  };

  // Function to open the modal for a specific column
  const openModal = (columnId: string) => {
    setIsModalOpen(true);
    setCurrentColumnId(columnId);
  };

  // Function to add a new task to the selected column
  const addTask = () => {
    if (!taskName.trim() || !taskContent.trim() || !currentColumnId) return;
    const newTask = {
      id: Math.random().toString(), // Create a unique ID for the task
      content: `${taskName}: ${taskContent}`, // Combine task name and content
    };
    setColumns((prevColumns) => ({
      ...prevColumns,
      [currentColumnId]: {
        ...prevColumns[currentColumnId],
        tasks: [...prevColumns[currentColumnId].tasks, newTask], // Append new task
      },
    }));
    setTaskName(''); // Reset task name
    setTaskContent(''); // Reset task content
    closeModal(); // Close the modal after adding the task
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentColumnId(null);
    setTaskName('');
    setTaskContent('');
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              columnId={columnId}
              column={column}
              openModal={openModal} // Pass the modal handler to the column
            />
          ))}
        </div>
      </DragDropContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addTask={addTask}
        taskName={taskName}
        setTaskName={setTaskName}
        taskContent={taskContent}
        setTaskContent={setTaskContent}
      />
    </>
  );
}
