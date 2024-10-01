// src/components/KanbanBoard.tsx
"use client";

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import Column from './Column'; // Ensure correct default import
import { Columns, initialData } from './dragAndDropLogic'; // Ensure correct named import

export default function KanbanBoard() { // Default export
  const [columns, setColumns] = useState<Columns>(initialData);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.entries(columns).map(([columnId, column]) => (
          <Column key={columnId} columnId={columnId} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}
