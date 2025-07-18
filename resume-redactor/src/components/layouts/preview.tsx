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

  return (
    <section ref={resumeRef} id="resume" className="resume-preview">
      <h2 style={{ padding: 0, margin: 0, paddingBottom: 10}}>{name}</h2>
      <div className="preview-contact">
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      </div>
      <div className="preview">
        {sections.map((section) => {
          if (section.type === 'Experience') {
            const { company, position, period, description } = section.data;
            return (
              <div className="preview-section" key={section.id} >
                <h3>Experience</h3>
                <p><strong>{position || "Position"}</strong>, {company || "Company"} ({period || "XX.XX.XXXX"})</p>
                <p>{description || "Description"}</p>
              </div>
            )
          }
          if (section.type === 'Education') {
            const { institute, period, degree } = section.data;
            return (
              <div className="preview-section" key={section.id} >
                <h3>Education</h3>
                <p><strong>{institute || "Institute"}</strong>, {degree || "Degree"} ({period || "XX.XX.XXXX"})</p>
              </div>
            )
          }
          if (section.type === 'Certificates') {
            const { certificate, date } = section.data;
            return (
              <div className="preview-section" key={section.id} >
                <h3>Certificates</h3>
                <p><strong>{certificate || "Certificate"}</strong>, {date || "XX.XX.XXXX"}</p>
              </div>
            )
          }
          if (section.type === 'Skills') {
            const { skills } = section.data;
            return (
              <div className="preview-section" key={section.id} >
                <h3>Skills</h3>
                <p><strong>{skills || "skills"}</strong></p>
              </div>
            );
          }
          if (section.type === 'About') {
            const { about } = section.data;
            return (
              <div className="preview-section" key={section.id} >
                <h3>About me</h3>
                <p>{about}</p>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
