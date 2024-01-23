"use client";

import TaskCreate from "@/app/(main)/_components/task-create";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const TableEditor = ({onChange, initialContent, editable} : EditorProps ) => {
  return (
    <div className="ml-[54px]">
      <TaskCreate />
      <div>
        Data
      </div>
    </div>
  );
};

export default TableEditor;
