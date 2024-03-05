import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.loading.loading);

  return (
    <>
      {isLoading && (
        <div>
          <div className="overlay"></div>
          <div className="loader__common ">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </>
  );
};
export default Loading;
