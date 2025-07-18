interface Section {
  id: string;
  type: string;
  data: Record<string, string>;
}

interface PreviewProps {
  sections: Section[];
}

export default function Preview({ sections }: PreviewProps) {
  const aboutSection = sections.find((section) => section.type === 'About');
  const aboutData = aboutSection ? aboutSection.data : {};

  const name = aboutData.name || 'Firstname Lastname';
  const phone = aboutData.phone || '+1 234 567 890';
  const email = aboutData.email || 'youremail@gmail.com';
    return (
        <section className="resume-preview">
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p><p><strong>Phone:</strong> {phone}</p>
        <div className="preview">
          {sections.map((section) => {
            if (section.type === 'Experience') {
              const { company, position, period, description } = section.data;
              return (
                <div className="preview-section" key={section.id} >
                <h3>Experience</h3>
                <p><strong>{position == null ? "Position" : position}</strong>, {company == null ? "Company" : company} ({period == null ? "XX.XX.XXXX" : period}) </p>
                <p>{description == null ? "Description" : description}</p>
              </div>
              )
            }
            if (section.type === 'Education') {
              const { institute, period, degree } = section.data;
              return (
                <div className="preview-section" key={section.id} >
                  <h3>Education</h3>
                  <p><strong>{institute == null ? "Institute" : institute}</strong>, {degree == null ? "Degree" : degree} ({period == null ? "XX.XX.XXXX" : period}) </p>
                </div>
              )
            }
            if (section.type === 'Certificate') {
              const { certificate, date } = section.data;
              return (
                <div className="preview-section" key={section.id} >
                  <h3>Certificate</h3>
                  <p><strong>{certificate == null ? "Certificate" : certificate}</strong>, {date == null ? "XX.XX.XXXX" : date} </p>
                </div>
              )
            }
            if (section.type === 'Skills') {
              const { skills } = section.data;
              return (
                <div className="preview-section" key={section.id} >
                  <h3>Skills</h3>
                  <p><strong>{skills == null ? "skills" : skills}</strong></p>
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