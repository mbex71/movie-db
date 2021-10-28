import { useEffect, useState } from "react";
import axios from "axios";

const useDetailMovie = (id) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/`,
      params: {
        apikey: "faf7e5bb",
        i: id,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((resp) => {
        setData(resp.data);

        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;

        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};

export { useDetailMovie };
