import React from 'react';
import { useEffect, useState } from "react";


const TestBackend = () => {
  const [result, setResult] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost/radarsnipers/api/health.php")
      .then(res => res.json())
      .then(data => setResult(JSON.stringify(data)))
      .catch(err => setResult("Error: " + err));
  }, []);

  return <div>Backend Test Result: {result}</div>;
};

export default TestBackend;
