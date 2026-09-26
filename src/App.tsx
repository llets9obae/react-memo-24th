import { useEffect, useState } from "react";
import { ConfirmModal } from "./components/Memo/ConfirmModal";
import { LoginPage } from "./pages/LoginPage";
import { MemoPage } from "./pages/MemoPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignupPage } from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useNetworkStore } from "./store/useNetworkStore";

type AuthView = "login" | "signup";

function AppScreens() {
  const [authView, setAuthView] = useState<AuthView>("login");
  const [showProfile, setShowProfile] = useState(false);
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);

  if (!isAuthenticated) {
    if (authView === "signup") {
      return (
        <SignupPage
          onSignup={() => setAuthView("login")}
          onGoToLogin={() => setAuthView("login")}
        />
      );
    }

    return <LoginPage onGoToSignup={() => setAuthView("signup")} />;
  }

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />;
  }

  return <MemoPage onProfileClick={() => setShowProfile(true)} />;
}

export default function App() {
  const hasNetworkError = useNetworkStore((state) => state.hasNetworkError);
  const showNetworkError = useNetworkStore((state) => state.showNetworkError);
  const dismissNetworkError = useNetworkStore(
    (state) => state.dismissNetworkError,
  );

  useEffect(() => {
    window.addEventListener("offline", showNetworkError);
    return () => window.removeEventListener("offline", showNetworkError);
  }, [showNetworkError]);

  return (
    <>
      <AppScreens />
      {hasNetworkError && (
        <ConfirmModal
          title="네트워크 연결이 불안정합니다"
          description="네트워크 상태를 확인해주세요"
          confirmText="확인"
          onConfirm={dismissNetworkError}
        />
      )}
    </>
  );
}
