import { useState, useRef, useCallback } from "react";
import { useSearchMovie } from "../hooks/useSearchMovie";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function Home() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState({ src: "", title: "" });

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setModalImage({ src: "", title: "" });
    setIsOpen(false);
  };

  const openModal = ({ src, title }) => {
    setIsOpen(true);
    setModalImage({ src: src, title: title });
  };

  const { data, loading, hasMore, error } = useSearchMovie(search, page);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className=" bg-black">
      <div className="flex flex-col justify-start items-center min-h-screen py-12">
        <label
          htmlFor="findMovie"
          className="text-4xl mb-6 font-bold text-white"
        >
          Movie DB
        </label>
        <input
          id="findMovie"
          type="text"
          className="border w-1/2 py-2 px-2"
          value={search}
          onChange={handleSearch}
          placeholder="Find your favourite movie"
        />

        <div className="w-1/2 flex flex-col space-y-2 mt-2">
          {data?.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <div
                  ref={lastBookElementRef}
                  className="bg-gray-900 p-12 text-white w-full"
                >
                  <div className="flex flex-row space-x-4">
                    <button
                      onClick={() =>
                        openModal({ src: item.Poster, title: item.Title })
                      }
                    >
                      <img src={item.Poster} width="150px" alt={item.imdbID} />
                    </button>

                    <Link key={index} to={`/${item.imdbID}`}>
                      <div className="flex flex-col">
                        <span className="text-3xl">
                          {item.Title} - ({item.Year})
                        </span>
                        <span className="text-sm">{item.Type}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="bg-gray-900 p-12 text-white w-full">
                  <div className="flex flex-row space-x-4">
                    <button
                      onClick={() =>
                        openModal({ src: item.Poster, title: item.Title })
                      }
                    >
                      <img src={item.Poster} width="150px" alt={item.imdbID} />
                    </button>
                    <Link key={index} to={`/${item.imdbID}`}>
                      <div className="flex flex-col">
                        <span className="text-3xl">
                          {item.Title} - ({item.Year})
                        </span>
                        <span className="text-sm">{item.Type}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div>
          {loading && (
            <div className="my-12 font-bold animate-bounce ">Loading . . .</div>
          )}
        </div>
        <div>{error && <div className="my-12 font-bold ">Error!</div>}</div>
      </div>
      <Modal
        image={modalImage}
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
    </div>
  );
}

export default Home;
