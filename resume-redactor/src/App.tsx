import './styles/App.css';
import Editor from './components/layouts/editor';
import Preview from './components/layouts/preview';
import { useState, useRef } from 'react';
import { Section } from './components/types';

function App() {
  const [sections, setSections] = useState<Section[]>([]);
  const resumeRef = useRef<HTMLDivElement>(null);
  return (
  <main className='main-content'>
    <div className="editor-preview">
      <Editor sections={sections} setSections={setSections} resumeRef={resumeRef} />
      <Preview sections={sections} resumeRef={resumeRef}/>
    </div>
  </main>
  );
}

export default App;
