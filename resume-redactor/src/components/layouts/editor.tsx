import React, { useState } from 'react'
import type { Section, SectionType } from '../types';
import DownloadPdf from '../download';
import UploadImage from '../uploadImage';

type EditorProps = {
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
    resumeRef: React.RefObject<HTMLDivElement | null>;
}

export default function Editor({sections, setSections, resumeRef}: EditorProps) {
    const [selectedType, setSelectedType] = useState<string>('');

    const handleAddSection = function () {
        if (!selectedType) return alert('Selected section type');

        const newSection: Section = {
            id: Date.now().toString(),
            type: selectedType as SectionType,
            data: {},
        }
        setSections((p) => [...p, newSection]);
        setSelectedType('');
    }

    const handleDeleteSection = (id: string) => {
        setSections((prev) => prev.filter((section) => section.id !== id));
    };

    const handleImageUpload = (file: File | null, sectionId: string) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const imgUrl = reader.result as string;
                setSections((prevSections) =>
                    prevSections.map((section) =>
                        section.id === sectionId ? { ...section, data: { ...section.data, image: imgUrl } } : section
                    )
                );
            }
            reader.readAsDataURL(file);
        }
    }

    const renderSectionForm = (section: Section) => {
        const handleInputChange = (id: string, field: string, value: string) => {
            setSections((prevSections) =>
                prevSections.map((section) =>
                    section.id === id ? { ...section, data: { ...section.data, [field]: value } } : section
            ));
        }

        switch (section.type) {
            case 'Experience':
                return (
                    <div className="section-options">
                        <input name="Company" placeholder="Company"
                        value={section.data.company || ""}
                        onChange={(e) => handleInputChange(section.id, "company", e.target.value)}
                        />
                        <input name="Position" placeholder="Position"
                        value={section.data.position || ""}
                        onChange={(e) => handleInputChange(section.id, "position", e.target.value)}
                        />
                        <input name="Period" placeholder="Period"
                        value={section.data.period}
                        onChange={(e) => handleInputChange(section.id, "period", e.target.value)}/>
                        <textarea placeholder="Description" onChange={(e) => handleInputChange(section.id, "description", e.target.value)}></textarea>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            case 'Skills': 
                return (
                    <div className="section-options">
                        <input name="Skills" placeholder="Skills"
                        value={section.data.skills || ""}
                        onChange={(e) => handleInputChange(section.id, "skills", e.target.value)}/>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            case 'Education':
                return (
                    <div className="section-options">
                        <input name="Institute" placeholder="Institute"
                        value={section.data.institute || ""}
                        onChange={(e) => handleInputChange(section.id, "institute", e.target.value)}/>
                        <input name="Period" placeholder="Period"
                        value={section.data.period}
                        onChange={(e) => handleInputChange(section.id, "period", e.target.value)}/>
                        <input name="Degree" placeholder="Degree"
                        value={section.data.degree}
                        onChange={(e) => handleInputChange(section.id, "degree", e.target.value)}/>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            case 'Certificates':
                return (
                    <div className="section-options">
                        <input name='Certificate' placeholder="Certificate"
                        value={section.data.certificate || ""}
                        onChange={(e) => handleInputChange(section.id, "certificate", e.target.value)}/>
                        <input name='Date' placeholder="Date"
                        value={section.data.date}
                        onChange={(e) => handleInputChange(section.id, "date", e.target.value)}/>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            case 'About':
                return (
                    <div className="section-options">
                        <input name="Name" placeholder="First name / Last name"
                        value={section.data.name || ""}
                        onChange={(e) => handleInputChange(section.id, "name", e.target.value)}/>
                        <input name="Email" placeholder="Email"
                        value={section.data.email || ""}
                        onChange={(e) => handleInputChange(section.id, "email", e.target.value)}/>
                        <input type='number' name="Phone" placeholder="Phone" style={{ appearance: 'none'}}
                        value={section.data.phone || ""}
                        onChange={(e) => handleInputChange(section.id, "phone", e.target.value)}/>
                        <input name="Country" placeholder='Country'
                        value={section.data.country || ""}
                        onChange={(e) => handleInputChange(section.id, "country", e.target.value)}/>
                        <input name="City" placeholder='City'
                        value={section.data.city || ""}
                        onChange={(e) => handleInputChange(section.id, "city", e.target.value)}/>
                        <textarea name="About" placeholder="About"
                        value={section.data.about || ""}
                        onChange={(e) => handleInputChange(section.id, "about", e.target.value)}/>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            case 'Portfolio':
                return (
                    <div className="section-options">
                        <input name='Project name' placeholder="Project name"
                        value={section.data.projectName || ""}
                        onChange={(e) => handleInputChange(section.id, "projectName", e.target.value)}/>
                        <input name='Description' placeholder="Description"
                        value={section.data.description || ""}
                        onChange={(e) => handleInputChange(section.id, "description", e.target.value)}/>
                        <UploadImage onImageUpload={(file) => handleImageUpload(file, section.id)} showPreview={false}/>
                        <button type="button" onClick={() => handleDeleteSection(section.id)}>Delete</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="editor">
            <hgroup className="hgroup">
                <div className='contentH1'>
                <h2>Resume Redactor</h2>
                <DownloadPdf targetRef={resumeRef} fileName="resume" />
                </div>
                <h3>Add and option section</h3>
            </hgroup>
            <div className="section-options">
                <select className="sectionType" id="section-type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option disabled value="">Selected type</option>
                    <option value="Experience">Experience</option>
                    <option value="Education">Education</option>
                    <option value="Skills">Skills</option>
                    <option value="Certificates">Certificate</option>
                    <option value="About">About me</option>
                    <option value="Portfolio">Portfolio</option>
                </select>
                <button type="button" onClick={handleAddSection}>Add section</button>
            </div>

            <div id="sections-list">
            <article className="section">
                <div style={{ marginTop: '1.3rem' }} >
                    {sections.map((section) => (
                        <div key={section.id} style={{ marginBottom: 10 }}>
                            <h3>{section.type}</h3>
                            {renderSectionForm(section)}
                        </div>
                    ))}
                </div>

            </article>
            </div>
      </section>
    )
}