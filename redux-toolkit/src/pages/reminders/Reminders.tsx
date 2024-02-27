import Reminders from "../../components/reminders/Reminders";
import { useNavigate } from "react-router-dom";

export default function RemindersPage() {
  const navigate = useNavigate();
  const handleBackList = () => {
    navigate("/");
  };

  return (
    <div>
      <Reminders onListsBackClick={handleBackList} />
    </div>
  );
}
