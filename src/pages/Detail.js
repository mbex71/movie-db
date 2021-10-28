import { useParams, useHistory } from "react-router-dom";
import { useDetailMovie } from "../hooks/useDetailMovie";

const Detail = () => {
  const { id } = useParams();
  const { data, loading } = useDetailMovie(id);
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  if (loading) return <div>Loading . . .</div>;
  return (
    <div className="bg-black">
      <div className="w-1/2 p-6">
        <button
          className="px-12 py-4 text-white bg-gray-900"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col justify-start items-center min-h-screen py-6 text-white">
        <div className="bg-gray-900 flex flex-row p-12 space-x-32 w-5/6">
          <img src={data?.Poster} alt="data?.Title" />
          <div>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-5xl font-bold">{data?.Title}</h1>
              <div className="text-yellow-500 text-3xl font-bold">
                {data?.imdbRating}
              </div>
            </div>
            <div className="text-sm flex flex-row space-x-6 my-2">
              <div>{data?.Year}</div>
              <div>{data?.Rated}</div>
              <div>{data?.Runtime}</div>
              <div>{data?.Genre}</div>
            </div>
            <div className="my-4">
              Cast: <span className="font-bold">{data?.Actors}</span>
            </div>
            <div className="my-4">
              Director: <span className="font-bold">{data?.Director}</span>
            </div>
            <div className="my-4">
              Writer: <span className="font-bold">{data?.Writer}</span>
            </div>
            <div className="italic">{data?.Plot}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
