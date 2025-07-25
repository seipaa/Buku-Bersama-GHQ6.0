import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LandingPage } from "./screens/LandingPage";
import { DetailMateri } from "./screens/DetailMateri";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";
import { MaterialReader } from "./screens/MaterialReader";
import { Wallet } from "./screens/Wallet";
import { Material } from "./types";

type CurrentPage = "landing" | "login" | "register" | "home" | "detail" | "upload" | "reader" | "wallet";

export const App = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleNavigateToDetail = (material: Material) => {
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

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        {currentPage === "landing" && (
          <LandingPage 
            onNavigateToDetail={handleNavigateToDetail}
            onNavigateToLogin={handleNavigateToLogin}
            onNavigateToRegister={handleNavigateToRegister}
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
        {currentPage === "detail" && selectedMaterial && (
          <DetailMateri 
            material={selectedMaterial}
            onBack={() => setCurrentPage("home")}
            onNavigateToReader={handleNavigateToReader}
          />
        )}
      </div>
    </AuthProvider>
  );
};