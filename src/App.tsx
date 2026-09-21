import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { MemoPage } from "./pages/MemoPage";
import { SignupPage } from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";

type AuthView = "login" | "signup";

export default function App() {
  const [authView, setAuthView] = useState<AuthView>("login");
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

  return <MemoPage />;
}
