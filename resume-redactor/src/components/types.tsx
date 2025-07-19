export type SectionType = 'Experience' | 'Projects' | 'Skills' | 'Certificates' | 'About' | 'Education';

export interface Section {
    id: string;
    type: SectionType;
    data: Record<string, string>;
}