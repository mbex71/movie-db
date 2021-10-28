import { useEffect, useState } from "react";
import axios from "axios";

const useSearchMovie = (s, page) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData([]);
  }, [s]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/`,
      params: {
        apikey: "faf7e5bb",
        s: s,
        page: page,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((resp) => {
        console.log("RESPONSE: ", resp.data);
        if (resp.data.Search) {
          setData((prevState) => {
            return [...new Set([...prevState, ...resp.data?.Search])];
          });
          setHasMore(resp.data.Search.length > 0);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;

        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [s, page]);

  return {
    data,
    loading,
    hasMore,
    error,
  };
};

export { useSearchMovie };
