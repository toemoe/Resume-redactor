import React from 'react';

interface Section {
  id: string;
  type: string;
  data: Record<string, string>;
}

interface PreviewProps {
  sections: Section[];
  resumeRef: React.RefObject<HTMLDivElement | null>;
}

export default function Preview({ sections, resumeRef }: PreviewProps) {
  const aboutSection = sections.find((section) => section.type === 'About');
  const aboutData = aboutSection ? aboutSection.data : {};

  const name = aboutData.name || 'Firstname Lastname';
  const phone = aboutData.phone || '+1 234 567 890';
  const email = aboutData.email || 'youremail@gmail.com';
  const country = aboutData.country || 'Country';
  const city = aboutData.city || 'City';

  const groupedSections = sections.reduce<Record<string, Section[]>>((acc, section) => {
    if (!acc[section.type]) {
      acc[section.type] = [];
    }
    acc[section.type].push(section);
    return acc;
  }, {});

  return (
    <section ref={resumeRef} id="resume" className="resume-preview">
      <h2 style={{ padding: 0, margin: 0, paddingBottom: 10 }}>{name}</h2>
      <div className="preview-contact">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Location:</strong> {country}, {city}</p>
      </div>

      <div className="preview">
        {Object.entries(groupedSections).map(([type, group]) => (
          type !== 'About' && (
            <div key={type} className="preview-section">
              <h3>{type}</h3>
              {group.map((section) => {
                const data = section.data;

                if (type === 'Experience') {
                  return (
                    <div key={section.id}>
                      <p><strong>{data.position || 'Position'}</strong>, {data.company || 'Company'} ({data.period || 'XX.XX.XXXX'})</p>
                      <p>{data.description || 'Description'}</p>
                    </div>
                  );
                }

                if (type === 'Education') {
                  return (
                    <div key={section.id}>
                      <p><strong>{data.institute || 'Institute'}</strong>, {data.degree || 'Degree'} ({data.period || 'XX.XX.XXXX'})</p>
                    </div>
                  );
                }

                if (type === 'Certificates') {
                  return (
                    <div key={section.id}>
                      <p><strong>{data.certificate || 'Certificate'}</strong>, {data.date || 'XX.XX.XXXX'}</p>
                    </div>
                  );
                }

                if (type === 'Skills') {
                  return (
                    <div key={section.id}>
                      <p><strong>{data.skills || 'skills'}</strong></p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )
        ))}
        {aboutData.about && (
          <div className="preview-section">
            <h3>About me</h3>
            <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{aboutData.about}</p>
          </div>
        )}
      </div>
    </section>
  );
}
