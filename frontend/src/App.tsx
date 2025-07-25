import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DetailMateri } from "./screens/DetailMateri";
import { Home } from "./screens/Home";
import { LandingPage } from "./screens/LandingPage";
import { Login } from "./screens/Login";
import { MaterialReader } from "./screens/MaterialReader";
import { ProdiPage } from "./screens/ProdiPage";
import { Register } from "./screens/Register";
import { UniversityPage } from "./screens/UniversityPage";
import { Upload } from "./screens/Upload";
import { Wallet } from "./screens/Wallet";
import { Material } from "./types";

type CurrentPage = "landing" | "login" | "register" | "home" | "detail" | "upload" | "reader" | "wallet" | "university" | "prodi";

export const App = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [previousPage, setPreviousPage] = useState<CurrentPage | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedProdi, setSelectedProdi] = useState(null);

  const handleNavigateToDetail = (material: Material) => {
    setPreviousPage(currentPage);
    setSelectedMaterial(material);
    setCurrentPage("detail");
  };

  const handleNavigateToReader = (material: Material) => {
    setSelectedMaterial(material);
    setCurrentPage("reader");
  };

  const handleNavigateToUpload = () => {
    setCurrentPage("upload");
  };

  const handleNavigateToWallet = () => {
    setCurrentPage("wallet");
  };

  const handleNavigateToLogin = () => {
    setCurrentPage("login");
  };

  const handleNavigateToRegister = () => {
    setCurrentPage("register");
  };

  const handleNavigateToHome = () => {
    setCurrentPage("home");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
    setSelectedMaterial(null);
  };

  const handleLogout = () => {
    setCurrentPage("landing");
    setSelectedMaterial(null);
  };

  // Handler untuk navigasi ke UniversityPage
  const handleNavigateToUniversity = (university) => {
    setSelectedUniversity(university);
    setCurrentPage("university");
  };

  // Handler untuk navigasi ke ProdiPage
  const handleNavigateToProdi = (prodi, faculty, university) => {
    setSelectedProdi({ prodi, faculty, university });
    setCurrentPage("prodi");
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        {currentPage === "landing" && (
          <LandingPage 
            onNavigateToDetail={handleNavigateToDetail}
            onNavigateToLogin={handleNavigateToLogin}
            onNavigateToRegister={handleNavigateToRegister}
            onNavigateToUniversity={handleNavigateToUniversity}
            onNavigateToProdi={handleNavigateToProdi}
          />
        )}
        {currentPage === "login" && (
          <Login
            onNavigateToHome={handleNavigateToHome}
            onBack={handleBackToLanding}
            onNavigateToRegister={handleNavigateToRegister}
          />
        )}
        {currentPage === "register" && (
          <Register
            onBack={handleBackToLanding}
            onNavigateToLogin={handleNavigateToLogin}
          />
        )}
        {currentPage === "home" && (
          <Home
            onNavigateToDetail={handleNavigateToDetail}
            onNavigateToReader={handleNavigateToReader}
            onNavigateToUpload={handleNavigateToUpload}
            onNavigateToWallet={handleNavigateToWallet}
            onNavigateToProfile={() => {}} // TODO: Implement profile page
            onLogout={handleLogout}
          />
        )}
        {currentPage === "upload" && (
          <Upload
            onBack={() => setCurrentPage("home")}
            onNavigateToHome={handleNavigateToHome}
          />
        )}
        {currentPage === "reader" && selectedMaterial && (
          <MaterialReader
            material={selectedMaterial}
            onBack={() => setCurrentPage("home")}
            onNavigateToProfile={() => {}} // TODO: Implement profile navigation
          />
        )}
        {currentPage === "wallet" && (
          <Wallet
            onBack={() => setCurrentPage("home")}
          />
        )}
        {currentPage === "university" && selectedUniversity && (
          <UniversityPage
            university={selectedUniversity}
            onSelectProdi={(prodi, faculty) => handleNavigateToProdi(prodi, faculty, selectedUniversity)}
            onBack={() => setCurrentPage("landing")}
          />
        )}
        {currentPage === "prodi" && selectedProdi && (
          <ProdiPage
            prodi={selectedProdi.prodi}
            faculty={selectedProdi.faculty}
            university={selectedProdi.university}
            onSelectMaterial={handleNavigateToDetail}
            onBack={() => setCurrentPage(selectedUniversity ? "university" : "landing")}
          />
        )}
        {currentPage === "detail" && selectedMaterial && (
          <DetailMateri 
            material={selectedMaterial}
            onBack={() => setCurrentPage(previousPage || "landing")}
            onNavigateToReader={handleNavigateToReader}
            selectedMaterialId={selectedMaterial.id}
          />
        )}
      </div>
    </AuthProvider>
  );
};