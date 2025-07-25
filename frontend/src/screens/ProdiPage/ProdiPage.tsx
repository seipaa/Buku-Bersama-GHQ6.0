import { Card, CardContent } from '../../components/ui/card';
import { mockMaterials } from '../../data/mockData';
import { Faculty, Material, StudyProgram, University } from '../../types';

interface ProdiPageProps {
  prodi: StudyProgram;
  faculty?: Faculty;
  university?: University;
  onSelectMaterial: (material: Material) => void;
  onBack?: () => void;
}

export const ProdiPage = ({ prodi, faculty, university, onSelectMaterial, onBack }: ProdiPageProps) => {
  const materials = mockMaterials.filter(m => m.programStudiId === prodi.id);
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button onClick={onBack} className="mb-4 text-yellow-700 font-semibold">← Kembali</button>
      <h2 className="text-2xl font-bold text-yellow-700 mb-2 text-center">{prodi.name}</h2>
      <div className="text-center text-gray-600 mb-6">{university?.name} {faculty ? `- ${faculty.name}` : ''}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((material) => (
          <Card
            key={material.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white border border-gray-200 rounded-lg overflow-hidden group"
            onClick={() => onSelectMaterial(material)}
          >
            <CardContent className="p-0">
              {/* Card Header */}
              <div className="h-32 bg-gradient-to-br from-blueprime to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-xs font-medium">Semester {material.semester}</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <div className="bg-yellow-400 rounded-full p-1">
                    <span className="text-xs font-bold text-gray-800">★</span>
                  </div>
                  <span className="text-white text-xs font-medium">{material.aiReviewScore}</span>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blueprime transition-colors duration-300">
                    {material.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {material.description}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <div className="font-medium">{material.mataKuliah}</div>
                  <div>{material.author.universitas}</div>
                  <div>{material.author.programStudi}</div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {material.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {material.isOpenSource && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Open Source
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-blueprime rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {material.author.name.charAt(0)}
                      </span>
                    </div>
                    <span>{material.author.name}</span>
                    {material.author.isVerified && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{material.viewCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>⬇️</span>
                      <span>{material.downloadCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{material.appreciationCount}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {material.difficulty}
                      </span>
                      <span>{material.estimatedReadTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>★</span>
                      <span>{material.aiReviewScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {materials.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada materi ditemukan</h3>
          <p className="text-gray-500 mb-6">Belum ada materi pada prodi ini</p>
        </div>
      )}
    </div>
  );
}; 