// src/components/KanbanBoard.tsx
"use client";

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import Column from './Column'; // Import the Column component
import TaskModal from './TaskModal'; // Import TaskModal component
import { Columns, initialData } from './dragAndDropLogic'; // Import logic and data structure

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for adding new tasks
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null); // Track current column
  const [taskName, setTaskName] = useState(''); // Task name state
  const [taskContent, setTaskContent] = useState(''); // Task content state
  const [taskPriority, setTaskPriority] = useState<'urgent' | 'high' | 'normal' | 'low'>('normal'); // New state for priority

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

  // Function to open the modal for adding a new task
  const openModal = (columnId: string) => {
    setIsModalOpen(true);
    setCurrentColumnId(columnId);
  };

  // Function to add a new task
  const addTask = () => {
    if (!taskName.trim() || !taskContent.trim() || !currentColumnId) return;
    const newTask = {
      id: Math.random().toString(),
      title: taskName,
      content: taskContent,
      priority: taskPriority, // Set default priority
    };
    setColumns((prevColumns) => ({
      ...prevColumns,
      [currentColumnId]: {
        ...prevColumns[currentColumnId],
        tasks: [...prevColumns[currentColumnId].tasks, newTask],
      },
    }));
    setTaskName('');
    setTaskContent('');
    setTaskPriority('normal'); // Reset priority to normal after saving
    closeModal();
  };

  // Function to edit an existing task
  const editTask = (taskId: string, newTitle: string, newContent: string, newPriority: 'urgent' | 'high' | 'normal' | 'low') => {
    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };

      // Iterate through columns to find the task by its ID
      for (const columnId in newColumns) {
        const column = newColumns[columnId];
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          // Update the task with the new title and content
          column.tasks[taskIndex] = { 
            ...column.tasks[taskIndex], 
            title: newTitle, 
            content: newContent, 
            priority: newPriority, // Update priority as well
             };
          break;
        }
      }

      return newColumns;
    });
  };

  // Close the modal for adding new tasks
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
              editTask={editTask} // Pass the edit function to each task
            />
          ))}
        </div>
      </DragDropContext>

      {/* Task Modal for adding a new task */}
      <TaskModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        saveTask={addTask}
        taskName={taskName}
        setTaskName={setTaskName}
        taskContent={taskContent}
        setTaskContent={setTaskContent}
        taskPriority={taskPriority} // Pass task priority
        setTaskPriority={setTaskPriority} // Handle task priority
      />
    </>
  );
}
