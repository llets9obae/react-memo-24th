import "./App.css";
import { Header } from "./components/Memo/Header";
import { EmptyState } from "./components/Memo/EmptyState";

export default function App() {
  const handleAddNewMemo = () => {
    alert("새 메모 작성");
  };

  return (
    <>
      <Header onAddClick={handleAddNewMemo} />
      <EmptyState onAddClick={handleAddNewMemo} />
    </>
  );
}
