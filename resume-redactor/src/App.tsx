import './styles/App.css';
import Editor from './components/layouts/editor';
import Preview from './components/layouts/preview';
import { useState } from 'react';
import { Section } from './components/types' 

function App() {
  const [sections, setSections] = useState<Section[]>([]);
  return (
  <main className='main-content'>
    <div className="editor-preview">
      <Editor sections={sections} setSections={setSections}/>
      <Preview sections={sections} />
    </div>
  </main>
  );
}

export default App;
