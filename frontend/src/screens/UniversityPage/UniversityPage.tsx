import { Card, CardContent } from '../../components/ui/card';
import { Faculty, StudyProgram, University } from '../../types';

interface UniversityPageProps {
  university: University;
  onSelectProdi: (prodi: StudyProgram, faculty: Faculty) => void;
  onBack?: () => void;
}

export const UniversityPage = ({ university, onSelectProdi, onBack }: UniversityPageProps) => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <button onClick={onBack} className="mb-4 text-blueprime font-semibold">← Kembali</button>
      <h2 className="text-2xl font-bold text-blueprime mb-6 text-center">{university.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {university.faculties.map((faculty) => (
          faculty.programs.map((prodi) => (
            <Card key={prodi.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-yellow-50 to-white border border-yellow-400/20 rounded-xl group" onClick={() => onSelectProdi(prodi, faculty)}>
              <CardContent className="p-0 flex flex-col items-center text-center py-6 px-4">
                <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mb-3 border-2 border-yellow-400/30 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-yellow-700">{prodi.name.split(' ').map((w: string) => w[0]).join('')}</span>
                </div>
                <h4 className="font-bold text-yellow-700 text-lg mb-1 group-hover:text-yellow-900 transition-colors">{prodi.name}</h4>
                <div className="text-xs text-gray-600 mb-1">{faculty.name}</div>
                <div className="text-xs font-semibold text-white bg-yellow-400/80 px-3 py-1 rounded-full inline-block mb-2 mt-1 shadow">{prodi.degree} - {prodi.field}</div>
                <div className="text-xs text-gray-500">{prodi.description}</div>
              </CardContent>
            </Card>
          ))
        ))}
      </div>
    </div>
  );
}; 