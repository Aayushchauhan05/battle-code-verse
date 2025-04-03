
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'javascript' }) => {
  // In a real implementation, we would use a proper code editor like Monaco or CodeMirror
  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-4 bg-[#1e1e1e] text-foreground font-mono text-sm resize-none outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your code here..."
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;
