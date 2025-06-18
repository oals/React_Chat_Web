import { useState, useEffect } from 'react';

const useHomeData = () => {
  const [mainData, setMainData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl}/api/home/main`)
        .then(res => {
          if (!res.ok) throw new Error('메인 API 호출 오류');
          return res.json();
        }),

      fetch(`${apiUrl}/api/home/additional`)
        .then(res => {
          if (!res.ok) throw new Error('추가 데이터 API 호출 오류');
          return res.json();
        })
    ])
      .then(([mainData, additionalData]) => {
        setMainData(mainData);
        setAdditionalData(additionalData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [apiUrl]);

  return { mainData, additionalData, loading, error };
};

export default useHomeData;